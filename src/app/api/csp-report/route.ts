import { NextResponse } from 'next/server';
import { clientIp, withinRateLimit } from '@/lib/server/security';

export const runtime = 'edge';

/**
 * Receives Content Security Policy violation reports and logs them (Vercel runtime logs, prefix "[csp]").
 * Accepts the legacy `report-uri` body (application/csp-report) and the Reporting API batch (application/reports+json).
 * Always answers 204: browsers ignore the response, and nothing about it should help a caller probe.
 */
const MAX_BODY = 16_000;
const noContent = () => new NextResponse(null, { status: 204 });

type Violation = { page?: string; directive?: string; blocked?: string; source?: string; line?: number; sample?: string };

const text = (value: unknown, max = 300) => (typeof value === 'string' ? value.slice(0, max) : undefined);

function fromLegacy(report: Record<string, unknown>): Violation {
  return {
    page: text(report['document-uri']),
    directive: text(report['effective-directive'] ?? report['violated-directive']),
    blocked: text(report['blocked-uri']),
    source: text(report['source-file']),
    line: typeof report['line-number'] === 'number' ? report['line-number'] : undefined,
    sample: text(report['script-sample'], 80),
  };
}

function fromReportingApi(body: Record<string, unknown>): Violation {
  return {
    page: text(body.documentURL),
    directive: text(body.effectiveDirective),
    blocked: text(body.blockedURL),
    source: text(body.sourceFile),
    line: typeof body.lineNumber === 'number' ? body.lineNumber : undefined,
    sample: text(body.sample, 80),
  };
}

// Extensions inject into every page they can; their violations say nothing about the site.
const isNoise = (violation: Violation) =>
  /^(chrome|moz|safari(-web)?)-extension:/.test(violation.blocked ?? '') ||
  /^(chrome|moz|safari(-web)?)-extension:/.test(violation.source ?? '');

export async function POST(request: Request) {
  try {
    if (!(await withinRateLimit(`csp:${clientIp(request)}`, 30, 600))) return noContent();
    const raw = await request.text();
    if (raw.length > MAX_BODY) return noContent();
    const data: unknown = JSON.parse(raw);

    const violations: Violation[] = [];
    if (Array.isArray(data)) {
      for (const entry of data.slice(0, 20)) {
        if (entry && entry.type === 'csp-violation' && entry.body && typeof entry.body === 'object') {
          violations.push(fromReportingApi(entry.body));
        }
      }
    } else if (data && typeof data === 'object' && 'csp-report' in data) {
      const report = (data as Record<string, unknown>)['csp-report'];
      if (report && typeof report === 'object') violations.push(fromLegacy(report as Record<string, unknown>));
    }

    for (const violation of violations) {
      if (!isNoise(violation)) console.warn('[csp]', JSON.stringify(violation));
    }
  } catch {
    // Malformed body: nothing to log.
  }
  return noContent();
}
