/** Options for "What can we help with?" (value -> label), in display order. */
export const enquiryServices = {
  heating: "Heating",
  cooling: "Air conditioning",
  ventilation: "Ventilation / airflow",
  "system-options": "New system / upgrade",
  "not-sure": "Not sure yet",
} as const;

export type EnquiryService = keyof typeof enquiryServices;
export type PropertyType = "home" | "business";

export const propertyLabels: Record<PropertyType, { option: string; summary: string }> = {
  home: { option: "My home", summary: "Home" },
  business: { option: "My business", summary: "Business" },
};

export type EnquiryPreset = { service: EnquiryService; property: PropertyType };

export const defaultPreset: EnquiryPreset = { service: "not-sure", property: "home" };

/** Home / work toggle in the "Comfort belongs in every space" feature. */
export const spaceTabs: Record<
  PropertyType,
  { button: string; title: string; text: string; items: string[]; linkNoun: string }
> = {
  home: {
    button: "At home",
    title: "Your place to feel just right.",
    text: "Slow mornings. Family dinners. A good night’s sleep. Heating, cooling, and airflow all play a part in the comfort you come home to.",
    items: [
      "Care for the system you have",
      "A conversation about what comes next",
      "Help with the rooms that feel different",
    ],
    linkNoun: "home",
  },
  business: {
    button: "At work",
    title: "Make comfort part of the workday.",
    text: "A comfortable workplace matters to the people in it. Talk with Jay about your building, your HVAC concerns, and the needs of your business.",
    items: [
      "Heating and cooling for your workplace",
      "Ventilation and airflow conversations",
      "Service planning around your building",
    ],
    linkNoun: "business",
  },
};
