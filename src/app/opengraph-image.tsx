import { ImageResponse } from "next/og";

export const alt = "Kieran Johnson";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Plain black card with the name, bottom left, like the hero.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 72,
          background: "#0a0a0a",
          color: "#ffffff",
          fontSize: 148,
          fontWeight: 800,
          lineHeight: 0.9,
          letterSpacing: "-0.03em",
        }}
      >
        <div>KIERAN</div>
        <div>JOHNSON</div>
      </div>
    ),
    size,
  );
}
