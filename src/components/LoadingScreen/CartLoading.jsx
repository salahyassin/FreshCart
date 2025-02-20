import { Skeleton } from "@heroui/react";

export default function ProductCardSkeleton() {
  return (
    <div className="p-6 space-y-6">
      {/* Title Skeleton */}
      <Skeleton className="h-6 w-64 mx-auto" />

      <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-6">
        {/* Left Section - Product Details */}
        <div className="w-full sm:w-2/3 p-6 bg-white shadow-md rounded-lg">
          <div className="flex items-center justify-between space-x-6">
            {/* Product Image */}
            <Skeleton className="h-32 w-32 rounded-lg" />

            {/* Product Details */}
            <div className="flex flex-grow flex-col space-y-2">
              <Skeleton className="h-5 w-48" />
              <div className="space-y-1">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-24" />
              </div>
            </div>

            {/* Price Display */}
            <div className="flex flex-col items-end space-y-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-20" />
            </div>
          </div>
        </div>

        {/* Right Section - Order Summary */}
        <div className="w-full sm:w-1/3 p-6 bg-white shadow-md rounded-lg space-y-4">
          <div className="space-y-4">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>

          <div className="border-t pt-4 space-y-4">
            <div className="flex justify-between font-bold">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-20" />
            </div>
            <Skeleton className="h-4 w-32 mx-auto" />
            {/* Checkout Button */}
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}