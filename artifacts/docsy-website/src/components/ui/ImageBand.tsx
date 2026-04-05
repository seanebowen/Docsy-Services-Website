import React from "react";

interface ImageBandProps {
  src: string;
  alt?: string;
}

export function ImageBand({ src, alt = "" }: ImageBandProps) {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        height: "320px",
        width: "100%",
      }}
      className="image-band-desktop"
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          display: "block",
          filter: "grayscale(0.35) brightness(0.85)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(20, 45, 110, 0.50)",
          mixBlendMode: "multiply",
        }}
      />
      <style>{`
        @media (max-width: 640px) {
          .image-band-desktop {
            height: 220px !important;
          }
        }
      `}</style>
    </div>
  );
}
