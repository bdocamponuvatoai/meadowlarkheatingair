"use client";

import { useRef, useState, type FormEvent } from "react";
import { flushSync } from "react-dom";
import { enquiryServices, propertyLabels, type EnquiryPreset } from "@/content/enquiry";
import { Arrow } from "@/components/ui/icons";
import { SmartLink } from "@/components/ui/smart-link";
import {
  buildEnquiryText,
  DOWNLOAD_FILENAME,
  downloadText,
  NO_DETAILS,
  readEnquiry,
  type Enquiry,
} from "@/lib/enquiry";

/**
 * Two-step enquiry: form -> review. Both steps stay mounted (toggled with
 * `hidden`) so typed values survive "Edit details". Validation is the
 * browser's own (required/type=email/maxlength). Nothing is sent anywhere:
 * the review can only be downloaded as a text file.
 */
export function EnquiryForm({ preset }: { preset: EnquiryPreset }) {
  const [entry, setEntry] = useState<Enquiry | null>(null);
  const [downloaded, setDownloaded] = useState(false);
  const reviewHeadingRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const reviewing = entry !== null;

  // Only fires once the browser's constraint validation has passed.
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next = readEnquiry(e.currentTarget);
    flushSync(() => {
      setEntry(next);
      setDownloaded(false);
    });
    reviewHeadingRef.current?.focus();
  };

  const handleEdit = () => {
    flushSync(() => setEntry(null));
    nameRef.current?.focus();
  };

  const handleDownload = () => {
    if (!entry) return;
    downloadText(buildEnquiryText(entry), DOWNLOAD_FILENAME);
    setDownloaded(true);
  };

  return (
    <>
      <form className="enquiry-form" onSubmit={handleSubmit} hidden={reviewing}>
        <p className="eyebrow">01 / TELL US A LITTLE ABOUT YOUR SPACE</p>
        <h2>Start with the basics.</h2>
        <p className="form-intro">
          Prepare your service enquiry. We’ll organize the details into a summary you can review and
          download.
        </p>
        <fieldset>
          <legend>What kind of space?</legend>
          <div className="property-radios">
            {(["home", "business"] as const).map((value) => (
              <label key={value}>
                <input
                  type="radio"
                  name="property"
                  value={value}
                  defaultChecked={preset.property === value}
                />
                <span>{propertyLabels[value].option}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="form-grid">
          <label>
            {"Your name "}
            <span>Required</span>
            <input
              ref={nameRef}
              name="name"
              autoComplete="name"
              required
              maxLength={100}
              placeholder="First and last name"
            />
          </label>
          <label>
            {"Email address "}
            <span>Required</span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={200}
              placeholder="you@example.com"
            />
          </label>
          <label>
            {"Phone number "}
            <span>Optional</span>
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              maxLength={40}
              placeholder="Your best contact number"
            />
          </label>
          <label>
            {"Town and ZIP code "}
            <span>Required</span>
            <input
              name="town"
              autoComplete="address-level2"
              required
              maxLength={150}
              placeholder="e.g. Big Piney, 83113"
            />
          </label>
        </div>
        <label>
          What can we help with?
          <select name="service" defaultValue={preset.service}>
            {Object.entries(enquiryServices).map(([value, label]) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label>
          {"What are you noticing? "}
          <span>Optional</span>
          <textarea
            name="details"
            rows={4}
            maxLength={2500}
            placeholder="A room that feels cold, a system that won’t start, or plans for your space…"
          />
        </label>
        <div className="form-notice">
          <span aria-hidden="true">↳</span>
          <p>
            <strong>This is a preview enquiry.</strong> Your details stay in this page until you
            choose to download them. This form does not send a message or book service.
          </p>
        </div>
        <button className="button" type="submit">
          {"Review my enquiry "}
          <Arrow />
        </button>
        <p className="form-privacy">
          {"Only include details you’re comfortable saving. "}
          <SmartLink href="/privacy">Privacy & preview details</SmartLink>
        </p>
      </form>
      <div className="enquiry-review" hidden={!reviewing}>
        <p className="eyebrow">02 / YOUR CONVERSATION STARTER</p>
        <h2 ref={reviewHeadingRef} tabIndex={-1}>
          Ready for a closer look.
        </h2>
        <p>Your enquiry is prepared. Nothing has been sent and no visit has been booked.</p>
        {entry && (
          <dl>
            <div>
              <dt>Your name</dt>
              <dd>{entry.name}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{entry.email}</dd>
            </div>
            {entry.phone && (
              <div>
                <dt>Phone</dt>
                <dd>{entry.phone}</dd>
              </div>
            )}
            <div>
              <dt>Location</dt>
              <dd>{entry.town}</dd>
            </div>
            <div>
              <dt>Property</dt>
              <dd>{propertyLabels[entry.property].summary}</dd>
            </div>
            <div>
              <dt>Service</dt>
              <dd>{enquiryServices[entry.service]}</dd>
            </div>
            <div>
              <dt>Your notes</dt>
              <dd>{entry.details || NO_DETAILS}</dd>
            </div>
          </dl>
        )}
        <div className="form-actions">
          <button className="button" type="button" onClick={handleDownload}>
            {"Download enquiry "}
            <Arrow />
          </button>
          <button className="edit-button" type="button" onClick={handleEdit}>
            Edit details
          </button>
        </div>
        <p role="status" className="download-status">
          {downloaded
            ? "Your enquiry download is ready. Keep it for your conversation with Jay."
            : "Keep a copy while Meadowlark’s direct contact details are being confirmed."}
        </p>
      </div>
    </>
  );
}
