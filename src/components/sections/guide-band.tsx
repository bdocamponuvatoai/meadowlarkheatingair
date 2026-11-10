import type { ReactNode } from "react";
import { ComfortGuide } from "./comfort-guide";

type GuideBandProps = {
  /** Optional heading row above the guide (home page). */
  heading?: ReactNode;
  footnote: string;
  standalone?: boolean;
};

/** Dark band holding the comfort guide (home page and /comfort-guide). */
export function GuideBand({ heading, footnote, standalone = false }: GuideBandProps) {
  return (
    <section className={standalone ? "guide-section standalone-guide" : "guide-section"}>
      <div className="wrap">
        {heading}
        <ComfortGuide />
        <p className="guide-footnote">{footnote}</p>
      </div>
    </section>
  );
}
