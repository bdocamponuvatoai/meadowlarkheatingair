"use client";

import { useState } from "react";
import { comfortIssues } from "@/content/comfort-guide";
import { Arrow, ServiceIcon } from "@/components/ui/icons";
import { TextLink } from "@/components/ui/links";

/**
 * "Tell us what feels off": a group of toggle buttons (aria-pressed) that
 * swaps the guidance panel and presets the enquiry form's service.
 */
export function ComfortGuide() {
  const [selected, setSelected] = useState(0);
  const issue = comfortIssues[selected];
  return (
    <div className="guide-grid">
      <div className="guide-options" role="group" aria-label="Choose your comfort concern">
        {comfortIssues.map((item, i) => (
          <button key={item.id} aria-pressed={i === selected} onClick={() => setSelected(i)}>
            <span className="option-number">
              {"0"}
              {i + 1}
            </span>
            {item.label}
            <Arrow />
          </button>
        ))}
      </div>
      <div className="guide-answer" aria-live="polite" aria-atomic="true">
        <div className="guide-orbit">
          <ServiceIcon kind={issue.id} />
        </div>
        <p className="eyebrow">{issue.tag}</p>
        <h3>{issue.title}</h3>
        <p>{issue.text}</p>
        <span className="guide-hint">{issue.hint}</span>
        <TextLink href={`/contact?service=${issue.id}`}>{"Prepare a service enquiry "}</TextLink>
      </div>
    </div>
  );
}
