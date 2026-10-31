import { ImageResponse } from "next/og";

export const alt = "Markdown Preview - Zentrify";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              color: "white",
            }}
          >
            Z
          </div>
          <span style={{ color: "#a1a1aa", fontSize: "24px", fontWeight: 500 }}>
            Zentrify
          </span>
        </div>
        <h1
          style={{
            color: "white",
            fontSize: "56px",
            fontWeight: 700,
            textAlign: "center",
            margin: 0,
            lineHeight: 1.2,
            maxWidth: "900px",
          }}
        >
          Markdown Preview
        </h1>
        <p
          style={{
            color: "#a1a1aa",
            fontSize: "24px",
            marginTop: "20px",
            textAlign: "center",
            maxWidth: "700px",
          }}
        >
          Free online tool — fast, private, no signup required
        </p>
        <div
          style={{
            display: "flex",
            gap: "8px",
            marginTop: "40px",
          }}
        >
          {["Developer", "Free", "No Signup"].map((tag) => (
            <div
              key={tag}
              style={{
                padding: "8px 20px",
                borderRadius: "999px",
                border: "1px solid #374151",
                color: "#9ca3af",
                fontSize: "16px",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
