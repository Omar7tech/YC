import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Bricolage_Grotesque,
  Special_Gothic_Expanded_One,
} from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import FooterIntro from "@/components/FooterIntro";
import Footer from "@/components/Footer";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  preload: false,
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  preload: false,
});

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage-grotesque",
  preload: false,
});

const specialGothicExpanded = Special_Gothic_Expanded_One({
  subsets: ["latin"],
  variable: "--font-special-gothic-expanded",
  weight: "400",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});


export const metadata: Metadata = {
  title: "Yamen Creates",
  description: "Art + Strategy + Psychology = Storytelling",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bricolageGrotesque.variable} ${geistSans.variable} ${geistMono.variable} ${specialGothicExpanded.variable}`}
    >
      <body className="antialiased max-w-[2000px] mx-auto" suppressHydrationWarning>
        <Nav />
        {children}
        <FooterIntro />
        <Footer />
      </body>
    </html>
  );
}
