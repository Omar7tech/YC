import SignatureProgramItem from "@/components/SignatureProgramItem"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const programsData = {
  "sectionTitle": "Our Signature Programs",
  "programs": [
    {
      "id": "yc-foundation",
      "title": "YC-FOUNDATION",
      "description": "For businesses that need to start. Shift from an operating business to a clearly defined brand, establish consistent brand communication, purpose, and direction.",
      "buttonText": "Let's Talk",
      "bulletPoints": [
        "Shift from an operating business to a clearly defined brand",
        "Establish consistent brand communication, purpose, and direction",
        "Identify and own the highest-value product or service opportunity",
        "Structure and optimize the sales and conversion funnel",
        "Build a confident, aligned digital presence"
      ],
      "tags": [
        "Foundation",
        "Brand Strategy",
        "Business Audit"
      ],
      "images": [
        {
          "src": "/uploads/GFNEHUJWCA0U53M8COSE19YVHCEDU2.png",
          "alt": "YC Foundation Program"
        }
      ]
    },
    {
      "id": "yc-framework",
      "title": "YC-FRAMEWORK",
      "description": "For businesses that need to structure. Build comprehensive brand systems and operational frameworks for sustainable growth.",
      "buttonText": "Let's Talk",
      "bulletPoints": [
        "Visual identity development",
        "Verbal identity systems",
        "Brand Strategy implementation",
        "Market Opportunity analysis",
        "Go-To-Market strategy"
      ],
      "tags": [
        "Framework",
        "Visual Identity",
        "Strategy"
      ],
      "images": [
        {
          "src": "/uploads/3CNS2YT9ZXVSHIE822LWYXEYH9M5LU.svg",
          "alt": "YC Framework Program"
        }
      ]
    },
    {
      "id": "yc-reposition",
      "title": "YC-REPOSITION",
      "description": "For businesses that need to realign and evolve. Optimize existing brand assets and reposition for market success.",
      "buttonText": "Let's Talk",
      "bulletPoints": [
        "Optimize and rationalize existing brand assets",
        "Reposition the brand within the correct market context",
        "Accelerate digital growth through clearer positioning",
        "Evolve brand visuals and verbal systems without losing equity",
        "Restructure and optimize the content ecosystem"
      ],
      "tags": [
        "Repositioning",
        "Marketing Strategy",
        "Rebranding"
      ],
      "images": [
        {
          "src": "/uploads/5PSR5FCL4S2WL5ITPKF84OR2OUYGR4.jpg",
          "alt": "YC Reposition Program"
        }
      ]
    },
    {
      "id": "yc-scale",
      "title": "YC-SCALE",
      "description": "For businesses that need to grow and expand. Scale operations and brand presence with control and clarity.",
      "buttonText": "Let's Talk",
      "bulletPoints": [
        "Scale operations and brand presence with control and clarity",
        "Optimize product and distribution channels",
        "Drive measurable sales performance",
        "Track, expand, and improve ROI and KPI performance",
        "Build partnerships and growth-driven campaigns"
      ],
      "tags": [
        "Scale",
        "Growth",
        "Performance"
      ],
      "images": [
        {
          "src": "/uploads/SZ79Y11B7SOPBNIM9R5WIGPS97PJWD.png",
          "alt": "YC Scale Program"
        }
      ]
    }
  ]
}

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

export default function ProgramsSection() {
    // Don't render anything if there are no programs
    if (programsData.programs.length === 0) {
        return null
    }

    return (
        <div className="px-5 md:px-10 lg:px-20">
            <h1 className="text-[clamp(1.5rem,4vw,3rem)]">{programsData.sectionTitle}</h1>
            <div className="mt-8">
                <Accordion type="multiple">
                    {(programsData.programs as ProgramData[]).map((program: ProgramData) => (
                        <AccordionItem key={program.id} value={program.id}>
                            <AccordionTrigger className="text-[clamp(1.5rem,4vw,5rem)] font-special-gothic-expanded uppercase">
                                {program.title}
                            </AccordionTrigger>
                            <AccordionContent>
                                <SignatureProgramItem program={program} />
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    )
}
