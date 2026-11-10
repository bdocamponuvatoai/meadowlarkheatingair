import { Bird } from "@/components/ui/icons";
import { TextLink } from "@/components/ui/links";

export function Intro() {
  return (
    <section className="intro wrap" id="welcome">
      <div className="intro-heading">
        <Bird />
        <p className="eyebrow">
          A LOCAL NAME.
          <br />A PERSONAL APPROACH.
        </p>
      </div>
      <div>
        <h2>
          Big skies. Changing seasons.
          <br />
          <span>One place to feel just right.</span>
        </h2>
        <div className="intro-bottom">
          <p>
            Out here, we ask a lot of our heating and cooling. Meadowlark Heating & Air helps homes
            and businesses in Big Piney find their comfort, whatever the season brings.
          </p>
          <TextLink href="/about">{"Meet Meadowlark "}</TextLink>
        </div>
      </div>
    </section>
  );
}
