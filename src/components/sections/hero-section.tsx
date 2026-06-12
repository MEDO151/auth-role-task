"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export default function HeroSection() {
  const t = useTranslations("Hero");
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = 58;
    const duration = 2000;
    const incrementTime = duration / end;

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="min-h-screen px-4 md:px-4.5 relative">
      <div className="h-full grow pb-8 pt-24">
        <div className="h-full rounded-[32px] overflow-hidden lg:bg-[url('/hero/hero-background.png')] lg:bg-size-[100%_100%] lg:bg-center">
          <div className="flex flex-col justify-center gap-[29px] lg:mx-15 lg:mt-[70px] lg:flex-row">
            <div className="min-w-0 relative z-1 flex-1 basis-[42%] rounded-[32px] bg-white p-8 lg:my-5 xl:p-14 h-fit">
              <h1 className="xl:mb-3 mb-2 text-4xl font-bold leading-[126%] tracking-[-0.02em] text-primary md:text-5xl line-clamp-3">
                {t("title")}
              </h1>

              <p className="xl:mb-7 mb-4 text-primary max-md:text-[14px] line-clamp-3">
                {t("description")}
              </p>

              <div className="flex md:flex-row flex-col md:gap-8 gap-6">
                <button className="cursor-pointer truncate rounded-full lg:w-full md:w-fit bg-black px-6 py-4 text-white z-1 transition-all duration-300 hover:-translate-y-1">
                  {t("requestService")}
                </button>
                <button className="cursor-pointer truncate rounded-full lg:w-full md:w-fit border border-black px-6 py-4 z-1 transition-all duration-300 hover:-translate-y-1">
                  {t("contactUs")}
                </button>
              </div>
                <Image src="/hero/hero-decoration-shape.png" alt="hero icon" width={150} height={75} className="object-contain absolute bottom-0 right-0 z-0" />
            </div>
            <div className="relative min-w-0 flex-1 basis-[58%] rounded-[32px] bg-[url('/hero/hero-background.png')] bg-cover bg-right lg:bg-none flex items-end justify-center overflow-hidden max-md:px-6 max-md:pt-10">
              <Image
                src="/hero/hero-cleaning-woman.png"
                alt="Image of a cleaning woman with a vacuum cleaner"
                width={689}
                height={667}
                priority
                className="h-auto w-full max-w-[680px] object-contain"
              />

              <div className="absolute md:w-full md:h-full hidden md:block">
                <div className="animate-[float_2.5s_ease-in-out_infinite] absolute top-[10px] left-[32px] flex items-center gap-2">
                  <div className="p-2 rounded-full bg-white">
                    <Image
                      src="/hero/hero_icons/hero-wellness-badge.png"
                      alt={t("wellnessBadge")}
                      width={19}
                      height={19}
                      className="object-contain"
                    />
                  </div>
                  <div className="bg-white p-2 rounded-full">
                    <p className="text-primary text-[14px]">{t("wellnessBadge")}</p>
                  </div>
                </div>
                <div className="animate-[float_2.5s_ease-in-out_infinite] absolute top-1/3 right-[86px] flex items-center gap-1">
                  <div className="p-3 rounded-full bg-white">
                    <Image
                      src="/hero/hero_icons/hero-service-badge.png"
                      alt="Service badge"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="animate-[float_2.5s_ease-in-out_infinite] absolute bottom-[93px] right-[38px] flex items-center gap-2">
                  <div className="p-2 rounded-full bg-white">
                    <Image
                      src="/hero/hero_icons/hero-wellness-badge.png"
                      alt={t("wellnessBadge")}
                      width={19}
                      height={19}
                      className="object-contain"
                    />
                  </div>
                  <div className="bg-white p-2 rounded-full">
                    <p className="text-primary text-[14px]">{t("wellnessBadge")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:absolute lg:bottom-0 lg:left-0">
        <div className="relative flex items-center gap-6 rounded-tr-[32px] bg-white px-8 py-8 md:px-12">
          <div className="absolute d-none left-[18px] top-[-32px] lg:h-[32px] lg:w-[32px] overflow-hidden bg-white">
            <div className="h-full w-full rounded-bl-[32px] bg-[#AAB9CA]" />
          </div>
          <div className="absolute right-[-32px] bottom-[32px] lg:h-[32px] lg:w-[32px] rotate-90 overflow-hidden bg-white">
            <div className="h-full w-full rounded-br-[32px] bg-[#A2B3C3]" />
          </div>
          
          <h2 className="text-4xl font-bold leading-none md:text-5xl">{count}k+</h2>
          <p className="max-w-[180px] text-sm leading-[150%] text-primary md:text-lg">
            {t("statsText")}
          </p>
        </div>
      </div>
    </section>
  );
}
