import type { EnquiryService } from "./enquiry";

/** Icon shown in the guide answer panel. */
type GuideIcon = "heating" | "cooling" | "ventilation" | "system-options";

type ComfortIssue = {
  /** Also the `?service=` preset passed to the enquiry form. */
  id: EnquiryService & GuideIcon;
  label: string;
  tag: string;
  title: string;
  text: string;
  hint: string;
};

export const comfortIssues: ComfortIssue[] = [
  {
    id: "heating",
    label: "It’s not warm enough",
    tag: "LET’S START WITH HEATING",
    title: "Let’s bring the warmth back.",
    text: "Is it one room, or the whole building? Note what your thermostat shows and when you first noticed the change. You can share the rest with Jay.",
    hint: "Good to know: your system type, if you know it.",
  },
  {
    id: "cooling",
    label: "It’s not cool enough",
    tag: "LET’S START WITH COOLING",
    title: "A cooler space starts here.",
    text: "Tell us which areas feel warm and whether your system is running. A few details about how the issue changes through the day can help start the conversation.",
    hint: "Good to know: when the cooling last felt normal.",
  },
  {
    id: "ventilation",
    label: "The airflow feels off",
    tag: "LET’S START WITH AIRFLOW",
    title: "Look at the whole picture.",
    text: "Notice a stuffy room or uneven airflow? Note which rooms feel different and whether it happens while heating, cooling, or all the time.",
    hint: "Good to know: any recent changes to your space.",
  },
  {
    id: "system-options",
    label: "I’m planning an upgrade",
    tag: "LET’S TALK POSSIBILITIES",
    title: "Find a fit for your space.",
    text: "Start with your property, current equipment, and what you’d like to improve. A conversation can help frame the questions around comfort, system choices, and installation.",
    hint: "Good to know: your priorities and project timeframe.",
  },
];

/** "Your next three steps" on the comfort guide page. */
export const nextSteps = [
  {
    number: "01",
    title: "Tell us about your space.",
    text: "Home or business, town, and a short description of what’s happening.",
  },
  {
    number: "02",
    title: "Keep the useful details.",
    text: "System type, when the issue started, and which rooms are affected, if you know.",
  },
  {
    number: "03",
    title: "Talk through the next step.",
    text: "Confirm scope, timing, and costs directly with Jay before arranging work.",
  },
];
