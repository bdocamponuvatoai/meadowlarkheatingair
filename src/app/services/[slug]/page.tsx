import { notFound } from "next/navigation";
import { ServiceDetail } from "@/components/services/service-detail";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceImage } from "@/components/services/service-image";
import { ClosingCta } from "@/components/sections/closing-cta";
import { getService, services } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";

// Only the services in content/services.ts exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  return pageMetadata({
    title: service.pageTitle,
    path: `/services/${service.slug}`,
    image: service.image,
  });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  return (
    <main id="main">
      <ServiceHero service={service} />
      <ServiceDetail service={service} />
      <ServiceImage service={service} />
      <ClosingCta />
    </main>
  );
}
