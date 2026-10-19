/**
 * Sorts a project's own tags into the layers of its working drawing.
 * Only real tags are placed; nothing is inferred beyond the lookup.
 */
export type StackLayer = 'interface' | 'ai' | 'api' | 'data' | 'infra' | 'tooling';

const LAYER_ORDER: StackLayer[] = ['interface', 'ai', 'api', 'data', 'infra', 'tooling'];

const TAG_LAYER: Record<string, StackLayer> = {
  'next.js': 'interface',
  'react.js': 'interface',
  react: 'interface',
  tailwind: 'interface',
  radixui: 'interface',
  pwa: 'interface',
  i18n: 'interface',
  'ffmpeg wasm': 'interface',
  'gemini ai': 'ai',
  whisper: 'ai',
  mcp: 'ai',
  fastapi: 'api',
  python: 'api',
  supabase: 'data',
  firestore: 'data',
  postgresql: 'data',
  redis: 'data',
  firebase: 'infra',
  'cloud run': 'infra',
  vercel: 'infra',
  aws: 'infra',
  terraform: 'infra',
  typescript: 'tooling',
};

export function stackLayers(tags: readonly string[]): { layer: StackLayer; items: string[] }[] {
  const groups = new Map<StackLayer, string[]>();
  for (const tag of tags) {
    const layer = TAG_LAYER[tag.toLowerCase()] ?? 'tooling';
    groups.set(layer, [...(groups.get(layer) ?? []), tag]);
  }
  return LAYER_ORDER.filter((layer) => groups.has(layer)).map((layer) => ({ layer, items: groups.get(layer)! }));
}
