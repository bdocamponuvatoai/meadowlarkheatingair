import type { ReactNode } from "react";
import { Arrow } from "./icons";
import { SmartLink } from "./smart-link";

type ArrowLinkProps = {
  href: string;
  /**
   * Link text, including the trailing space before the arrow, e.g.
   * `{"Meet Meadowlark "}`. Pass one string where possible: separate text
   * nodes can shape slightly differently in the browser.
   */
  children: ReactNode;
  className?: string;
};

/** Filled button-style link with a trailing arrow. */
export function ButtonLink({ href, children, className }: ArrowLinkProps) {
  return (
    <SmartLink href={href} className={className ? `button ${className}` : "button"}>
      {children}
      <Arrow />
    </SmartLink>
  );
}

/** Underlined text link with a trailing arrow. */
export function TextLink({ href, children }: ArrowLinkProps) {
  return (
    <SmartLink href={href} className="text-link">
      {children}
      <Arrow />
    </SmartLink>
  );
}
