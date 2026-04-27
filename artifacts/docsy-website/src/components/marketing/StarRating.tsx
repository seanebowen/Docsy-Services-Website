import React from "react";
import { Star } from "lucide-react";

const BLUE = "#4D9FDB";

interface Props {
  count?: number;
  size?: number;
  className?: string;
}

export function StarRating({ count = 5, size = 14, className = "" }: Props) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          width={size}
          height={size}
          style={{ color: BLUE, fill: BLUE }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
