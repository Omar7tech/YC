import SignatureProgramItem from "@/components/SignatureProgramItem"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Script from "next/script"

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
          "src": "/programs/foundation/lemah.jpeg",
          "alt": "YC Foundation Program"
        },
        {
          "src": "/programs/foundation/dah.jpeg",
          "alt": "YC Foundation Program"
        },
        {
          "src": "/programs/foundation/realestate.jpeg",
          "alt": "YC Foundation Program"
        },
        {
          "src": "/programs/foundation/frameit.jpeg",
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
          "src": "/programs/framework/stonehouse.jpeg",
          "alt": "YC Framework Program"
        },
        {
          "src": "/programs/framework/roaster.jpeg",
          "alt": "YC Framework Program"
        },
        {
          "src": "/programs/framework/serotonin.jpeg",
          "alt": "YC Framework Program"
        },
        {
          "src": "/programs/framework/dolait.jpeg",
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
          "src": "/programs/reposition/coffee.jpeg",
          "alt": "YC Reposition Program"
        },
        {
          "src": "/programs/reposition/liwan.jpeg",
          "alt": "YC Reposition Program"
        },
        {
          "src": "/programs/reposition/eat.jpeg",
          "alt": "YC Reposition Program"
        },
        {
          "src": "/programs/reposition/betterbites.jpeg",
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
          "src": "/programs/scale/zahalan.jpeg",
          "alt": "YC Reposition Program"
        },
        {
          "src": "/programs/scale/ugg.jpeg",
          "alt": "YC Reposition Program"
        },
        {
          "src": "/programs/scale/food.jpeg",
          "alt": "YC Reposition Program"
        },
        {
          "src": "/programs/scale/lb.jpeg",
          "alt": "YC Reposition Program"
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

  const programsJsonLd = programsData.programs.map((program, index) => ({
    "@context": "https://schema.org",
    "@type": ["Service", "CreativeWork"],
    "@id": `https://yamencreates.com/work#${program.id}`,
    "name": program.title,
    "description": `${program.description} ${program.bulletPoints.join('. ')}`,
    "provider": {
      "@type": "Organization",
      "name": "Yamen Creates",
      "url": "https://yamencreates.com",
      "sameAs": [
        "https://www.instagram.com/yamencreates/",
        "https://www.linkedin.com/company/yamen-creates/"
      ]
    },
    "serviceType": program.tags.join(', '),
    "keywords": program.tags.join(', '),
    "areaServed": "Global",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `${program.title} Services`,
      "itemListElement": program.tags.map((tag, tagIndex) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": tag,
          "description": `Part of ${program.title} program`
        }
      }))
    },
    "offers": {
      "@type": "Offer",
      "url": `https://yamencreates.com/work#${program.id}`,
      "price": "Contact for pricing",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "0",
      "bestRating": "5",
      "worstRating": "1"
    },
    "additionalProperty": program.bulletPoints.map((point, pointIndex) => ({
      "@type": "PropertyValue",
      "name": `Feature ${pointIndex + 1}`,
      "value": point,
      "description": `Detail of program ${program.title}`
    })),
    "image": program.images.map(img => ({
      "@type": "ImageObject",
      "url": img.src,
      "caption": img.alt,
      "width": 400,
      "height": 400
    })),
    "thumbnailUrl": {
      "@type": "ImageObject",
      "url": program.images[0]?.src,
      "caption": program.images[0]?.alt,
      "width": 400,
      "height": 400
    },
    "potentialAction": {
      "@type": "Action",
      "name": program.buttonText,
      "target": `https://yamencreates.com/work#${program.id}`
    },
    "url": `https://yamencreates.com/work#${program.id}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://yamencreates.com/work#${program.id}`
    }
  }));

  return (
    <div className="px-5 md:px-10 lg:px-20">
      <Script
        id="programs-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(programsJsonLd)
        }}
      />
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
