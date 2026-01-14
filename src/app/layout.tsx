import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ProficienThAI - Thai Language Learning",
  description: "AI-powered Thai language learning platform with gamification for non-native speakers",
  keywords: ["Thai language", "learning", "AI", "chatbot", "gamification"],
  authors: [{ name: "ProficienThAI Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
