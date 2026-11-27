import type { Locale } from "@/i18n/config";
import type { Project } from "@/types";

/**
 * The structured half of each project page: measured figures, how it works, and the decisions behind it.
 * Kept apart from projects.ts so the long stories stay readable there. Only real numbers go in `figures`;
 * a project without measured figures simply has none.
 */
type ProjectDetails = Pick<Project, "figures" | "flow" | "decisions">;

export const projectDetails: Record<Locale, Record<string, ProjectDetails>> = {
  en: {
    "rag-evals": {
      figures: [
        {
          value: "0.829",
          label: "Recall@10 on 300 SciFact claims, vector search",
        },
        {
          value: "0.946",
          label: "Faithfulness of 50 answers, judged claim by claim",
        },
        {
          value: "0.756",
          label:
            "Recall@10 of equal-weight hybrid search: lower, and 6.6× slower",
        },
        {
          value: "0.00071 USD",
          label: "Per answer with Claude Haiku; the judge costs 13× more",
        },
      ],
      flow: {
        steps: [
          {
            label: "Client",
            detail: "Asks a question on /ask",
            kind: "actor",
          },
          {
            label: "FastAPI",
            detail: "Async SQLAlchemy and Pydantic v2",
            kind: "service",
          },
          {
            label: "Embeddings",
            detail: "bge-small, local, no API cost",
            kind: "model",
          },
          {
            label: "pgvector",
            detail: "HNSW index, top 6 chunks",
            kind: "store",
          },
          {
            label: "Claude Haiku",
            detail: "Chunks sent as search result blocks",
            kind: "model",
          },
          {
            label: "Answer",
            detail: "Citations that point to real chunk ids, and its cost",
            kind: "output",
          },
        ],
        loop: "Offline, the harness runs the same retrieval over 300 SciFact claims with expert labels and writes recall, MRR and latency to one JSON file per run. A second run sends 50 claims through /ask and has Claude Sonnet judge each answer for faithfulness and citations.",
      },
      decisions: [
        {
          title: "Let the evaluation pick the search mode",
          why: "Hybrid search was the plan. Measured, equal-weight hybrid reached a recall@10 of 0.756 against 0.829 for vectors, and tuning its full-text weight drove it to zero.",
          tradeoff:
            "SciFact is one domain. On keyword-heavy documents hybrid may win, so it stays available as an option.",
        },
        {
          title: "Tune on train, report on test",
          why: "The fusion weight was tuned on 809 train claims and the metrics come from the 300 test claims, so the reported number is not fitted to the test.",
          tradeoff:
            "Every change to retrieval needs two evaluation runs instead of one.",
        },
        {
          title: "Run the embeddings locally",
          why: "bge-small through fastembed means no embedding bill and the same vectors in CI and production.",
          tradeoff:
            "A small model with 384 dimensions, and indexing 5,183 abstracts takes about four minutes on a laptop CPU.",
        },
        {
          title: "Send chunks as search result blocks",
          why: "Claude cites the blocks it was given, so every citation points back to a chunk id the API returned instead of text the model made up.",
          tradeoff: "Generation is tied to Claude’s API format.",
        },
      ],
    },
    "ledger-go": {
      figures: [
        {
          value: "1",
          label: "Transaction from 50 simultaneous retries with the same key",
        },
        {
          value: "0",
          label: "Deadlocks with 32 workers moving money both ways",
        },
        {
          value: "2.4 ms",
          label: "Median post across 1,000 accounts, 8 concurrent clients",
        },
        {
          value: "207 ms",
          label: "p99 when 32 clients fight over 10 hot accounts",
        },
      ],
      flow: {
        steps: [
          {
            label: "Client",
            detail: "POST /transactions with an Idempotency-Key",
            kind: "actor",
          },
          {
            label: "API",
            detail: "Go net/http, entries must sum to zero",
            kind: "service",
          },
          {
            label: "Postgres",
            detail: "Key, ordered row locks, entries and balances",
            kind: "store",
          },
          {
            label: "Outbox",
            detail: "The event, in the same transaction",
            kind: "queue",
          },
          {
            label: "Relay workers",
            detail: "FOR UPDATE SKIP LOCKED",
            kind: "service",
          },
          {
            label: "Event",
            detail: "Published once",
            kind: "output",
          },
        ],
        loop: "A retry with the same key waits for the first one and gets its result back marked as a replay; the same key with a different body is rejected.",
      },
      decisions: [
        {
          title: "Lock accounts in id order",
          why: "Every transfer locks its accounts sorted by id, so two opposite transfers can never wait on each other.",
          tradeoff:
            "Pessimistic locking: on 10 hot accounts, more concurrency adds no throughput and the p99 jumps to 207 ms.",
        },
        {
          title: "Claim the idempotency key first",
          why: "The key is the first insert of the transaction, so a concurrent retry waits on it and then replays the result. 50 simultaneous retries posted once.",
          tradeoff:
            "A failed post must not burn the key, which is one more path to handle and test.",
        },
        {
          title: "Publish through a transactional outbox",
          why: "The event is written in the same transaction as the money, so there is never a transfer without its event or an event without its transfer.",
          tradeoff:
            "One more table and a relay to run, and consumers still need to dedupe if a relay dies between publishing and marking.",
        },
        {
          title: "Hand-written SQL instead of an ORM",
          why: "About 300 lines of SQL keep every lock and its order visible in the code.",
          tradeoff: "Every query is written and mapped by hand.",
        },
      ],
    },
    "vecsearch-go": {
      figures: [
        {
          value: "118,993",
          label: "Queries per second on 12 goroutines, recall@10 0.985",
        },
        {
          value: "8.75×",
          label: "Throughput of 12 goroutines against one, with no locks",
        },
        {
          value: "0.11 s",
          label: "Graph build on 8 workers, down from 0.79 s on one",
        },
        {
          value: "41×",
          label: "Throughput of an exact scan, on 100,000 vectors",
        },
      ],
      flow: {
        steps: [
          {
            label: "Embeddings",
            detail: "5,183 SciFact abstracts, bge-small, 384 dims",
            kind: "model",
          },
          {
            label: "Parallel build",
            detail: "Goroutines insert with one mutex per node",
            kind: "service",
          },
          {
            label: "Freeze",
            detail: "The graph stops changing; later inserts panic",
            kind: "store",
          },
          {
            label: "Search",
            detail: "Concurrent and lock-free, scratch from a sync.Pool",
            kind: "service",
          },
          {
            label: "HTTP API",
            detail: "POST /search behind a semaphore",
            kind: "output",
          },
        ],
        loop: "Every run checks HNSW against exact search on the same queries, so each throughput figure comes with its recall@10.",
      },
      decisions: [
        {
          title: "Freeze the index instead of locking reads",
          why: "A built graph never changes, and even a read lock writes to a shared cache line. Freezing it lets every search run without locks.",
          tradeoff: "No inserts after the build; new vectors mean a rebuild.",
        },
        {
          title: "Parallelize between queries, not inside one",
          why: "Splitting one query over 8 graphs made it slower (71 → 93 µs) and lowered recall, because each shard repeats the beam search.",
          tradeoff:
            "One query is no faster on more cores; only throughput grows.",
        },
        {
          title: "Pure Go float32, no SIMD",
          why: "The code stays readable and portable; the dot product is unrolled by eight instead.",
          tradeoff:
            "Quantizing to int8 would cut memory traffic 4×, and it is not measured yet.",
        },
        {
          title: "Clustered synthetic data, not uniform",
          why: "Real embeddings cluster, and uniform random vectors make every index look worse than it is.",
          tradeoff:
            "The 100k figures are still synthetic and were run on a busy machine, so they are a lower bound.",
        },
      ],
    },
    "football-data-pipeline": {
      figures: [
        {
          value: "0",
          label: "Duplicate rows, against 1,055 in the old scraper",
        },
        {
          value: "0.28 s",
          label: "To parse and validate 24 seasons of pages",
        },
        {
          value: "56%",
          label: "Home wins when the home city is 2,500 m or more higher",
        },
        {
          value: "39.1 s",
          label: "Full scheduled run end to end on Floci, a local AWS emulator",
        },
      ],
      flow: {
        steps: [
          {
            label: "Scheduler",
            detail: "EventBridge, weekly, through Step Functions",
            kind: "service",
          },
          {
            label: "Ingest",
            detail: "Lambda fetches 24 pages and keeps the raw HTML",
            kind: "service",
          },
          {
            label: "Quality",
            detail: "Valid rows, or quarantine with reasons",
            kind: "service",
          },
          {
            label: "Transform",
            detail: "DuckDB writes partitioned Parquet to S3",
            kind: "store",
          },
          {
            label: "API",
            detail: "FastAPI and DuckDB behind API Gateway",
            kind: "output",
          },
        ],
        loop: "Step Functions retries each job and a failed run raises an alarm. A parser fix replays over the stored HTML without fetching Wikipedia again.",
      },
      decisions: [
        {
          title: "Keep the raw HTML",
          why: "Pages are stored before parsing, so a parser fix can be replayed over every season without fetching Wikipedia again.",
          tradeoff: "About 26 MB of HTML per full run.",
        },
        {
          title: "Quarantine, never drop",
          why: "The old scripts skipped what they could not parse, which hid the duplicates. Here every rejected row is written with its reasons and counted.",
          tradeoff:
            "Someone has to read the quarantine; two rows sit there today.",
        },
        {
          title: "DuckDB instead of dbt or Spark",
          why: "The dataset is a few thousand rows. DuckDB reads JSON and S3 and writes partitioned Parquet from SQL inside a Lambda.",
          tradeoff: "No lineage view or model tests like dbt would give.",
        },
        {
          title: "Wikipedia only on the schedule",
          why: "Transfermarkt’s terms forbid automated scraping, so the market values stayed out of the pipeline.",
          tradeoff: "The altitude table cannot weigh in squad value anymore.",
        },
      ],
    },
    "football-data": {
      figures: [
        {
          value: "11",
          label: "Libertadores seasons scraped, 2014 to 2024",
        },
        {
          value: "110",
          label: "Cities mapped to their altitude",
        },
        {
          value: "103",
          label: "Clubs with their squad market value",
        },
        {
          value: "17",
          label: "Seasons of market values, 2010 to 2026",
        },
      ],
      flow: {
        steps: [
          {
            label: "Wikipedia",
            detail: "Group stage and knockouts, season by season",
            kind: "store",
          },
          {
            label: "Scraper",
            detail: "Requests and PyQuery parse every match",
            kind: "service",
          },
          {
            label: "Raw JSON",
            detail: "Matches exactly as parsed",
            kind: "store",
          },
          {
            label: "Altitude",
            detail: "pandas joins each city with its height",
            kind: "service",
          },
          {
            label: "Market value",
            detail: "Transfermarkt history for each club",
            kind: "service",
          },
          {
            label: "CSV",
            detail: "1,729 matches ready for analysis",
            kind: "output",
          },
        ],
        loop: "A club that matched the wrong Transfermarkt page is marked for retry and validated again; every step can resume where it stopped.",
      },
      decisions: [
        {
          title: "Keep raw and processed data apart",
          why: "Matches are saved exactly as parsed, so the altitude step can change and re-run without scraping again.",
          tradeoff: "A parsing fix still means scraping the season again.",
        },
        {
          title: "One file maintained by hand: the city map",
          why: "No source maps every club to the altitude of its city, so 110 cities live in one JSON file, with their teams.",
          tradeoff:
            "A new club needs a manual entry before its matches get an altitude.",
        },
        {
          title: "Make the market value scraper resumable",
          why: "Searching Transfermarkt by name sometimes finds the wrong club. Each club carries a status, wrong ones are marked for retry and checked, and a run continues where it stopped.",
          tradeoff:
            "Slower on purpose: a delay between requests makes each phase take several minutes.",
        },
      ],
    },
    "sign-language-recognition": {
      figures: [
        {
          value: "26",
          label: "Letters the network tells apart",
        },
        {
          value: "3",
          label: "Convolution layers, trained from scratch",
        },
        {
          value: "25",
          label: "Training epochs on 64×64 images",
        },
      ],
      flow: {
        steps: [
          {
            label: "You",
            detail: "Sign a letter inside the box",
            kind: "actor",
          },
          {
            label: "Camera",
            detail: "OpenCV inside a PyQt5 app",
            kind: "client",
          },
          {
            label: "HSV mask",
            detail: "Separates the hand from the background",
            kind: "service",
          },
          {
            label: "SIFT check",
            detail: "Matches saved custom gestures first",
            kind: "service",
          },
          {
            label: "CNN",
            detail: "Keras, softmax over 26 letters",
            kind: "model",
          },
          {
            label: "Letter",
            detail: "Shown live, or scored in test mode",
            kind: "output",
          },
        ],
      },
      decisions: [
        {
          title: "Mask the hand before the model sees it",
          why: "An HSV mask on a fixed region removes the background, so a small network trained on 64×64 images only has to learn the shape of the hand.",
          tradeoff:
            "It depends on lighting, and the hand has to stay inside the box.",
        },
        {
          title: "Add gestures without retraining",
          why: "SIFT features with a FLANN matcher compare the frame with a folder of saved gestures, so a new one, like a space, is just an image dropped in that folder.",
          tradeoff:
            "The match runs before the network, so a loose threshold can override a correct prediction.",
        },
      ],
    },
    "lbph-face-recognition": {
      figures: [
        {
          value: "300",
          label: "Face crops captured per person",
        },
        {
          value: "150 px",
          label: "Square grayscale crops for training",
        },
        {
          value: "70",
          label: "Distance under which a face counts as known",
        },
      ],
      flow: {
        steps: [
          {
            label: "Person",
            detail: "Sits in front of the webcam",
            kind: "actor",
          },
          {
            label: "Haar cascade",
            detail: "Finds faces in each frame",
            kind: "service",
          },
          {
            label: "Capture",
            detail: "300 grayscale crops per person",
            kind: "store",
          },
          {
            label: "LBPH",
            detail: "One label per person, saved to a file",
            kind: "model",
          },
          {
            label: "Live result",
            detail: "A name, or an unknown face",
            kind: "output",
          },
        ],
      },
      decisions: [
        {
          title: "LBPH instead of a deep network",
          why: "It describes faces by local texture, so it trains in seconds on a laptop from a few hundred photos.",
          tradeoff:
            "It handles pose and angle worse than learned embeddings, and every new person means training again.",
        },
        {
          title: "Prefer unknown over a wrong name",
          why: "A face only gets a name when the distance is under 70; everything else is drawn in red as unknown.",
          tradeoff:
            "The threshold is fixed by hand, so a known person in different light can show up as unknown.",
        },
      ],
    },
    "hands-tracking": {
      figures: [
        {
          value: "21",
          label: "Landmarks per hand, wrist to fingertips",
        },
        {
          value: "0",
          label: "Training images needed: the model comes pretrained",
        },
      ],
      flow: {
        steps: [
          {
            label: "Camera",
            detail: "OpenCV reads the live feed",
            kind: "client",
          },
          {
            label: "MediaPipe Hands",
            detail: "21 landmarks per hand",
            kind: "model",
          },
          {
            label: "Box",
            detail: "Outer edges of the fingers and the wrist",
            kind: "service",
          },
          {
            label: "Square crop",
            detail: "Padded on its short side, drawn when it fits",
            kind: "output",
          },
        ],
      },
      decisions: [
        {
          title: "Square the box around the hand",
          why: "Image classifiers take square inputs; padding the shorter side keeps the hand in proportion instead of stretching it.",
          tradeoff: "A long, narrow hand brings more background into the crop.",
        },
        {
          title: "Use a pretrained landmark model",
          why: "MediaPipe finds the hand anywhere in the frame with no training data of my own.",
          tradeoff:
            "Accuracy and speed are whatever the model gives; there is nothing to tune.",
        },
      ],
    },
    "codesentry-swarm": {
      figures: [
        { value: "3", label: "AI agents, each behind its own queue" },
        {
          value: "111 s",
          label: "From a new pull request to a proposed fix, live",
        },
        {
          value: "0.13 USD",
          label: "Model cost for 22 reviewed pull requests",
        },
        { value: "15", label: "Spans in one trace, from webhook to verdict" },
      ],
      flow: {
        steps: [
          {
            label: "Pull request",
            detail: "Signed GitHub webhook",
            kind: "actor",
          },
          {
            label: "API",
            detail: "Cloud Run answers 202 and stores the task in Firestore",
            kind: "service",
          },
          {
            label: "Triage",
            detail: "Gemini writes a hypothesis, a test and the fix",
            kind: "agent",
          },
          {
            label: "Sandbox",
            detail: "Cloud Run Job with no network and no roles",
            kind: "service",
          },
          {
            label: "Judge",
            detail: "Gemini reads the exit codes and writes the verdict",
            kind: "agent",
          },
          {
            label: "Comment",
            detail: "The fix and a typed report on the pull request",
            kind: "output",
          },
        ],
        loop: "Every hop is a Pub/Sub message with retries and a dead-letter queue. A red run goes back to Triage with feedback, up to 3 times, and then asks a human.",
      },
      decisions: [
        {
          title: "Put every agent behind a queue",
          why: "A slow or failing model call retries with backoff instead of holding the webhook open. After 5 attempts the message lands in a dead-letter queue instead of disappearing.",
          tradeoff:
            "Pub/Sub starts a new trace for each message and Eventarc arrives with no context, so the trace ID has to travel by hand.",
        },
        {
          title: "Let exit codes decide, not the model",
          why: "The new test must fail before the fix and the whole suite must pass after it. The Judge can reject a green run, but it can never approve a red one.",
          tradeoff:
            "Green is evidence, not proof: a test that only covered its own case let a wrong rounding fix through. That is why a human merges.",
        },
        {
          title: "Run untrusted code in a job with no identity",
          why: "The sandbox has no network and its service account has no roles. It reads the code and writes the result through signed URLs that expire in 15 minutes.",
          tradeoff:
            "The first run took 1 min 32 s to start, so a live demo needs a warm-up pull request first.",
        },
        {
          title: "Derive the task ID from the commit",
          why: "The ID comes from the repository, the pull request number and the commit, so a redelivered webhook lands on the same task and each stage is claimed once.",
          tradeoff:
            "Every new push is a new task, so pushing again means another review and another comment.",
        },
      ],
    },
    kairo: {
      figures: [
        {
          value: "2",
          label: "Platforms, iOS and Android, from one Flutter codebase",
        },
        {
          value: "9",
          label: "Features, each built with Clean Architecture and BLoC",
        },
        { value: "25 min", label: "Focus sessions on a single task" },
        { value: "2", label: "Languages, English and Spanish" },
      ],
      flow: {
        steps: [
          { label: "You", detail: "Add, swipe, plan and focus", kind: "actor" },
          {
            label: "App",
            detail: "Flutter, one BLoC per feature",
            kind: "client",
          },
          {
            label: "Device copy",
            detail: "The task list and an outbox of edits",
            kind: "store",
          },
          {
            label: "Supabase",
            detail: "Postgres, Auth and Realtime",
            kind: "service",
          },
          {
            label: "Friends",
            detail: "Shared tasks, or a Busy block",
            kind: "actor",
          },
        ],
        loop: "Offline edits wait in order in the outbox and go out when the connection returns. Realtime brings friends’ changes back, and Firebase Cloud Messaging sends the reminders.",
      },
      decisions: [
        {
          title: "Open the list from a copy on the device",
          why: "The app opens instantly and keeps working with no signal. Edits wait in order and sync when the connection comes back.",
          tradeoff:
            "Two copies of the truth to reconcile, and an outbox that has to replay edits in the right order.",
        },
        {
          title: "Count a streak on the day you finished",
          why: "Streaks come from when a task was completed, not when it was due, so the app never scolds you for the calendar.",
          tradeoff:
            "Less generous than most apps: a task finished after midnight counts for the next day.",
        },
        {
          title: "Clean Architecture and BLoC in every feature",
          why: "Each feature keeps interface, logic and data apart, so one can change without breaking the others.",
          tradeoff: "More files and more ceremony, even for small screens.",
        },
      ],
    },
    openstage: {
      figures: [
        {
          value: "0",
          label: "Servers to process video: FFmpeg runs in the browser",
        },
        { value: "3", label: "Export targets: TikTok, Instagram and YouTube" },
      ],
      flow: {
        steps: [
          {
            label: "Band",
            detail: "Uploads a song or a live video",
            kind: "actor",
          },
          {
            label: "Browser",
            detail: "Next.js, with bands and roles in Supabase",
            kind: "client",
          },
          {
            label: "Whisper",
            detail: "Transcribes the audio locally",
            kind: "model",
          },
          {
            label: "FFmpeg WASM",
            detail: "Cuts and encodes inside the tab",
            kind: "service",
          },
          {
            label: "Clip",
            detail: "Formats for TikTok, Instagram and YouTube",
            kind: "output",
          },
        ],
      },
      decisions: [
        {
          title: "Process video in the browser",
          why: "FFmpeg compiled to WebAssembly cuts and encodes on the musician’s own device, so the footage never leaves it and there is no render server to pay for.",
          tradeoff:
            "Speed depends on the visitor’s device: long or high-resolution videos are slower on a modest laptop or phone.",
        },
        {
          title: "Stay on free tiers",
          why: "It has to stay free for independent artists, so Supabase and Vercel carry the backend with no infrastructure of my own.",
          tradeoff: "Free-tier limits set the ceiling on storage and usage.",
        },
      ],
    },
    "vibe-architect": {
      figures: [
        { value: "~40", label: "Production-ready files per project" },
        {
          value: "2–4",
          label: "Architectures proposed, each with pros and cons",
        },
        { value: "4", label: "Gemini calls in parallel for the documentation" },
        { value: "60–80%", label: "Of the files come from tested templates" },
      ],
      flow: {
        steps: [
          {
            label: "You",
            detail: "Describe the project in a sentence",
            kind: "actor",
          },
          {
            label: "Analyze",
            detail: "Gemini sizes its complexity",
            kind: "agent",
          },
          {
            label: "Propose",
            detail: "Clean, MVC, Hexagonal or another fit",
            kind: "agent",
          },
          {
            label: "Generate",
            detail: "Templates plus parallel Gemini calls",
            kind: "service",
          },
          {
            label: "Stream",
            detail: "Progress over SSE, from 0 to 100%",
            kind: "client",
          },
          {
            label: "Project",
            detail: "Around 40 files, saved to Firebase",
            kind: "output",
          },
        ],
      },
      decisions: [
        {
          title: "Choose the architecture before writing code",
          why: "Vibe coding skips structure. Measuring complexity first lets the user pick Clean, MVC or Hexagonal on purpose.",
          tradeoff: "One more step before the user sees any code.",
        },
        {
          title: "Reuse templates, generate only what is unique",
          why: "Configs and common files come from templates, and the AI writes only the part that depends on the project. Faster, cheaper and more predictable.",
          tradeoff:
            "The templates have to be maintained for every framework it supports.",
        },
      ],
    },
    "open-kanban-board": {
      flow: {
        steps: [
          {
            label: "You",
            detail: "Drag a task to another column",
            kind: "actor",
          },
          {
            label: "App",
            detail: "Next.js, installable as a PWA",
            kind: "client",
          },
          {
            label: "Firestore",
            detail: "Realtime listeners on the board",
            kind: "store",
          },
          {
            label: "Teammates",
            detail: "The same board, live cursors included",
            kind: "actor",
          },
        ],
      },
      decisions: [
        {
          title: "Realtime listeners instead of an API of my own",
          why: "Every board syncs across devices and teammates through Firestore, with no server to run.",
          tradeoff:
            "The data model follows Firestore’s queries, and every read counts toward its limits.",
        },
        {
          title: "Ship it as a PWA",
          why: "One codebase installs on phones and desktops and feels close to native.",
          tradeoff:
            "Fewer native capabilities than an app-store app, especially on iOS.",
        },
      ],
    },
    "cadenza-app": {
      figures: [
        {
          value: "4",
          label:
            "Tools: chord namer, scale finder, scale explorer and circle of fifths",
        },
        { value: "2", label: "Instruments to play on: guitar and piano" },
        { value: "2", label: "Languages, English and Spanish" },
      ],
      flow: {
        steps: [
          {
            label: "You",
            detail: "Press notes on a guitar or a piano",
            kind: "actor",
          },
          {
            label: "Chord namer",
            detail: "Names the chord those notes make",
            kind: "service",
          },
          {
            label: "Scale finder",
            detail: "Scales that fit the progression",
            kind: "service",
          },
          {
            label: "Your instrument",
            detail: "The scale drawn on the fretboard or keys",
            kind: "output",
          },
        ],
      },
      decisions: [
        {
          title: "Everything runs in the browser",
          why: "No account and no server: open it and play. It costs nothing to host and nothing to use.",
          tradeoff:
            "With no accounts there is nothing to sync between devices.",
        },
      ],
    },
    "gdg-ecuador": {
      decisions: [
        {
          title: "Grow one event site into the hub for every event",
          why: "Build with AI already had schedules, speakers, venues and registration. Reusing it gave DevFests, Study Jams and meetups a single home.",
          tradeoff:
            "The data model had to stop assuming there was only one event.",
        },
        {
          title: "Bilingual from the start",
          why: "Spanish and English speakers across the country use the same site.",
          tradeoff:
            "Every session, speaker bio and announcement needs two versions.",
        },
      ],
    },
    flights: {
      flow: {
        steps: [
          {
            label: "You",
            detail: "Search flights with filters",
            kind: "actor",
          },
          {
            label: "Next.js",
            detail: "Infinite scroll and a live dashboard",
            kind: "client",
          },
          {
            label: "FastAPI",
            detail: "CO₂ and fuel calculations",
            kind: "service",
          },
          { label: "Supabase", detail: "Flight data and users", kind: "store" },
        ],
      },
      decisions: [
        {
          title: "Split a Next.js frontend from a FastAPI backend",
          why: "The calculations live in Python, next to the data, and the interface only renders the results.",
          tradeoff: "Two deployments and an API contract to keep in step.",
        },
        {
          title: "Infinite scroll instead of pages",
          why: "Large flight datasets can be browsed without paging controls getting in the way.",
          tradeoff:
            "Harder to link to a position in the list or come back to it.",
        },
      ],
    },
  },
  es: {
    "rag-evals": {
      figures: [
        {
          value: "0,829",
          label: "Recall@10 en 300 afirmaciones de SciFact, búsqueda vectorial",
        },
        {
          value: "0,946",
          label: "Fidelidad de 50 respuestas, revisadas afirmación por afirmación",
        },
        {
          value: "0,756",
          label:
            "Recall@10 de la búsqueda híbrida con pesos iguales: menor, y 6,6 veces más lenta",
        },
        {
          value: "0,00071 USD",
          label: "Por respuesta con Claude Haiku; el juez cuesta 13 veces más",
        },
      ],
      flow: {
        steps: [
          {
            label: "Cliente",
            detail: "Hace una pregunta en /ask",
            kind: "actor",
          },
          {
            label: "FastAPI",
            detail: "SQLAlchemy asíncrono y Pydantic v2",
            kind: "service",
          },
          {
            label: "Embeddings",
            detail: "bge-small, local, sin costo de API",
            kind: "model",
          },
          {
            label: "pgvector",
            detail: "Índice HNSW, los 6 mejores fragmentos",
            kind: "store",
          },
          {
            label: "Claude Haiku",
            detail: "Fragmentos como bloques de resultados de búsqueda",
            kind: "model",
          },
          {
            label: "Respuesta",
            detail: "Citas que apuntan a ids reales, y su costo",
            kind: "output",
          },
        ],
        loop: "Fuera de línea, el banco de pruebas corre la misma recuperación sobre 300 afirmaciones de SciFact con etiquetas de expertos y escribe recall, MRR y latencia en un archivo JSON por ejecución. Otra ejecución pasa 50 afirmaciones por /ask y Claude Sonnet juzga la fidelidad y las citas de cada respuesta.",
      },
      decisions: [
        {
          title: "Que la evaluación elija el modo de búsqueda",
          why: "El plan era búsqueda híbrida. Medida, la híbrida con pesos iguales llegó a un recall@10 de 0,756 frente a 0,829 de los vectores, y ajustar su peso de texto completo lo llevó a cero.",
          tradeoff:
            "SciFact es un solo dominio. Con documentos donde mandan las palabras clave la híbrida podría ganar, así que sigue disponible como opción.",
        },
        {
          title: "Ajustar en entrenamiento, reportar en prueba",
          why: "El peso de la fusión se ajustó con 809 afirmaciones de entrenamiento y las métricas salen de las 300 de prueba, así que la cifra reportada no está ajustada a la prueba.",
          tradeoff:
            "Cada cambio en la recuperación necesita dos ejecuciones de evaluación en vez de una.",
        },
        {
          title: "Calcular los embeddings en local",
          why: "bge-small con fastembed significa cero factura de embeddings y los mismos vectores en CI y en producción.",
          tradeoff:
            "Un modelo pequeño de 384 dimensiones, e indexar 5.183 resúmenes toma unos cuatro minutos en la CPU de una laptop.",
        },
        {
          title: "Enviar los fragmentos como bloques de resultados",
          why: "Claude cita los bloques que recibió, así que cada cita apunta a un id de fragmento que devolvió la API y no a texto inventado por el modelo.",
          tradeoff: "La generación queda atada al formato de la API de Claude.",
        },
      ],
    },
    "ledger-go": {
      figures: [
        {
          value: "1",
          label: "Transacción de 50 reintentos simultáneos con la misma clave",
        },
        {
          value: "0",
          label: "Deadlocks con 32 workers moviendo dinero en ambos sentidos",
        },
        {
          value: "2,4 ms",
          label: "Registro medio sobre 1.000 cuentas, con 8 clientes a la vez",
        },
        {
          value: "207 ms",
          label: "p99 cuando 32 clientes se pelean por 10 cuentas calientes",
        },
      ],
      flow: {
        steps: [
          {
            label: "Cliente",
            detail: "POST /transactions con una Idempotency-Key",
            kind: "actor",
          },
          {
            label: "API",
            detail: "Go net/http, los asientos deben sumar cero",
            kind: "service",
          },
          {
            label: "Postgres",
            detail: "Clave, bloqueos ordenados, asientos y saldos",
            kind: "store",
          },
          {
            label: "Outbox",
            detail: "El evento, en la misma transacción",
            kind: "queue",
          },
          {
            label: "Workers de relay",
            detail: "FOR UPDATE SKIP LOCKED",
            kind: "service",
          },
          {
            label: "Evento",
            detail: "Publicado una vez",
            kind: "output",
          },
        ],
        loop: "Un reintento con la misma clave espera al primero y recibe su resultado marcado como repetición; la misma clave con otro contenido se rechaza.",
      },
      decisions: [
        {
          title: "Bloquear las cuentas en orden de id",
          why: "Cada transferencia bloquea sus cuentas ordenadas por id, así que dos transferencias opuestas nunca se esperan entre sí.",
          tradeoff:
            "Bloqueo pesimista: con 10 cuentas calientes, más concurrencia no da más rendimiento y el p99 sube a 207 ms.",
        },
        {
          title: "Reclamar primero la clave de idempotencia",
          why: "La clave es el primer insert de la transacción, así que un reintento simultáneo espera y luego repite el resultado. 50 reintentos a la vez se registraron una vez.",
          tradeoff:
            "Un registro fallido no debe gastar la clave, y eso es un camino más que manejar y probar.",
        },
        {
          title: "Publicar con un outbox transaccional",
          why: "El evento se escribe en la misma transacción que el dinero, así que nunca hay una transferencia sin su evento ni un evento sin su transferencia.",
          tradeoff:
            "Una tabla más y un relay que operar, y los consumidores igual deben deduplicar si un relay cae entre publicar y marcar.",
        },
        {
          title: "SQL escrito a mano en lugar de un ORM",
          why: "Unas 300 líneas de SQL dejan cada bloqueo y su orden a la vista en el código.",
          tradeoff: "Cada consulta se escribe y se mapea a mano.",
        },
      ],
    },
    "vecsearch-go": {
      figures: [
        {
          value: "118.993",
          label: "Consultas por segundo en 12 goroutines, recall@10 de 0,985",
        },
        {
          value: "8,75×",
          label: "Rendimiento de 12 goroutines frente a una, sin locks",
        },
        {
          value: "0,11 s",
          label: "Construcción del grafo con 8 workers, frente a 0,79 s con uno",
        },
        {
          value: "41×",
          label: "El rendimiento de una búsqueda exacta, con 100.000 vectores",
        },
      ],
      flow: {
        steps: [
          {
            label: "Embeddings",
            detail: "5.183 resúmenes de SciFact, bge-small, 384 dimensiones",
            kind: "model",
          },
          {
            label: "Construcción en paralelo",
            detail: "Goroutines insertan con un mutex por nodo",
            kind: "service",
          },
          {
            label: "Congelar",
            detail: "El grafo deja de cambiar; insertar después es un panic",
            kind: "store",
          },
          {
            label: "Búsqueda",
            detail: "Concurrente y sin locks, memoria de un sync.Pool",
            kind: "service",
          },
          {
            label: "API HTTP",
            detail: "POST /search detrás de un semáforo",
            kind: "output",
          },
        ],
        loop: "Cada ejecución compara HNSW con la búsqueda exacta sobre las mismas consultas, así que cada cifra de rendimiento viene con su recall@10.",
      },
      decisions: [
        {
          title: "Congelar el índice en lugar de bloquear lecturas",
          why: "Un grafo construido no cambia, y hasta un lock de lectura escribe en una línea de caché compartida. Congelarlo deja que cada búsqueda corra sin locks.",
          tradeoff:
            "No se puede insertar después de construir; vectores nuevos implican reconstruir.",
        },
        {
          title: "Paralelizar entre consultas, no dentro de una",
          why: "Repartir una consulta entre 8 grafos la hizo más lenta (71 → 93 µs) y bajó el recall, porque cada fragmento repite la búsqueda en haz.",
          tradeoff:
            "Una consulta no va más rápido con más núcleos; solo crece el rendimiento total.",
        },
        {
          title: "Go puro con float32, sin SIMD",
          why: "El código queda legible y portable; a cambio, el producto punto se desenrolla de ocho en ocho.",
          tradeoff:
            "Cuantizar a int8 reduciría 4 veces el tráfico de memoria, y aún no está medido.",
        },
        {
          title: "Datos sintéticos agrupados, no uniformes",
          why: "Los embeddings reales forman grupos, y los vectores aleatorios uniformes hacen que cualquier índice parezca peor de lo que es.",
          tradeoff:
            "Las cifras de 100.000 vectores siguen siendo sintéticas y salieron de una máquina ocupada, así que son un mínimo.",
        },
      ],
    },
    "football-data-pipeline": {
      figures: [
        {
          value: "0",
          label: "Filas duplicadas, frente a 1.055 en el scraper antiguo",
        },
        {
          value: "0,28 s",
          label: "Para leer y validar 24 temporadas de páginas",
        },
        {
          value: "56%",
          label:
            "Victorias locales cuando la ciudad local está 2.500 m o más arriba",
        },
        {
          value: "39,1 s",
          label: "Ejecución programada completa en Floci, un emulador local de AWS",
        },
      ],
      flow: {
        steps: [
          {
            label: "Programador",
            detail: "EventBridge, semanal, con Step Functions",
            kind: "service",
          },
          {
            label: "Ingesta",
            detail: "Lambda descarga 24 páginas y guarda el HTML",
            kind: "service",
          },
          {
            label: "Calidad",
            detail: "Filas válidas, o cuarentena con motivos",
            kind: "service",
          },
          {
            label: "Transformación",
            detail: "DuckDB escribe Parquet particionado en S3",
            kind: "store",
          },
          {
            label: "API",
            detail: "FastAPI y DuckDB detrás de API Gateway",
            kind: "output",
          },
        ],
        loop: "Step Functions reintenta cada job y una ejecución fallida dispara una alarma. Una corrección del parser se vuelve a correr sobre el HTML guardado sin descargar Wikipedia otra vez.",
      },
      decisions: [
        {
          title: "Guardar el HTML crudo",
          why: "Las páginas se guardan antes de leerlas, así que una corrección del parser se aplica a todas las temporadas sin descargar Wikipedia otra vez.",
          tradeoff: "Unos 26 MB de HTML por ejecución completa.",
        },
        {
          title: "Cuarentena, nunca descartar",
          why: "Los scripts antiguos se saltaban lo que no podían leer, y eso escondió los duplicados. Aquí cada fila rechazada se escribe con sus motivos y se cuenta.",
          tradeoff:
            "Alguien tiene que revisar la cuarentena; hoy tiene dos filas.",
        },
        {
          title: "DuckDB en lugar de dbt o Spark",
          why: "El dataset tiene unos pocos miles de filas. DuckDB lee JSON y S3 y escribe Parquet particionado desde SQL dentro de una Lambda.",
          tradeoff:
            "No hay vista de linaje ni tests de modelos como los que daría dbt.",
        },
        {
          title: "Solo Wikipedia en la ejecución programada",
          why: "Los términos de Transfermarkt prohíben el scraping automatizado, así que los valores de mercado quedaron fuera del pipeline.",
          tradeoff:
            "La tabla de altitud ya no puede ponderar el valor de las plantillas.",
        },
      ],
    },
    "football-data": {
      figures: [
        {
          value: "11",
          label: "Temporadas de la Libertadores extraídas, de 2014 a 2024",
        },
        {
          value: "110",
          label: "Ciudades con su altitud",
        },
        {
          value: "103",
          label: "Clubes con el valor de mercado de su plantilla",
        },
        {
          value: "17",
          label: "Temporadas de valores de mercado, de 2010 a 2026",
        },
      ],
      flow: {
        steps: [
          {
            label: "Wikipedia",
            detail: "Fase de grupos y eliminatorias, temporada por temporada",
            kind: "store",
          },
          {
            label: "Scraper",
            detail: "Requests y PyQuery leen cada partido",
            kind: "service",
          },
          {
            label: "JSON crudo",
            detail: "Los partidos tal como se leyeron",
            kind: "store",
          },
          {
            label: "Altitud",
            detail: "pandas cruza cada ciudad con su altura",
            kind: "service",
          },
          {
            label: "Valor de mercado",
            detail: "Historial de Transfermarkt de cada club",
            kind: "service",
          },
          {
            label: "CSV",
            detail: "1.729 partidos listos para analizar",
            kind: "output",
          },
        ],
        loop: "Un club que coincidió con la página equivocada de Transfermarkt se marca para reintentar y se valida de nuevo; cada paso retoma donde se quedó.",
      },
      decisions: [
        {
          title: "Separar los datos crudos de los procesados",
          why: "Los partidos se guardan tal como se leyeron, así que el paso de altitud puede cambiar y volver a correr sin extraer otra vez.",
          tradeoff:
            "Corregir cómo se lee una página igual obliga a extraer esa temporada de nuevo.",
        },
        {
          title: "Un solo archivo mantenido a mano: el mapa de ciudades",
          why: "Ninguna fuente relaciona cada club con la altitud de su ciudad, así que 110 ciudades viven en un JSON, con sus equipos.",
          tradeoff:
            "Un club nuevo necesita una entrada manual antes de que sus partidos tengan altitud.",
        },
        {
          title: "Que el scraper de valores pueda retomar",
          why: "Buscar en Transfermarkt por nombre a veces encuentra el club equivocado. Cada club lleva un estado, los incorrectos se marcan para reintentar y se validan, y una ejecución sigue donde se quedó.",
          tradeoff:
            "Más lento a propósito: una pausa entre peticiones hace que cada fase tarde varios minutos.",
        },
      ],
    },
    "sign-language-recognition": {
      figures: [
        {
          value: "26",
          label: "Letras que la red distingue",
        },
        {
          value: "3",
          label: "Capas de convolución, entrenadas desde cero",
        },
        {
          value: "25",
          label: "Épocas de entrenamiento con imágenes de 64×64",
        },
      ],
      flow: {
        steps: [
          {
            label: "Tú",
            detail: "Haces una letra dentro del recuadro",
            kind: "actor",
          },
          {
            label: "Cámara",
            detail: "OpenCV dentro de una app en PyQt5",
            kind: "client",
          },
          {
            label: "Máscara HSV",
            detail: "Separa la mano del fondo",
            kind: "service",
          },
          {
            label: "Revisión SIFT",
            detail: "Compara primero con gestos guardados",
            kind: "service",
          },
          {
            label: "CNN",
            detail: "Keras, softmax sobre 26 letras",
            kind: "model",
          },
          {
            label: "Letra",
            detail: "En vivo, o calificada en modo de prueba",
            kind: "output",
          },
        ],
      },
      decisions: [
        {
          title: "Enmascarar la mano antes de que la vea el modelo",
          why: "Una máscara HSV sobre una región fija quita el fondo, así que una red pequeña entrenada con imágenes de 64×64 solo tiene que aprender la forma de la mano.",
          tradeoff:
            "Depende de la luz, y la mano tiene que quedarse dentro del recuadro.",
        },
        {
          title: "Agregar gestos sin volver a entrenar",
          why: "Características SIFT con un matcher FLANN comparan el cuadro con una carpeta de gestos guardados, así que uno nuevo, como el espacio, es solo una imagen en esa carpeta.",
          tradeoff:
            "La comparación corre antes que la red, así que un umbral flojo puede pisar una predicción correcta.",
        },
      ],
    },
    "lbph-face-recognition": {
      figures: [
        {
          value: "300",
          label: "Recortes de rostro capturados por persona",
        },
        {
          value: "150 px",
          label: "Recortes cuadrados en escala de grises para entrenar",
        },
        {
          value: "70",
          label: "Distancia bajo la cual un rostro se reconoce",
        },
      ],
      flow: {
        steps: [
          {
            label: "Persona",
            detail: "Se sienta frente a la webcam",
            kind: "actor",
          },
          {
            label: "Clasificador Haar",
            detail: "Encuentra rostros en cada cuadro",
            kind: "service",
          },
          {
            label: "Captura",
            detail: "300 recortes en escala de grises por persona",
            kind: "store",
          },
          {
            label: "LBPH",
            detail: "Una etiqueta por persona, guardada en un archivo",
            kind: "model",
          },
          {
            label: "Resultado en vivo",
            detail: "Un nombre, o un rostro desconocido",
            kind: "output",
          },
        ],
      },
      decisions: [
        {
          title: "LBPH en lugar de una red profunda",
          why: "Describe los rostros por su textura local, así que entrena en segundos en una laptop con unos cientos de fotos.",
          tradeoff:
            "Maneja peor la pose y el ángulo que los embeddings aprendidos, y cada persona nueva obliga a entrenar otra vez.",
        },
        {
          title: "Preferir desconocido a un nombre equivocado",
          why: "Un rostro solo recibe un nombre si la distancia es menor a 70; lo demás se dibuja en rojo como desconocido.",
          tradeoff:
            "El umbral se fijó a mano, así que una persona conocida con otra luz puede aparecer como desconocida.",
        },
      ],
    },
    "hands-tracking": {
      figures: [
        {
          value: "21",
          label: "Puntos por mano, de la muñeca a la punta de los dedos",
        },
        {
          value: "0",
          label: "Imágenes de entrenamiento: el modelo viene preentrenado",
        },
      ],
      flow: {
        steps: [
          {
            label: "Cámara",
            detail: "OpenCV lee la imagen en vivo",
            kind: "client",
          },
          {
            label: "MediaPipe Hands",
            detail: "21 puntos por mano",
            kind: "model",
          },
          {
            label: "Recuadro",
            detail: "Bordes exteriores de los dedos y la muñeca",
            kind: "service",
          },
          {
            label: "Recorte cuadrado",
            detail: "Relleno en su lado corto, se dibuja si cabe",
            kind: "output",
          },
        ],
      },
      decisions: [
        {
          title: "Volver cuadrado el recuadro de la mano",
          why: "Los clasificadores de imágenes reciben entradas cuadradas; rellenar el lado más corto mantiene la proporción de la mano en vez de estirarla.",
          tradeoff: "Una mano larga y angosta mete más fondo en el recorte.",
        },
        {
          title: "Usar un modelo de puntos preentrenado",
          why: "MediaPipe encuentra la mano en cualquier parte del cuadro sin datos de entrenamiento propios.",
          tradeoff:
            "La precisión y la velocidad son las que da el modelo; no hay nada que ajustar.",
        },
      ],
    },
    "codesentry-swarm": {
      figures: [
        {
          value: "3",
          label: "Agentes de IA, cada uno detrás de su propia cola",
        },
        {
          value: "111 s",
          label: "De un pull request nuevo a un arreglo propuesto, en vivo",
        },
        {
          value: "0,13 USD",
          label: "Costo de modelo por 22 pull requests revisados",
        },
        {
          value: "15",
          label: "Spans en una sola traza, del webhook al veredicto",
        },
      ],
      flow: {
        steps: [
          {
            label: "Pull request",
            detail: "Webhook firmado de GitHub",
            kind: "actor",
          },
          {
            label: "API",
            detail: "Cloud Run responde 202 y guarda la tarea en Firestore",
            kind: "service",
          },
          {
            label: "Triage",
            detail: "Gemini escribe una hipótesis, un test y el arreglo",
            kind: "agent",
          },
          {
            label: "Sandbox",
            detail: "Cloud Run Job sin red y sin roles",
            kind: "service",
          },
          {
            label: "Juez",
            detail: "Gemini lee los exit codes y escribe el veredicto",
            kind: "agent",
          },
          {
            label: "Comentario",
            detail: "El arreglo y un reporte tipado en el pull request",
            kind: "output",
          },
        ],
        loop: "Cada salto es un mensaje de Pub/Sub con reintentos y una cola de dead letters. Una ejecución en rojo vuelve a Triage con feedback, hasta 3 veces, y luego pide ayuda a una persona.",
      },
      decisions: [
        {
          title: "Poner cada agente detrás de una cola",
          why: "Una llamada al modelo lenta o fallida se reintenta con backoff en lugar de dejar el webhook esperando. Tras 5 intentos, el mensaje llega a una cola de dead letters en vez de perderse.",
          tradeoff:
            "Pub/Sub crea una traza nueva por mensaje y Eventarc llega sin contexto, así que el ID de la traza tiene que viajar a mano.",
        },
        {
          title: "Que decidan los exit codes, no el modelo",
          why: "El test nuevo debe fallar antes del arreglo y toda la suite debe pasar después. El Juez puede rechazar un verde, pero nunca aprobar un rojo.",
          tradeoff:
            "Verde es evidencia, no garantía: un test que solo cubría su propio caso dejó pasar un redondeo incorrecto. Por eso el merge lo hace una persona.",
        },
        {
          title: "Ejecutar código no confiable en un job sin identidad",
          why: "El sandbox no tiene red y su cuenta de servicio no tiene roles. Lee el código y escribe el resultado con URLs firmadas que expiran en 15 minutos.",
          tradeoff:
            "La primera ejecución tardó 1 min 32 s en arrancar, así que una demo en vivo necesita un pull request de calentamiento.",
        },
        {
          title: "Derivar el ID de la tarea del commit",
          why: "El ID sale del repositorio, el número del pull request y el commit, así que un webhook reenviado cae en la misma tarea y cada etapa se reclama una sola vez.",
          tradeoff:
            "Cada push nuevo es una tarea nueva: volver a empujar significa otra revisión y otro comentario.",
        },
      ],
    },
    kairo: {
      figures: [
        {
          value: "2",
          label: "Plataformas, iOS y Android, desde un solo código en Flutter",
        },
        {
          value: "9",
          label: "Funciones, cada una con Clean Architecture y BLoC",
        },
        { value: "25 min", label: "Sesiones de enfoque en una sola tarea" },
        { value: "2", label: "Idiomas, inglés y español" },
      ],
      flow: {
        steps: [
          {
            label: "Tú",
            detail: "Agregas, deslizas, planeas y te enfocas",
            kind: "actor",
          },
          {
            label: "App",
            detail: "Flutter, un BLoC por función",
            kind: "client",
          },
          {
            label: "Copia local",
            detail: "La lista de tareas y una cola de cambios",
            kind: "store",
          },
          {
            label: "Supabase",
            detail: "Postgres, Auth y Realtime",
            kind: "service",
          },
          {
            label: "Amigos",
            detail: "Tareas compartidas, o un bloque Ocupado",
            kind: "actor",
          },
        ],
        loop: "Los cambios sin conexión esperan en orden en la cola y salen cuando vuelve la conexión. Realtime trae los cambios de tus amigos y Firebase Cloud Messaging envía los recordatorios.",
      },
      decisions: [
        {
          title: "Abrir la lista desde una copia en el dispositivo",
          why: "La app abre al instante y sigue funcionando sin señal. Los cambios esperan en orden y se sincronizan cuando vuelve la conexión.",
          tradeoff:
            "Dos copias de la verdad que reconciliar, y una cola que tiene que repetir los cambios en el orden correcto.",
        },
        {
          title: "Contar la racha el día en que terminaste",
          why: "La racha sale de cuándo completaste la tarea, no de cuándo vencía, así que la app nunca te regaña por el calendario.",
          tradeoff:
            "Menos generosa que otras apps: una tarea terminada después de medianoche cuenta para el día siguiente.",
        },
        {
          title: "Clean Architecture y BLoC en cada función",
          why: "Cada función separa interfaz, lógica y datos, así que una puede cambiar sin romper las demás.",
          tradeoff:
            "Más archivos y más ceremonia, incluso en pantallas pequeñas.",
        },
      ],
    },
    openstage: {
      figures: [
        {
          value: "0",
          label: "Servidores para procesar video: FFmpeg corre en el navegador",
        },
        {
          value: "3",
          label: "Destinos de exportación: TikTok, Instagram y YouTube",
        },
      ],
      flow: {
        steps: [
          {
            label: "Banda",
            detail: "Sube una canción o un video en vivo",
            kind: "actor",
          },
          {
            label: "Navegador",
            detail: "Next.js, con bandas y roles en Supabase",
            kind: "client",
          },
          {
            label: "Whisper",
            detail: "Transcribe el audio en local",
            kind: "model",
          },
          {
            label: "FFmpeg WASM",
            detail: "Corta y codifica dentro de la pestaña",
            kind: "service",
          },
          {
            label: "Clip",
            detail: "Formatos para TikTok, Instagram y YouTube",
            kind: "output",
          },
        ],
      },
      decisions: [
        {
          title: "Procesar el video en el navegador",
          why: "FFmpeg compilado a WebAssembly corta y codifica en el propio dispositivo del músico, así que el material nunca sale de ahí y no hay servidor de render que pagar.",
          tradeoff:
            "La velocidad depende del dispositivo: un video largo o en alta resolución va más lento en un portátil o un teléfono modesto.",
        },
        {
          title: "Quedarse en los planes gratuitos",
          why: "Tiene que seguir siendo gratis para artistas independientes, así que Supabase y Vercel llevan el backend sin infraestructura propia.",
          tradeoff:
            "Los límites de los planes gratuitos marcan el techo de almacenamiento y de uso.",
        },
      ],
    },
    "vibe-architect": {
      figures: [
        { value: "~40", label: "Archivos listos para producción por proyecto" },
        {
          value: "2–4",
          label: "Arquitecturas propuestas, cada una con pros y contras",
        },
        {
          value: "4",
          label: "Llamadas a Gemini en paralelo para la documentación",
        },
        {
          value: "60–80%",
          label: "De los archivos salen de plantillas probadas",
        },
      ],
      flow: {
        steps: [
          {
            label: "Tú",
            detail: "Describes el proyecto en una frase",
            kind: "actor",
          },
          {
            label: "Analizar",
            detail: "Gemini mide su complejidad",
            kind: "agent",
          },
          {
            label: "Proponer",
            detail: "Clean, MVC, Hexagonal u otra que encaje",
            kind: "agent",
          },
          {
            label: "Generar",
            detail: "Plantillas más llamadas a Gemini en paralelo",
            kind: "service",
          },
          {
            label: "Transmitir",
            detail: "Progreso por SSE, de 0 a 100 %",
            kind: "client",
          },
          {
            label: "Proyecto",
            detail: "Unos 40 archivos, guardados en Firebase",
            kind: "output",
          },
        ],
      },
      decisions: [
        {
          title: "Elegir la arquitectura antes de escribir código",
          why: "El vibe coding se salta la estructura. Medir la complejidad primero permite elegir Clean, MVC o Hexagonal a propósito.",
          tradeoff: "Un paso más antes de ver código.",
        },
        {
          title: "Reutilizar plantillas y generar solo lo único",
          why: "Las configuraciones y los archivos comunes salen de plantillas, y la IA escribe solo la parte que depende del proyecto. Más rápido, más barato y más predecible.",
          tradeoff:
            "Hay que mantener las plantillas de cada framework que soporta.",
        },
      ],
    },
    "open-kanban-board": {
      flow: {
        steps: [
          {
            label: "Tú",
            detail: "Arrastras una tarea a otra columna",
            kind: "actor",
          },
          {
            label: "App",
            detail: "Next.js, instalable como PWA",
            kind: "client",
          },
          {
            label: "Firestore",
            detail: "Listeners en tiempo real sobre el tablero",
            kind: "store",
          },
          {
            label: "Tu equipo",
            detail: "El mismo tablero, con cursores en vivo",
            kind: "actor",
          },
        ],
      },
      decisions: [
        {
          title: "Listeners en tiempo real en lugar de una API propia",
          why: "Cada tablero se sincroniza entre dispositivos y personas a través de Firestore, sin un servidor que mantener.",
          tradeoff:
            "El modelo de datos sigue las consultas de Firestore, y cada lectura cuenta para sus límites.",
        },
        {
          title: "Publicarla como PWA",
          why: "Un solo código se instala en teléfonos y computadoras y se siente casi nativo.",
          tradeoff:
            "Menos capacidades nativas que una app de tienda, sobre todo en iOS.",
        },
      ],
    },
    "cadenza-app": {
      figures: [
        {
          value: "4",
          label:
            "Herramientas: nombrar acordes, buscar escalas, explorar escalas y círculo de quintas",
        },
        { value: "2", label: "Instrumentos para tocar: guitarra y piano" },
        { value: "2", label: "Idiomas, inglés y español" },
      ],
      flow: {
        steps: [
          {
            label: "Tú",
            detail: "Tocas notas en una guitarra o un piano",
            kind: "actor",
          },
          {
            label: "Nombrar acordes",
            detail: "Dice qué acorde forman esas notas",
            kind: "service",
          },
          {
            label: "Buscar escalas",
            detail: "Escalas que encajan con la progresión",
            kind: "service",
          },
          {
            label: "Tu instrumento",
            detail: "La escala dibujada en el mástil o el teclado",
            kind: "output",
          },
        ],
      },
      decisions: [
        {
          title: "Todo corre en el navegador",
          why: "Sin cuenta y sin servidor: la abres y tocas. No cuesta nada alojarla ni usarla.",
          tradeoff:
            "Sin cuentas no hay nada que sincronizar entre dispositivos.",
        },
      ],
    },
    "gdg-ecuador": {
      decisions: [
        {
          title: "Convertir el sitio de un evento en el hub de todos",
          why: "Build with AI ya tenía agenda, speakers, sedes y registro. Reutilizarlo les dio a los DevFest, Study Jams y meetups un solo lugar.",
          tradeoff:
            "El modelo de datos tuvo que dejar de asumir que había un solo evento.",
        },
        {
          title: "Bilingüe desde el inicio",
          why: "Personas que hablan español e inglés en todo el país usan el mismo sitio.",
          tradeoff: "Cada sesión, biografía y anuncio necesita dos versiones.",
        },
      ],
    },
    flights: {
      flow: {
        steps: [
          { label: "Tú", detail: "Buscas vuelos con filtros", kind: "actor" },
          {
            label: "Next.js",
            detail: "Scroll infinito y un dashboard en vivo",
            kind: "client",
          },
          {
            label: "FastAPI",
            detail: "Cálculos de CO₂ y combustible",
            kind: "service",
          },
          {
            label: "Supabase",
            detail: "Datos de vuelos y usuarios",
            kind: "store",
          },
        ],
      },
      decisions: [
        {
          title: "Separar un frontend en Next.js de un backend en FastAPI",
          why: "Los cálculos viven en Python, junto a los datos, y la interfaz solo muestra resultados.",
          tradeoff: "Dos despliegues y un contrato de API que mantener al día.",
        },
        {
          title: "Scroll infinito en lugar de páginas",
          why: "Se pueden recorrer muchos vuelos sin que los controles de paginación estorben.",
          tradeoff:
            "Es más difícil enlazar una posición de la lista o volver a ella.",
        },
      ],
    },
  },
};
