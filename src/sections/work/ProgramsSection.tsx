import SignatureProgramItem from "@/components/SignatureProgramItem"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import programsData from "@/data/programs.json"

export default function ProgramsSection() {
    return (
        <div className="px-5 md:px-10 lg:px-20">
            <h1 className="text-[clamp(1.5rem,4vw,3rem)]">{programsData.sectionTitle}</h1>
            <div className="mt-8">
                <Accordion type="multiple">
                    {programsData.programs.map((program) => (
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
