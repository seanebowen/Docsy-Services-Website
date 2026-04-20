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
        width: "100%",
        backgroundColor: "#ffffff",
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
          objectPosition: "center 35%",
          display: "block",
        }}
      />
      <style>{`
        .image-band-desktop { height: 480px; }
        @media (min-width: 1440px) {
          .image-band-desktop { height: 540px; }
        }
        @media (min-width: 1920px) {
          .image-band-desktop { height: 600px; }
        }
        @media (max-width: 1024px) {
          .image-band-desktop { height: 380px; }
        }
        @media (max-width: 640px) {
          .image-band-desktop { height: 260px; }
        }
      `}</style>
    </div>
  );
}
