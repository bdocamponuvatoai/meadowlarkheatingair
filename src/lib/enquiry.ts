import {
  defaultPreset,
  enquiryServices,
  propertyLabels,
  type EnquiryPreset,
  type EnquiryService,
  type PropertyType,
} from "@/content/enquiry";

export type Enquiry = {
  name: string;
  email: string;
  phone: string;
  town: string;
  property: PropertyType;
  service: EnquiryService;
  details: string;
};

/** Text used when the optional notes field is left empty. */
export const NO_DETAILS = "To discuss with Jay.";

export const DOWNLOAD_FILENAME = "meadowlark-service-enquiry.txt";

function isEnquiryService(value: string | null): value is EnquiryService {
  return value !== null && Object.prototype.hasOwnProperty.call(enquiryServices, value);
}

/** Reads `?service=` and `?property=` presets. Unknown values fall back to defaults. */
export function parsePreset(params: { get(name: string): string | null }): EnquiryPreset {
  const service = params.get("service");
  return {
    service: isEnquiryService(service) ? service : defaultPreset.service,
    property: params.get("property") === "business" ? "business" : "home",
  };
}

/** Collects the enquiry from the submitted form. */
export function readEnquiry(form: HTMLFormElement): Enquiry {
  const data = new FormData(form);
  const text = (key: string) => String(data.get(key) ?? "");
  const service = text("service");
  return {
    name: text("name"),
    email: text("email"),
    phone: text("phone"),
    town: text("town"),
    property: text("property") === "business" ? "business" : "home",
    service: isEnquiryService(service) ? service : defaultPreset.service,
    details: text("details"),
  };
}

/** Plain-text summary saved by "Download enquiry". */
export function buildEnquiryText(e: Enquiry): string {
  return `MEADOWLARK HEATING & AIR — SERVICE ENQUIRY DRAFT
Prepared locally. Not sent. No appointment booked.

Name: ${e.name}
Email: ${e.email}
Phone: ${e.phone || "Not supplied"}
Town / ZIP: ${e.town}
Property: ${propertyLabels[e.property].summary}
Service: ${enquiryServices[e.service]}

What I’m noticing:
${e.details || NO_DETAILS}

Confirm Meadowlark’s direct contact details before sharing this enquiry.
`;
}

/** Saves `text` as a file on the visitor's device. Nothing leaves the browser. */
export function downloadText(text: string, filename: string): void {
  const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
