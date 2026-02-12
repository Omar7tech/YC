'use client'

import { ArrowRight } from "lucide-react"
import ImageWithLoader from "./ImageWithLoader"

interface ProgramData {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  bulletPoints: string[];
  tags: string[];
  images: Array<{
    src: string;
    alt: string;
  }>;
}

interface SignatureProgramItemProps {
  program: ProgramData;
}

function SignatureProgramItem({ program }: SignatureProgramItemProps) {
  const whatsappUrl = `https://wa.me/96170075077?text=${encodeURIComponent(`I want to know more about ${program.title}`)}`;
  
  return (
    <div className="py-10 px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-5 md:gap-10">
            <div id="firstgrid" className="flex flex-col justify-between min-h-0 space-y-5 md:col-span-1">
                <h1 className="text-[clamp(1.25rem,4vw,2rem)] font-bold">
                    {program.description}
                </h1>
                <a 
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 md:px-6 py-3 border border-white/30 rounded-full text-white font-light hover:bg-white/10 transition-all duration-300 flex items-center justify-between gap-2 w-fit"
                >
                    {program.buttonText}
                    <ArrowRight className="w-4 h-4" />
                </a>
            </div>
            <div id="bullets" className="md:col-span-1 text-[clamp(0.875rem,1.2vw,1.3rem)] font-extralight">
                <ul className="list-disc list-inside space-y-1 md:space-y-2">
                    {program.bulletPoints.map((point, index) => (
                        <li key={index}>{point}</li>
                    ))}
                </ul>
            </div>
        </div>
        <div id="badges">
            <div className="flex flex-wrap gap-2 md:gap-3 mt-6 md:mt-15">
                {program.tags.map((tag, index) => (
                    <button key={index} className="px-3 py-1.5 md:px-4 md:py-2 border border-white/30 rounded-full text-white font-light hover:bg-white/10 transition-all duration-300 text-xs md:text-sm">
                        {tag}
                    </button>
                ))}
            </div>
        </div>
        <div id="images">
            <ImageWithLoader images={program.images} />
        </div>
    </div>
  )
}

export default SignatureProgramItem