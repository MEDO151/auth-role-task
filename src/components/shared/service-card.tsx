import Image from "next/image";

import { cn } from "@/lib/utils";

import { Service } from "@/types/service";

interface ServiceCardProps extends Service {
  className?: string;
}

export default function ServiceCard({
  icon,
  title,
  description,
  className,
}: ServiceCardProps) {
  return (
    <div className={cn(`rounded-[24px] bg-[#F5F8FA] pb-7 pt-10 px-10 transition-all duration-300 hover:-translate-y-1`, className)}>
      <Image src={icon} alt={title} width={50} height={50} className="mb-8" />

      <h3 className="mb-4 text-[24px] font-bold leading-[140%] text-primary ">
        {title}
      </h3>

      <p className="text-primary md:w-[75%]">
        {description}
      </p>
    </div>
  );
}
