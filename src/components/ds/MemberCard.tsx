import { AccentCard } from "./AccentCard";
import { type Accent } from "./types";

interface MemberCardProps {
  name: string;
  role: string;
  accent?: Accent;
}

export function MemberCard({
  name,
  role,
  accent = "neutral",
}: MemberCardProps) {
  return (
    <AccentCard accent={accent} className="p-4 md:p-5">
      <p className="text-base font-semibold text-foreground">{name}</p>
      <p className="text-meta mt-1 text-muted-foreground">{role}</p>
    </AccentCard>
  );
}
