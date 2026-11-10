import Image from "next/image";
import serviceCraft from "@/assets/images/service-craft.webp";
import { Bird } from "@/components/ui/icons";
import { TextLink } from "@/components/ui/links";

export function Craft() {
  return (
    <section className="craft">
      <div className="craft-image">
        <Image
          src={serviceCraft}
          alt="Illustrative technician inspecting a residential heating system"
        />
      </div>
      <div className="craft-copy">
        <p className="eyebrow">NEIGHBORS FIRST. HVAC ALWAYS.</p>
        <h2>
          Good service starts
          <br />
          with a conversation.
        </h2>
        <p>Tell us what’s happening. Ask the questions. Talk through the next step.</p>
        <p>
          With Jay at Meadowlark, your first conversation starts with your space and what you need
          from it. Heating, cooling, and ventilation, with a local point of contact.
        </p>
        <TextLink href="/about">{"A little about Meadowlark "}</TextLink>
        <div className="craft-signoff">
          <Bird />
          <span>
            Meadowlark Heating & Air
            <br />
            <small>BIG PINEY, WYOMING</small>
          </span>
        </div>
      </div>
    </section>
  );
}
