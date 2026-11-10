"use client";

import { useState } from "react";
import { spaceTabs, type PropertyType } from "@/content/enquiry";
import { LineList } from "@/components/ui/line-list";
import { TextLink } from "@/components/ui/links";

const order: PropertyType[] = ["home", "business"];

/** Home / work toggle. The link carries the choice to the enquiry form. */
export function SpaceTabs() {
  const [space, setSpace] = useState<PropertyType>("home");
  const tab = spaceTabs[space];
  return (
    <>
      <div className="segment" role="group" aria-label="Property type">
        {order.map((key) => (
          <button key={key} onClick={() => setSpace(key)} aria-pressed={space === key}>
            {spaceTabs[key].button}
          </button>
        ))}
      </div>
      <div className="space-tab-content" aria-live="polite">
        <h3>{tab.title}</h3>
        <p>{tab.text}</p>
        <LineList items={tab.items} />
      </div>
      <TextLink href={`/contact?property=${space}`}>
        {"Let’s talk about your "}
        {tab.linkNoun}{" "}
      </TextLink>
    </>
  );
}
