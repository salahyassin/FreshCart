import { Skeleton } from "@heroui/react";

export default function ProductLoadingScreen() {
  return (
    <div className="flex items-center flex-wrap -mx-4">
      {/* Product Image Skeleton */}
      <div className="w-full md:w-1/3 px-4 mb-8">
        <Skeleton className="w-full h-72 rounded-lg mb-4" />
      </div>

      {/* Product Details Skeleton */}
      <div className="w-full md:w-2/3 px-4">
        {/* Title */}
        <Skeleton className="h-8 w-3/4 mb-2" />
        {/* SKU */}
        <Skeleton className="h-4 w-1/3 mb-4" />
        {/* Price */}
        <div className="flex items-center space-x-2 mb-4">
          <Skeleton className="h-6 w-1/4" />
          
        </div>
        {/* Rating */}
        <div className="flex items-center space-x-2 mb-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-1/6" />
        </div>
        {/* Description */}
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-2" />
        <Skeleton className="h-4 w-2/3 mb-6" />
        {/* Buttons */}
        <div className="flex space-x-4">
          <Skeleton className="h-10 w-1/4 rounded-md" />
          <Skeleton className="h-10 w-1/4 rounded-md" />
        </div>
      </div>
    </div>
  );
}
