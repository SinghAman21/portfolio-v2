import { ImageResponse } from "next/og";

export const ogImageSize = {
  width: 1200,
  height: 630,
};

const cutiveMonoFont = fetch(
  "https://fonts.gstatic.com/s/cutivemono/v23/m8JWjfRfY7WVjVi2E-K9H5RF.ttf",
).then((res) => res.arrayBuffer());

function getTitleSize(title: string) {
  if (title.length <= 18) return 104;
  if (title.length <= 34) return 82;
  if (title.length <= 58) return 62;
  return 50;
}

interface PortfolioOgImageOptions {
  title: string;
  subtitle?: string;
  footer?: string;
  site?: string;
}

export async function createPortfolioOgImage({
  title,
  subtitle = "Backend · Infrastructure · Full-Stack",
  footer = "building scalable systems",
  site = "singhaman.me",
}: PortfolioOgImageOptions) {
  const cutiveMono = await cutiveMonoFont;
  const titleSize = getTitleSize(title);
  const dots = Array.from({ length: 55 * 29 }, (_, index) => {
    const x = (index % 55) * 22;
    const y = Math.floor(index / 55) * 22;

    return (
      <div
        key={index}
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: 2,
          height: 2,
          borderRadius: 999,
          background: "rgba(255,255,255,0.05)",
        }}
      />
    );
  });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0A0A0A",
          position: "relative",
          overflow: "hidden",
          fontFamily: "Cutive Mono, monospace",
          display: "flex",
        }}
      >
        {dots}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 22% 40%, rgba(255,255,255,0.03), transparent 60%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 96,
            top: 50,
            fontSize: 24,
            fontWeight: 500,
            letterSpacing: 1,
            color: "#8A8A8A",
          }}
        >
          Aman Singh | Blog
        </div>
        <div
          style={{
            position: "absolute",
            left: 96,
            right: 80,
            top: 170,
            height: 1,
            background:
              "linear-gradient(90deg, rgba(59,130,246,0), rgba(237,237,237,0.14) 30%, rgba(237,237,237,0.14) 70%, rgba(59,130,246,0))",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: 96,
            top: title.length > 58 ? 205 : 230,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 6,
              width: 960,
            }}
          >
            <div
              style={{
                margin: 0,
                fontWeight: 400,
                fontSize: titleSize,
                lineHeight: title.length > 34 ? 1.02 : 0.92,
                letterSpacing: title.length > 34 ? -1.2 : -2,
                color: "#EDEDED",
                fontFamily: "Cutive Mono, monospace",
                textShadow: "0 0 1px #EDEDED",
                maxWidth: 900,
                display: "flex",
              }}
            >
              {title}
            </div>
            <div
              style={{
                width: Math.max(16, Math.round(titleSize * 0.25)),
                height: Math.max(54, Math.round(titleSize * 0.92)),
                background: "#22C55E",
                boxShadow: "0 0 24px rgba(34,197,94,0.55)",
                transform: "translateY(6px)",
                flexShrink: 0,
              }}
            />
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 27,
              fontWeight: 500,
              letterSpacing: 1,
              color: "#8A8A8A",
            }}
          >
            {subtitle}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 96,
            bottom: 70,
            fontSize: 23,
            color: "#5BFF71",
            letterSpacing: 0.5,
            display: "flex",
          }}
        >
          <span style={{ color: "#22C55E" }}>~</span>
          <span>&nbsp;{footer}</span>
        </div>

        <div
          style={{
            position: "absolute",
            right: 80,
            bottom: 70,
            fontSize: 21,
            color: "#B5B0B0",
            letterSpacing: 0.5,
          }}
        >
          {site}
        </div>
      </div>
    ),
    {
      ...ogImageSize,
      fonts: [
        {
          name: "Cutive Mono",
          data: cutiveMono,
          weight: 400,
          style: "normal",
        },
      ],
    },
  );
}
