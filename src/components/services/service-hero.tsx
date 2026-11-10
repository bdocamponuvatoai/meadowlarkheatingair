import type { Service } from "@/content/services";
import { ServiceIcon } from "@/components/ui/icons";
import { ButtonLink } from "@/components/ui/links";
import { SmartLink } from "@/components/ui/smart-link";

export function ServiceHero({ service }: { service: Service }) {
  const title = service.title.toUpperCase();
  return (
    <section className="service-hero wrap">
      <div>
        <SmartLink href="/services" className="breadcrumb">
          ← All services
        </SmartLink>
        <p className="eyebrow">
          {service.number}
          {" / "}
          {title}
        </p>
        <h1>{service.line}</h1>
        <p>{service.intro}</p>
        <ButtonLink href={`/contact?service=${service.slug}`}>
          {"Talk about "}
          {service.slug}{" "}
        </ButtonLink>
      </div>
      <div className="service-art">
        <div className="service-symbol">
          <ServiceIcon kind={service.slug} />
        </div>
        <span className="service-art-label">
          {"MEADOWLARK / "}
          {title}
        </span>
        <span className="service-art-word">Feel right.</span>
      </div>
    </section>
  );
}
