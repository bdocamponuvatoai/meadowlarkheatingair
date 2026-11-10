import Link from "next/link";
import type { ComponentProps } from "react";

type SmartLinkProps = Omit<ComponentProps<"a">, "href"> & { href: string };

/**
 * Internal paths (`/...`) use next/link for client-side navigation and
 * prefetching. Hash, `tel:`, `mailto:` and external URLs render a plain <a>
 * with the attributes passed in (including any `target`/`rel`).
 */
export function SmartLink({ href, ...props }: SmartLinkProps) {
  if (href.startsWith("/")) return <Link href={href} {...props} />;
  return <a href={href} {...props} />;
}
