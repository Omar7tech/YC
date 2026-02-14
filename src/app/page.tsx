import { Metadata } from "next";
import MagicBento from "@/components/MagicBento";
import HeroSection from "@/sections/HeroSection";
import WeBelieveSection from "@/sections/WeBelieveSection";
import OurBrandEquation from "@/sections/OurBrandEquation";
import HowWeWork from "@/sections/HowWeWork";
import ServicesSection from "@/sections/ServicesSection";
import WeCoCreate from "@/sections/WeCoCreate";
import RecentlyCreated from "@/sections/RecentlyCreated";
import Clients from "@/sections/Clients";

export const metadata: Metadata = {
  title: "Yamen Creates - Home",
};

export default function Home() {


  return (
    <div className="mt-32  space-y-20 md:space-y-32 lg:space-y-40">
      <div id="hero" className="scroll-mt-32"><HeroSection /></div>
      <div id="we-believe" className="scroll-mt-32"><WeBelieveSection /></div>
      <div id="our-brand-equation" className="scroll-mt-32"><OurBrandEquation /></div>
      <div id="wecocreate" className="scroll-mt-32"><WeCoCreate /></div>
      <div id="how-we-work" className="scroll-mt-32"><HowWeWork /></div>
      <div id="services" className="scroll-mt-32"><ServicesSection /></div>
      <div id="recently-created" className="scroll-mt-32"><RecentlyCreated /></div>
      <div id="clients" className="scroll-mt-32"><Clients /></div>
    </div>
  );
}
