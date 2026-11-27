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
  'tailwind css': 'interface',
  radixui: 'interface',
  pwa: 'interface',
  i18n: 'interface',
  'ffmpeg wasm': 'interface',
  flutter: 'interface',
  bloc: 'interface',
  'gemini ai': 'ai',
  whisper: 'ai',
  mcp: 'ai',
  claude: 'ai',
  keras: 'ai',
  opencv: 'ai',
  mediapipe: 'ai',
  pyqt5: 'interface',
  pandas: 'data',
  fastapi: 'api',
  python: 'api',
  go: 'api',
  supabase: 'data',
  pgvector: 'data',
  duckdb: 'data',
  hnsw: 'data',
  concurrency: 'api',
  concurrencia: 'api',
  benchmarks: 'tooling',
  alembic: 'data',
  pgx: 'data',
  firestore: 'data',
  postgresql: 'data',
  redis: 'data',
  firebase: 'infra',
  'cloud run': 'infra',
  'aws lambda': 'infra',
  'step functions': 'infra',
  s3: 'infra',
  docker: 'infra',
  'pub/sub': 'infra',
  vercel: 'infra',
  aws: 'infra',
  terraform: 'infra',
  typescript: 'tooling',
  dart: 'tooling',
};

export function stackLayers(tags: readonly string[]): { layer: StackLayer; items: string[] }[] {
  const groups = new Map<StackLayer, string[]>();
  for (const tag of tags) {
    const layer = TAG_LAYER[tag.toLowerCase()] ?? 'tooling';
    groups.set(layer, [...(groups.get(layer) ?? []), tag]);
  }
  return LAYER_ORDER.filter((layer) => groups.has(layer)).map((layer) => ({ layer, items: groups.get(layer)! }));
}
