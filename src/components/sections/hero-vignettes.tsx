"use client";

import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { CardStack } from "@/components/ds";

/** A small app window: traffic lights, a title, content. Shared frame for the three hero vignettes. */
function Window({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-popover shadow-float ring-1 ring-foreground/[0.06]">
      <div className="flex items-center gap-3 border-b px-4 py-3">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
        </span>
        <span className="text-[0.75rem] font-medium text-muted-foreground">
          {title}
        </span>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

/** An agent doing real work: a request, the tools it calls, the result. */
function AgentWindow() {
  const t = useTranslations("hero.vignettes");
  return (
    <Window title="agent · support-triage">
      <div className="grid gap-3 text-[0.8125rem] leading-relaxed">
        <p className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-foreground px-3.5 py-2 text-surface">
          {t("agentAsk")}
        </p>
        <div className="grid gap-1.5 font-mono text-[0.75rem] text-muted-foreground">
          <p>
            <span className="text-primary">→</span> search_kb(&quot;refund
            policy&quot;)
          </p>
          <p>
            <span className="text-primary">→</span> crm.get_customer(4821)
          </p>
        </div>
        <p className="max-w-[85%] rounded-2xl rounded-bl-md bg-foreground/[0.06] px-3.5 py-2 text-foreground">
          {t("agentReply")}
        </p>
        <span className="flex gap-1 pl-1">
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              className="h-1.5 w-1.5 rounded-full bg-muted-foreground motion-safe:animate-pulse"
              style={{ animationDelay: `${dot * 180}ms` }}
            />
          ))}
        </span>
      </div>
    </Window>
  );
}

/** The code behind it: a route handler that hands a ticket to the agent. */
function CodeWindow() {
  const k = "text-primary";
  const s = "text-muted-foreground";
  return (
    <Window title="app/api/triage/route.ts">
      <pre className="overflow-hidden font-mono text-[0.75rem] leading-[1.7] text-foreground">
        <code>
          <span className={k}>export async function</span> POST(req) {"{"}
          {"\n"}
          {"  "}
          <span className={k}>const</span> {"{ ticket }"} ={" "}
          <span className={k}>await</span> req.json();
          {"\n"}
          {"  "}
          <span className={k}>const</span> reply ={" "}
          <span className={k}>await</span> agent.run(ticket, {"{"}
          {"\n"}
          {"    "}tools: [searchKb, crm],
          {"\n"}
          {"    "}model: <span className={s}>&quot;claude-sonnet&quot;</span>,
          {"\n"}
          {"  "}
          {"});"}
          {"\n"}
          {"  "}
          <span className={k}>return</span> Response.json(reply);
          {"\n"}
          {"}"}
        </code>
      </pre>
    </Window>
  );
}

/** And it ships: a pipeline mid-rollout. */
function DeployWindow() {
  const t = useTranslations("hero.vignettes");
  const done = [
    { label: t("build"), meta: "42s" },
    { label: t("tests"), meta: "128 ✓" },
    { label: t("infra"), meta: "terraform" },
  ];
  return (
    <Window title="deploy · production">
      <ul className="grid gap-2.5 text-[0.8125rem]">
        {done.map((row) => (
          <li key={row.label} className="flex items-center gap-3">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-surface">
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            <span className="font-medium text-foreground">{row.label}</span>
            <span className="ml-auto font-mono text-[0.75rem] text-muted-foreground">
              {row.meta}
            </span>
          </li>
        ))}
        <li className="grid gap-2 pt-1">
          <div className="flex items-center gap-3">
            <span className="relative flex h-5 w-5 items-center justify-center">
              <span className="absolute h-3 w-3 rounded-full bg-primary opacity-50 motion-safe:animate-ping" />
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            </span>
            <span className="font-medium text-foreground">{t("rollout")}</span>
            <span className="ml-auto font-mono text-[0.75rem] text-muted-foreground">
              3/4
            </span>
          </div>
          <span className="ml-8 block h-1.5 overflow-hidden rounded-full bg-foreground/[0.08]">
            <span className="block h-full w-3/4 rounded-full bg-primary" />
          </span>
        </li>
      </ul>
    </Window>
  );
}

/** What I build, shown rather than listed: an agent, its code, its deploy. */
export function HeroVignettes({ paused = false }: { paused?: boolean }) {
  return (
    <CardStack paused={paused}>
      <AgentWindow />
      <CodeWindow />
      <DeployWindow />
    </CardStack>
  );
}
