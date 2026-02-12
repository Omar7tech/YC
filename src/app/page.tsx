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
    <div className="mt-32  space-y-50">
      <HeroSection />
      <WeBelieveSection />
      <OurBrandEquation />
      <WeCoCreate/>
      <HowWeWork />
      <ServicesSection />
      <RecentlyCreated />
      <Clients />
    </div>
  );
}
