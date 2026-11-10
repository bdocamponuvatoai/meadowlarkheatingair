import Image from "next/image";
import type { Service } from "@/content/services";

export function ServiceImage({ service }: { service: Service }) {
  return (
    <section className="wide-image wrap">
      <Image src={service.image.src} alt={service.image.alt} />
    </section>
  );
}
