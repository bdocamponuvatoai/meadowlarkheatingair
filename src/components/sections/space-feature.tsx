import Image from "next/image";
import quietComfort from "@/assets/images/quiet-comfort.webp";
import { Sun } from "@/components/ui/icons";
import { SpaceTabs } from "./space-tabs";

/** "Comfort belongs in every space": photo with caption + home/work toggle. */
export function SpaceFeature() {
  return (
    <section className="space-feature wrap">
      <div className="space-image">
        <Image
          src={quietComfort}
          alt="Sunlight across a welcoming living room, with snow beyond the windows"
        />
        <div className="photo-caption">
          <span>
            Good days start
            <br />
            with feeling at home.
          </span>
          <span className="caption-sun">
            <Sun />
          </span>
        </div>
      </div>
      <div className="space-copy">
        <p className="eyebrow">MADE FOR THE WAY YOU LIVE. AND WORK.</p>
        <h2>
          Comfort belongs
          <br />
          in every space.
        </h2>
        <SpaceTabs />
      </div>
    </section>
  );
}
