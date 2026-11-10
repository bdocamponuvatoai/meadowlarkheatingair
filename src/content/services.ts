import type { StaticImageData } from "next/image";
import quietComfort from "@/assets/images/quiet-comfort.webp";
import serviceCraft from "@/assets/images/service-craft.webp";

type ServiceSlug = "heating" | "cooling" | "ventilation";

export type Service = {
  slug: ServiceSlug;
  title: string;
  /** Browser tab title for the service page. */
  pageTitle: string;
  number: string;
  line: string;
  description: string;
  items: string[];
  intro: string;
  detail: string;
  image: { src: StaticImageData; alt: string };
};

export const services: Service[] = [
  {
    slug: "heating",
    title: "Heating",
    pageTitle: "Heating Services",
    number: "01",
    line: "Warmth that feels like home.",
    description:
      "From a system that won’t start to planning what comes next. Get a clear path to a more comfortable home or workplace.",
    items: [
      "Heating concerns & diagnostics",
      "Repair & replacement conversations",
      "Seasonal system care",
    ],
    intro:
      "When the temperature drops, your heating system matters. Meadowlark is here to help you understand your options and take the next step.",
    detail:
      "Tell Jay what you’re noticing, the type of system you have, and whether the issue affects the whole building or a particular room. That context makes the first conversation more useful.",
    image: { src: serviceCraft, alt: "Illustrative heating system service scene" },
  },
  {
    slug: "cooling",
    title: "Air conditioning",
    pageTitle: "Air Conditioning",
    number: "02",
    line: "Keep your cool. All summer.",
    description:
      "Make room for comfortable summer days with help for cooling concerns, system choices, and everyday performance.",
    items: [
      "Cooling performance concerns",
      "System repair & replacement",
      "Seasonal service discussions",
    ],
    intro:
      "Cooling should fit the way you live and work. Start with a conversation about your space, your current system, and what a comfortable summer looks like to you.",
    detail:
      "Uneven cooling, unusual cycling, or a system that no longer keeps up are useful details to share. Jay can discuss what needs a closer look and which next steps make sense.",
    image: { src: quietComfort, alt: "Illustrative comfortable home interior" },
  },
  {
    slug: "ventilation",
    title: "Ventilation",
    pageTitle: "Ventilation Services",
    number: "03",
    line: "A little room to breathe.",
    description:
      "Look beyond the thermostat. Talk through airflow, ventilation, and the comfort of the spaces you use every day.",
    items: [
      "Airflow & room comfort concerns",
      "Ventilation system discussions",
      "Home & workplace HVAC needs",
    ],
    intro:
      "Comfort is more than a temperature setting. The way air moves through a building can make a noticeable difference to the spaces you spend time in.",
    detail:
      "Share where airflow feels weak, which rooms feel different, and when you first noticed it. A service conversation can help identify what should be assessed in person.",
    image: { src: quietComfort, alt: "Illustrative comfortable home interior" },
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
