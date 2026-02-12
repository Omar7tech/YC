import Image from "next/image"


function HowWeWork() {
    return (
        <div className="px-5 md:px-10 lg:px-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div
                    id="title-illustration"
                    className="grid h-full grid-rows-[auto_1fr]"
                >
                    <h1 className="font-special-gothic-expanded text-[clamp(1rem,7.5vw,6rem)] font-extrabold leading-none">
                        How{" "}
                        <br className="hidden md:block" />
                        We Work
                    </h1>

                    <div className="flex items-center justify-center min-h-0">
                        <Image
                            src="/illustration1.png"
                            alt=""
                            width={300}
                            height={300}
                            className="transition-all duration-500 hover:scale-115 hover:drop-shadow-2xl hover:shadow-purple-500/25"
                        />
                    </div>
                </div>
                <div id="paragraph" className="font-extralight text-[clamp(1.125rem,2.5vw,1.7rem)] space-y-5 tracking-wide leading-[1.2]">
                    <p>
                        At Yamen Creates, we work through four
                        clearly defined programs, each built
                        around a specific business need. Whether
                        a company is starting, seeking structure,
                        repositioning, or preparing to scale, we
                        activate the right combination of strategy,
                        marketing, content, and digital systems to
                        support that moment.
                    </p>
                    <p>
                        We don’t begin with deliverables. We begin
                        by understanding where the business is,
                        what is holding it back, and what it needs
                        next. From there, we apply a program-led
                        approach that brings clarity, alignment,
                        and direction—ensuring every decision
                        serves the business, not just the brief.
                    </p>
                    <p>
                        Our role is not to execute in isolation, but
                        to partner closely with founders and
                        leadership teams—building systems that
                        carry the brand through growth,
                        complexity, and scale.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default HowWeWork