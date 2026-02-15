import { Metadata } from "next";
import { Suspense } from "react";
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
        <div id="hero" className="scroll-mt-32"><HeroSection/></div>
        <div id="video" className="scroll-mt-32"><VideoSection/></div>
        <div id="programs" className="scroll-mt-32"><ProgramsSection/></div>
        <div id="our-work" className="scroll-mt-32">
            <Suspense fallback={<div>Loading work...</div>}>
                <OurWorksection/>
            </Suspense>
        </div>
    </div>
  )
}

export default page