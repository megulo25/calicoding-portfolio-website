import type { Metadata } from "next";
import { Playfair_Display, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

/**
 * Headline font — high-contrast extended serif.
 * Closest freely available match to PP Editorial New.
 */
const playfair = Playfair_Display({
  variable: "--font-headline",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

/**
 * Body font — sharp grotesk sans-serif.
 * Clean, geometric, pairs well with a decorative serif.
 */
const spaceGrotesk = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

/**
 * Monospace font — technical data, code, labels.
 */
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Foundry Tech",
  description: "We Build What's Next — Mobile, Web, TV & IoT.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
