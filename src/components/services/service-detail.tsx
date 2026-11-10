import type { Service } from "@/content/services";
import { LineList } from "@/components/ui/line-list";

export function ServiceDetail({ service }: { service: Service }) {
  return (
    <section className="detail-copy wrap">
      <div>
        <p className="eyebrow">A CLEARER NEXT STEP</p>
        <h2>
          Let’s start with
          <br />
          what you need.
        </h2>
      </div>
      <div>
        <p>{service.detail}</p>
        <LineList items={service.items} />
        <p className="fine-print">
          Equipment compatibility, project scope, pricing, and availability are confirmed directly
          with Jay.
        </p>
      </div>
    </section>
  );
}
