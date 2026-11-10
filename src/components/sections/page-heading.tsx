import type { ReactNode } from "react";

type PageHeadingProps = {
  eyebrow: string;
  /** First line of the H1. */
  title: string;
  /** Second, italic line of the H1. */
  emphasis: string;
  /** Content of the bottom row (copy, plus a button or the bird mark). */
  children: ReactNode;
};

/** Large heading block at the top of inner pages. */
export function PageHeading({ eyebrow, title, emphasis, children }: PageHeadingProps) {
  return (
    <section className="page-heading wrap">
      <p className="eyebrow">{eyebrow}</p>
      <h1>
        {title}
        <br />
        <em>{emphasis}</em>
      </h1>
      <div className="heading-bottom">{children}</div>
    </section>
  );
}
