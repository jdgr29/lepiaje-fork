"use client";
import React from "react";

function Skeleton({ className }: { className: string }) {
  return <div className={`animate-pulse bg-gray-700 rounded ${className}`} />;
}

export default function PropertyPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-32">
      {/* <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3"> */}

      {/* <Skeleton className="h-6 w-1/2 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-2" />
          <Skeleton className="h-4 w-5/6 mb-2" /> */}

      <div className="mt-8">
        <Skeleton className="h-6 w-1/3 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>

    // </div>

    // </div>)
  );
}
