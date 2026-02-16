import { Metadata } from "next";
import AnimatedDescription from "@/components/AnimatedDescription";
import { Mail, Phone, MapPin } from "lucide-react";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Yamen Creates - Contact Us for Branding & Creative Services",
  description: "Get in touch with Yamen Creates for branding, creative services, and project consultations. Reach out via email, phone, or form to start your amazing project.",
  keywords: ["contact", "creative agency", "branding services", "project inquiry", "startups", "business consultation"],
  openGraph: {
    title: "Yamen Creates - Contact Us",
    description: "Ready to bring your vision to life? Contact Yamen Creates for branding and digital experiences.",
    url: "https://yamencreates.com/contact",
    siteName: "Yamen Creates",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yamen Creates - Contact Us",
    description: "Ready to bring your vision to life? Contact Yamen Creates for branding and digital experiences.",
  },
  alternates: {
    canonical: "https://yamencreates.com/contact",
  },
};

export default function Contact() {
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Yamen Creates",
    "description": "Contact page for Yamen Creates, a creative agency specializing in branding and digital experiences.",
    "url": "https://yamencreates.com/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "Yamen Creates",
      "url": "https://yamencreates.com",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+96170075077",
        "email": "info@yamencreates.com",
        "contactType": "customer service",
        "areaServed": "Global",
        "availableLanguage": ["English", "Arabic"],
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Aley",
          "addressRegion": "Mount Lebanon",
          "addressCountry": "LB"
        }
      },
      "sameAs": [
        "https://www.instagram.com/yamencreates/",
        "https://www.linkedin.com/company/yamen-creates/"
      ]
    },
    "potentialAction": [
      {
        "@type": "CommunicateAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "mailto:info@yamencreates.com?subject=Project Inquiry",
          "inLanguage": "en-US",
          "actionPlatform": [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform"
          ]
        }
      },
      {
        "@type": "CommunicateAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "tel:+96170075077",
          "inLanguage": "en-US",
          "actionPlatform": [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform"
          ]
        }
      }
    ]
  };

  return (
    <div className="mt-32 px-5 md:px-10 lg:px-20 space-y-20">
      <Script
        id="contact-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactJsonLd)
        }}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-5">
          <h1 className="font-bold text-[clamp(2rem,4vw,4rem)] leading-none">
            Let's Create
            <br />
            Something Amazing
          </h1>
          <div className="space-y-5 max-w-[600px]">
            <AnimatedDescription
              text="Ready to bring your vision to life? Whether you're a founder, CEO, or leadership team looking to build your brand, we're here to help."
              delay={0.2}
            />
            <AnimatedDescription
              text="Reach out to start a conversation about your project."
              delay={0.4}
            />
          </div>
          <div className="space-y-4 pt-5">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-white/70" />
              <p className="text-white/80">info@yamencreates.com</p>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-white/70" />
              <p className="text-white/80">+961 7007 5077</p>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-white/70" />
              <p className="text-white/80">Aley, Mount Lebanon, Lebanon</p>
            </div>
          </div>
        </div>
        <div className="space-y-5">
          <form className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors resize-none"
                placeholder="Tell us about your project..."
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-white/10 border border-white/30 rounded-full text-white font-light hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
