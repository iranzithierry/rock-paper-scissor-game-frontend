import localFont from "next/font/local";

export const monoFont = localFont({
  variable: "--font-mono",
  src: [
    {
      path: "../public/fonts/jetbrains-mono-bold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/jetbrains-mono-extra-bold.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/jetbrains-mono-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/jetbrains-mono-regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
});

export const displayFont = localFont({
  variable: "--font-display",
  src: [
    {
      path: "../public/fonts/circular-medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/circular-bold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
});
