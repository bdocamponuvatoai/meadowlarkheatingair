import { ButtonLink } from "@/components/ui/links";

/** Peach closing band with the main call to action. */
export function ClosingCta() {
  return (
    <section className="closing">
      <div className="wrap closing-inner">
        <div>
          <p className="eyebrow">YOUR SPACE. YOUR COMFORT. YOUR NEXT STEP.</p>
          <h2>
            Let’s make it
            <br />
            <em>feel right.</em>
          </h2>
        </div>
        <div>
          <p>
            A heating question. A cooling concern.
            <br />A new plan for your space.
            <br />
            Start with what’s on your mind.
          </p>
          <ButtonLink href="/contact">{"Let’s talk comfort "}</ButtonLink>
        </div>
        <div className="closing-line" aria-hidden="true" />
      </div>
    </section>
  );
}
