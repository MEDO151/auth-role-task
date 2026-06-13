"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import ServiceCard from "@/components/shared/service-card";

const serviceIcons = [
  "/hero/hero_icons/hero-service-badge.png",
  "/services/service-icon-property-maintenance.png",
  "/services/service-icon-regular-maintenance.png",
  "/services/service-icon-window-cleaning.png",
  "/services/service-icon-house-cleaning.png",
];

export default function ServicesSection() {
  const t = useTranslations("Services");

  const services = (t.raw("items") as Array<{ title: string; description: string }>).map(
    (item, i) => ({
      icon: serviceIcons[i],
      title: item.title,
      description: item.description,
    })
  );

  return (
    <section className="px-4 py-20 md:px-4.5">
      <div className="mx-auto max-w-[1400px]">

        <div className="mb-14 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-[650px] text-[40px] font-bold leading-[120%] tracking-[-0.02em] text-primary md:text-5xl">
            {t("title")}
          </h2>

          <p className="max-w-[420px] leading-[170%] text-primary">
            {t("description")}
          </p>
        </div>

        <div className="mb-5 grid w-full grid-cols-1 gap-5 lg:grid-cols-3">
          <ServiceCard {...services[0]} />
          <div className="w-full lg:col-span-2 flex flex-col items-center gap-8 rounded-[32px] bg-[#F5F8FA] p-8 transition-all duration-300 hover:-translate-y-1 md:flex-row">
            <Image
              src="/services/services-illustration.png"
              alt="Cleaning illustration"
              width={260}
              height={260}
              className="h-auto w-full max-w-[260px] shrink-0 object-contain"
            />

            <div className="flex flex-1 flex-col">
              <Image
                src={services[1].icon}
                alt={services[1].title}
                width={50}
                height={50}
                className="mb-6 object-contain"
              />

              <h3 className="mb-4 text-[24px] font-bold leading-[140%] text-primary">
                {services[1].title}
              </h3>

              <p className="text-primary md:w-[75%]">
                {services[1].description}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.slice(2).map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}