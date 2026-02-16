import { Metadata } from "next";
import { Suspense } from "react";
import HeroSection from "@/sections/work/HeroSection"
import VideoSection from "@/sections/work/VideoSection"
import ProgramsSection from "@/sections/work/ProgramsSection"
import OurWorksection from "@/sections/work/OurWorksection"

export const metadata: Metadata = {
  title: "Yamen Creates - Our Work & Signature Branding Programs",
  description: "Explore our programs: YC-FOUNDATION, YC-FRAMEWORK, YC-REPOSITION, YC-SCALE. See how we build brands grounded in clarity and designed to scale.",
};

function page() {
  return (
    <div className="mt-32 space-y-8">
        <section id="hero" className="scroll-mt-32"><HeroSection/></section>
        <section id="video" className="scroll-mt-32"><VideoSection/></section>
        <section id="programs" className="scroll-mt-32"><ProgramsSection/></section>
        <section id="our-work" className="scroll-mt-32">
            <Suspense fallback={<div>Loading work...</div>}>
                <OurWorksection/>
            </Suspense>
        </section>
    </div>
  )
}

export default page