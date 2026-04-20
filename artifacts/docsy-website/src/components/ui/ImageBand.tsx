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
        height: "560px",
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
          objectFit: "contain",
          objectPosition: "center",
          display: "block",
          backgroundColor: "#ffffff",
        }}
      />
      <style>{`
        @media (max-width: 1024px) {
          .image-band-desktop {
            height: 400px !important;
          }
        }
        @media (max-width: 640px) {
          .image-band-desktop {
            height: 240px !important;
          }
        }
      `}</style>
    </div>
  );
}
