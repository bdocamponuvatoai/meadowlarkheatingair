import { site } from "@/config/site";
import { Bird } from "./icons";
import { SmartLink } from "./smart-link";

/** Bird mark + wordmark, linking home. `light` is the footer variant. */
export function Brand({ light = false }: { light?: boolean }) {
  return (
    <SmartLink
      href="/"
      className={light ? "brand brand-light" : "brand"}
      aria-label={`${site.name} home`}
    >
      <Bird />
      <span>
        <strong>meadowlark</strong>
        <small>HEATING & AIR</small>
      </span>
    </SmartLink>
  );
}
