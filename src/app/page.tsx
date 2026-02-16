import { Metadata } from "next";
import HeroSection from "@/sections/HeroSection";
import WeBelieveSection from "@/sections/WeBelieveSection";
import OurBrandEquation from "@/sections/OurBrandEquation";
import WeCoCreate from "@/sections/WeCoCreate";
import HowWeWork from "@/sections/HowWeWork";
import ServicesSection from "@/sections/ServicesSection";
import RecentlyCreated from "@/sections/RecentlyCreated";
import Clients from "@/sections/Clients";

export const metadata: Metadata = {
  title: "Yamen Creates - Creative Agency for Branding & Digital Experiences",
  description: "Transform your brand with Yamen Creates. We specialize in branding, digital experiences, and strategic growth for startups and businesses. Art + Strategy + Psychology = Storytelling.",
};

export default function Home() {
  return (
    <div className="mt-32 space-y-20 md:space-y-32 lg:space-y-40">
      <section id="hero" className="scroll-mt-32"><HeroSection /></section>
      <section id="we-believe" className="scroll-mt-32"><WeBelieveSection /></section>
      <section id="our-brand-equation" className="scroll-mt-32"><OurBrandEquation /></section>
      <section id="wecocreate" className="scroll-mt-32"><WeCoCreate /></section>
      <section id="how-we-work" className="scroll-mt-32"><HowWeWork /></section>
      <section id="services" className="scroll-mt-32"><ServicesSection /></section>
      <section id="recently-created" className="scroll-mt-32"><RecentlyCreated /></section>
      <section id="clients" className="scroll-mt-32"><Clients /></section>
    </div>
  );
}

