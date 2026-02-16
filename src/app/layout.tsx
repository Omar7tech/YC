import type { Metadata, Viewport } from "next";
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
import Script from "next/script";

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
  metadataBase: new URL('https://lightsteelblue-herring-546193.hostingersite.com'),
  title: "Yamen Creates",
  description: "Art + Strategy + Psychology = Storytelling",
  authors: [{ name: "Omar Abi Farraj", url: "https://github.com/Omar7tech" }, { name: "Yamen Creates", url: "https://yamencreates.com" }],
};

export const viewport: Viewport = {
  colorScheme: 'dark' as const,
  themeColor: '#2b2b2b',
  initialScale: 1,
  width: 'device-width',
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
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
        <header>
          <Nav />
        </header>
        <main id="main-content">
          {children}
        </main>
        <FooterIntro />
        <Footer />
        <Script
          id="organization-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Yamen Creates",
              "url": "https://yamencreates.com",
              "logo": "https://yamencreates.com/yamenlogo.svg",
              "sameAs": [
                "https://www.instagram.com/yamencreates/",
                "https://www.linkedin.com/company/yamen-creates/"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+96170075077",
                "contactType": "customer service",
                "email": "info@yamencreates.com"
              }
            })
          }}
        />
      </body>
    </html>
  );
}
