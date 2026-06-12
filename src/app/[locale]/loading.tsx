import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col px-4 pt-8 md:px-8">
      <div className="mb-12 flex items-center justify-between">
        <Skeleton className="h-10 w-32" />
        <div className="hidden space-x-6 md:flex">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-20" />
        </div>
        <Skeleton className="h-10 w-24 rounded-full" />
      </div>

      <div className="flex flex-1 flex-col gap-8 lg:flex-row lg:items-center">
        <div className="flex-1 space-y-6">
          <Skeleton className="h-16 w-3/4" />
          <Skeleton className="h-16 w-2/3" />
          <div className="space-y-3 pt-4">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-5/6" />
            <Skeleton className="h-5 w-4/6" />
          </div>
          <div className="flex gap-4 pt-6">
            <Skeleton className="h-14 w-40 rounded-full" />
            <Skeleton className="h-14 w-40 rounded-full" />
          </div>
        </div>
        <div className="flex-1">
          <Skeleton className="h-[400px] w-full rounded-[32px] lg:h-[600px]" />
        </div>
      </div>
    </div>
  );
}
