import { locales, type Locale } from "@/i18n/config";
import { cvData } from "@/lib/data/cv";
import { getExperiences } from "@/lib/data/experiences";
import { fillTenure } from "@/lib/tenure";
import type { Experience } from "@/types";

export const dynamic = "force-static";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const escape = (text: string) =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const dates = (range: string) => escape(range.replace(" - ", " – "));

function role(exp: Experience, stackLabel: string) {
  const bullets = [
    ...exp.responsibilities.map((item) => `<li>${escape(item)}</li>`),
    ...(exp.projects ?? []).map(
      (project) =>
        `<li><strong>${escape(project.name)}</strong> (${escape(project.role)}): ${escape(project.summary)}</li>`,
    ),
  ].join("");
  const stack = exp.stack?.length
    ? `<p class="stack"><em>${escape(stackLabel)}:</em> ${escape(exp.stack.join(", "))}</p>`
    : "";
  return `<article>
    <div class="row"><strong>${escape(exp.company)}</strong><span>${escape(exp.location ?? "")}</span></div>
    <div class="row"><em>${escape(exp.jobTitle)}</em><span>${dates(exp.employmentDates)}</span></div>
    <ul>${bullets}</ul>${stack}
  </article>`;
}

/**
 * The CV in Harvard format as a bare HTML document (no site chrome, no scripts), one per language:
 * `scripts/generate-cv-pdf.js` prints it into the PDFs under /public/docs that the home page offers.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ lang: string }> },
) {
  const { lang } = await params;
  if (!locales.includes(lang as Locale))
    return new Response("Not found", { status: 404 });
  const locale = lang as Locale;
  const cv = cvData[locale];
  const all = getExperiences(locale);
  const experience = all.filter((exp) => exp.company !== cv.leadershipCompany);
  const leadership = all.filter((exp) => exp.company === cv.leadershipCompany);
  const { labels } = cv;

  const contact = cv.contact
    .map((item) =>
      item.href
        ? `<a href="${escape(item.href)}">${escape(item.label)}</a>`
        : escape(item.label),
    )
    .join(" · ");

  const html = `<!doctype html>
<html lang="${locale}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${escape(labels.documentTitle)}</title>
<style>
  @page { size: Letter; margin: 0.45in 0.55in; }
  * { box-sizing: border-box; }
  html { background: #fff; }
  body { margin: 0 auto; max-width: 7.4in; padding: 0.45in 0.55in; color: #000; font: 9.4pt/1.22 "Times New Roman", Times, Georgia, serif; }
  @media print { body { max-width: none; padding: 0; } }
  h1 { margin: 0; text-align: center; font-size: 18pt; letter-spacing: 0.01em; }
  .contact { margin: 2pt 0 0; text-align: center; }
  a { color: inherit; text-decoration: none; }
  h2 { margin: 7pt 0 3pt; padding-bottom: 1pt; border-bottom: 0.75pt solid #000; font-size: 10.5pt; text-transform: uppercase; letter-spacing: 0.04em; break-after: avoid; }
  p { margin: 0; }
  article { margin-bottom: 4pt; }
  .row { display: flex; justify-content: space-between; gap: 12pt; break-after: avoid; }
  .row span { white-space: nowrap; }
  ul { margin: 1.5pt 0 0; padding-left: 14pt; }
  li { margin-bottom: 0.5pt; break-inside: avoid; }
  .stack { margin-top: 1pt; padding-left: 14pt; }
  .plain { margin: 0; padding: 0; list-style: none; }
</style>
</head>
<body>
<h1>${escape(cv.name)}</h1>
<p class="contact">${contact}</p>

<h2>${escape(labels.summary)}</h2>
<p>${escape(fillTenure(cv.summary))}</p>

<h2>${escape(labels.experience)}</h2>
${experience.map((exp) => role(exp, labels.stack)).join("\n")}

<h2>${escape(labels.leadership)}</h2>
${leadership.map((exp) => role(exp, labels.stack)).join("\n")}

<h2>${escape(labels.education)}</h2>
${cv.education
  .map(
    (item) => `<article>
    <div class="row"><strong>${escape(item.school)}</strong><span>${escape(item.location)}</span></div>
    <div class="row"><em>${escape(item.degree)}</em></div>
    <p>${escape(labels.activities)}: ${escape(item.activities.join("; "))}</p>
  </article>`,
  )
  .join("\n")}

<h2>${escape(labels.certifications)}</h2>
<ul class="plain">${cv.certifications.map((item) => `<li>${escape(item.name)}, <em>${escape(item.issuer)}</em></li>`).join("")}</ul>

<h2>${escape(labels.skills)}</h2>
<ul class="plain">${cv.skills.map((group) => `<li><strong>${escape(group.label)}:</strong> ${escape(group.items.join(", "))}</li>`).join("")}</ul>
</body>
</html>`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
