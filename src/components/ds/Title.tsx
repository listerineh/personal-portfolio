import { cn } from "@/lib/utils";
import { type TitleGradient, type TitleSize } from "./types";
import { type ElementType, type ReactNode, type CSSProperties } from "react";

interface TitleProps {
  as?: ElementType;
  /** display = page title, title = section title, section = subsection, work = a card's title. */
  size?: TitleSize;
  /** @deprecated Gradient text is out of the system; `amber` sets the title in the live amber. */
  gradient?: TitleGradient;
  className?: string;
  style?: CSSProperties;
  id?: string;
  children: ReactNode;
}

const sizeMap: Record<TitleSize, string> = {
  display: "text-display",
  title: "text-display-sm",
  section: "text-subhead",
  work: "text-headline",
};

export function Title({
  as: Tag = "h2",
  size,
  gradient = false,
  className,
  style,
  id,
  children,
}: TitleProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "font-sans text-foreground",
        size && sizeMap[size],
        gradient === "amber" && "text-amber",
        className,
      )}
      style={style}
    >
      {children}
    </Tag>
  );
}
