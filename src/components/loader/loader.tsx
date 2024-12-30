import React from "react";

interface PulsingDotSpinnerProps {
  size?: "small" | "medium" | "large";
  color?: string;
}

export function PulsingDotSpinner({
  size = "medium",
  color = "bg-blue-500",
}: PulsingDotSpinnerProps) {
  const sizeClasses = {
    small: "w-2 h-2",
    medium: "w-3 h-3",
    large: "w-4 h-4",
  };

  return (
    <div
      className="flex items-center justify-center space-x-2"
      role="status"
      aria-label="Loading"
    >
      <div
        className={`${sizeClasses[size]} ${color} rounded-full animate-pulse`}
      ></div>
      <div
        className={`${sizeClasses[size]} ${color} rounded-full animate-pulse delay-150`}
      ></div>
      <div
        className={`${sizeClasses[size]} ${color} rounded-full animate-pulse delay-300`}
      ></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
