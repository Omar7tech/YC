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
      "description": "For businesses that need to start.",
      "buttonText": "Start with us",
      "bulletPoints": [
        "Shift from an operating business to a clearly defined brand",
        "Establish consistent brand communication, purpose, and direction",
        "Identify and own the highest-value product or service opportunity",
        "Structure and optimize the sales and conversion funnel",
        "Build a confident, aligned digital presence"
      ],
      "tags": [
        "Brand Strategy",
        "Target audience",
        "Go-To-Market",
        "Core Messaging",
        "Creative Direction Brand Strategy",
        "Concept development"
      ],
      "images": [
        {
          "src": "https://picsum.photos/400/400?random=8",
          "alt": "YC Foundation Program"
        },
        {
          "src": "https://picsum.photos/400/400?random=9",
          "alt": "YC Foundation Program"
        },
        {
          "src": "https://picsum.photos/400/400?random=10",
          "alt": "YC Foundation Program"
        },
        {
          "src": "https://picsum.photos/400/400?random=11",
          "alt": "YC Foundation Program"
        }
      ]
    },
    {
      "id": "yc-framework",
      "title": "YC-FRAMEWORK",
      "description": "For businesses that need to structure.",
      "buttonText": "Structure with us",
      "bulletPoints": [
        "Shift from an operating business to a clearly defined brand",
        "Establish consistent brand communication, purpose, and direction",
        "Identify and own the highest-value product or service opportunity",
        "Structure and optimize the sales and conversion funnel",
        "Build a confident, aligned digital presence",
      ],
      "tags": [
        "Business Audit",
        "Visual identity",
        "Verbal identity",
        "Brand Strategy",
        "Market Opportunity",
        "Core Messaging"
      ],
      "images": [
        {
          "src": "https://picsum.photos/400/400?random=12",
          "alt": "YC Framework Program"
        },
        {
          "src": "https://picsum.photos/400/400?random=13",
          "alt": "YC Framework Program"
        },
        {
          "src": "https://picsum.photos/400/400?random=14",
          "alt": "YC Framework Program"
        },
        {
          "src": "https://picsum.photos/400/400?random=15",
          "alt": "YC Framework Program"
        }
      ]
    },
    {
      "id": "yc-reposition",
      "title": "YC-REPOSITION",
      "description": "For businesses that need to realign and evolve.",
      "buttonText": "Reposition with us",
      "bulletPoints": [
        "Optimize and rationalize existing brand assets",
        "Reposition the brand within the correct market context",
        "Accelerate digital growth through clearer positioning",
        "Evolve brand visuals and verbal systems without losing equity",
        "Restructure and optimize the content ecosystem"
      ],
      "tags": [
        "Marketing strategy",
        "Website",
        "Creative Direction",
        "Campaigns",
        "Brand Audit",
        "Rebranding"
      ],
      "images": [
        {
          "src": "https://picsum.photos/400/400?random=16",
          "alt": "YC Reposition Program"
        },
        {
          "src": "https://picsum.photos/400/400?random=17",
          "alt": "YC Reposition Program"
        },
        {
          "src": "https://picsum.photos/400/400?random=18",
          "alt": "YC Reposition Program"
        },
        {
          "src": "https://picsum.photos/400/400?random=19",
          "alt": "YC Reposition Program"
        }
      ]
    },
    {
      "id": "yc-scale",
      "title": "YC-SCALE",
      "description": "For businesses that need to grow and expand.",
      "buttonText": "Scale with us",
      "bulletPoints": [
        "Scale operations and brand presence with control and clarity",
        "Optimize product and distribution channels",
        "Drive measurable sales performance",
        "Track, expand, and improve ROI and KPI performance",
        "Build partnerships and growth-driven campaigns"
      ],
      "tags": [
        "Content Creation",
        "Production",
        "PR",
        "Media",
        "ART Direction",
        "Sales Channel Development",
        "Performance-led campaigns"
      ],
      "images": [
        {
          "src": "https://picsum.photos/400/400?random=20",
          "alt": "YC Scale Program"
        },
        {
          "src": "https://picsum.photos/400/400?random=21",
          "alt": "YC Scale Program"
        },
        {
          "src": "https://picsum.photos/400/400?random=22",
          "alt": "YC Scale Program"
        },
        {
          "src": "https://picsum.photos/400/400?random=23",
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
