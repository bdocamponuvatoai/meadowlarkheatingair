import Image from "next/image";
import wyomingWarmth from "@/assets/images/wyoming-warmth.webp";
import { Arrow } from "@/components/ui/icons";
import { ButtonLink } from "@/components/ui/links";
import { SmartLink } from "@/components/ui/smart-link";

export function Hero() {
  return (
    <section className="hero">
      {/* LCP image: load immediately at high priority. */}
      <Image
        className="hero-image"
        src={wyomingWarmth}
        alt="Warm windows light a ranch home in a snowy Wyoming-inspired landscape"
        loading="eager"
        fetchPriority="high"
      />
      <div className="hero-shade" />
      <div className="hero-content wrap">
        <p className="eyebrow">
          <span className="status-dot" /> BIG PINEY, WYOMING
        </p>
        <h1>
          Wyoming outside.
          <br />
          <em>Comfort inside.</em>
        </h1>
        <p className="hero-description">
          Heating, cooling, and fresh possibilities.
          <br />
          Local HVAC care for the place you call home.
          <br />
          And the place you get to work.
        </p>
        <div className="hero-actions">
          <ButtonLink href="/contact" className="button-peach">
            {"Let’s talk comfort "}
          </ButtonLink>
          <SmartLink href="/services" className="hero-secondary">
            {"Explore our services "}
            <Arrow diagonal />
          </SmartLink>
        </div>
      </div>
      <div className="hero-footer wrap">
        <span>HOMEGROWN CARE. THROUGH EVERY SEASON.</span>
        <a href="#welcome">
          {"A little more about us "}
          <span className="down-arrow">
            <Arrow />
          </span>
        </a>
      </div>
    </section>
  );
}
