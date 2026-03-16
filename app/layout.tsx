import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Free Testosterone Guide — Rock Mountain Performance",
  description:
    "Free PDF breakdown of every ingredient, every dose, and the science behind Peak Performance.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
