"use client";

import { useSearchParams } from "next/navigation";
import { parsePreset } from "@/lib/enquiry";
import { EnquiryForm } from "./enquiry-form";

/**
 * Applies `?service=` / `?property=` presets. Render inside <Suspense> with a
 * default <EnquiryForm> fallback so the exported HTML still contains the form.
 * Keyed by preset, so following a link with a different preset starts fresh.
 */
export function PresetEnquiryForm() {
  const preset = parsePreset(useSearchParams());
  return <EnquiryForm key={`${preset.service}|${preset.property}`} preset={preset} />;
}
