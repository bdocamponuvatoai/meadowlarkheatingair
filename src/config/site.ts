/**
 * Business details and navigation. Safe to import from client components.
 *
 * Only facts supplied by the business belong here. Phone, email, street
 * address, hours, service radius and credentials are deliberately absent
 * because they have not been confirmed (see README, "Before launch").
 */
export const site = {
  name: "Meadowlark Heating & Air",
  locality: "Big Piney",
  region: "Wyoming",
  regionCode: "WY",
  countryCode: "US",
  defaultTitle: "Meadowlark Heating & Air | Big Piney, Wyoming",
  description:
    "Heating, cooling, and ventilation for homes and businesses in Big Piney, Wyoming. Get to know Meadowlark Heating & Air and prepare your service enquiry.",
  /** Matches `--paper`, the header background. */
  themeColor: "#f8f7f2",
} as const;

export type NavItem = {
  href: string;
  label: string;
  /** Section prefix that marks this item as current (defaults to exact match). */
  matchPrefix?: string;
};

export const mainNav: NavItem[] = [
  { href: "/services", label: "Our services", matchPrefix: "/services" },
  { href: "/about", label: "Meet Meadowlark" },
  { href: "/comfort-guide", label: "Comfort guide" },
];

export const footerNav = {
  goodToKnow: [...mainNav, { href: "/contact", label: "Service enquiry" }] satisfies NavItem[],
  forYourSpace: [
    { href: "/services/heating", label: "Heating" },
    { href: "/services/cooling", label: "Air conditioning" },
    { href: "/services/ventilation", label: "Ventilation" },
    { href: "/contact?property=business", label: "Commercial enquiries" },
  ] satisfies NavItem[],
};
