import { services } from "@/content/services";
import { Arrow, ServiceIcon } from "@/components/ui/icons";
import { SmartLink } from "@/components/ui/smart-link";

/** Service cards. `all` is the /services variant (heading hidden by CSS). */
export function ServicesSection({ all = false }: { all?: boolean }) {
  return (
    <section className={`services-section wrap${all ? " services-full" : ""}`} id="services">
      <div className="section-heading">
        <div>
          <p className="eyebrow">THE RIGHT CARE FOR YOUR COMFORT</p>
          <h2>
            Every season.
            <br />
            Every degree of comfort.
          </h2>
        </div>
        <p>
          One local business for the systems that
          <br className="desktop-only" /> make your space feel right.
        </p>
      </div>
      <div className="service-grid">
        {services.map((s) => (
          <SmartLink className="service-card" href={`/services/${s.slug}`} key={s.slug}>
            <div className="service-top">
              <ServiceIcon kind={s.slug} />
              <span>
                {s.number}
                {" /"}
              </span>
            </div>
            <h3>{s.title}</h3>
            <h4>{s.line}</h4>
            <p>{s.description}</p>
            <span className="service-bottom">
              {"Explore "}
              {s.slug}{" "}
              <span className="circle-arrow">
                <Arrow diagonal />
              </span>
            </span>
          </SmartLink>
        ))}
      </div>
    </section>
  );
}
