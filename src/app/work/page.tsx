import { Metadata } from "next";
import HeroSection from "@/sections/work/HeroSection"
import VideoSection from "@/sections/work/VideoSection"
import ProgramsSection from "@/sections/work/ProgramsSection"
import OurWorksection from "@/sections/work/OurWorksection"

export const metadata: Metadata = {
  title: "Yamen Creates - Work",
};

function page() {
  return (
    <div className="mt-32 space-y-8">
        <HeroSection/>
        <VideoSection/>
        <ProgramsSection/>
        <OurWorksection/>
    </div>
  )
}

export default page