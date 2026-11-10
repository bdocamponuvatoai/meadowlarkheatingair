import { footerNav, site } from "@/config/site";
import { Brand } from "@/components/ui/brand";
import { SmartLink } from "@/components/ui/smart-link";

export function Footer() {
  const year = new Date().getFullYear(); // build year (static export)
  return (
    <footer className="site-footer">
      <div className="wrap footer-main">
        <div>
          <Brand light />
          <p>
            A little warmer. A little cooler.
            <br />A lot more comfortable.
          </p>
          <span className="location-label">
            <span className="status-dot" /> ROOTED IN BIG PINEY, WYOMING
          </span>
        </div>
        <div>
          <h3>Good to know</h3>
          {footerNav.goodToKnow.map((item) => (
            <SmartLink key={item.href} href={item.href}>
              {item.label}
            </SmartLink>
          ))}
        </div>
        <div>
          <h3>Here for your space</h3>
          {footerNav.forYourSpace.map((item) => (
            <SmartLink key={item.href} href={item.href}>
              {item.label}
            </SmartLink>
          ))}
        </div>
        <div className="footer-note">
          <h3>Local, through and through.</h3>
          <p>
            Heating, cooling, and ventilation for homes and businesses in Big Piney and nearby
            communities. Confirm coverage with Jay.
          </p>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>
          {"© "}
          {year}
          {` ${site.name}`}
        </span>
        <SmartLink href="/privacy">Privacy & preview details</SmartLink>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
