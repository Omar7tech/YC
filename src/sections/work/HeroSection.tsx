import AnimatedDescription from "@/components/AnimatedDescription"

function HeroSection() {
    return (
        <div className="relative px-5 md:px-10 lg:px-20">
            {/* Soft purple glow from right */}
            <div
                aria-hidden
                className="
                    pointer-events-none
                    absolute right-0 top-0 bottom-0 w-64 h-full
                    bg-[radial-gradient(ellipse_at_right,rgba(200,42,255,0.25),transparent_70%)]
                    blur-[80px]
                "
            />

            {/* Content */}
            <div className="relative space-y-5 leading-none">
                <div className="text-[clamp(2rem,8vw,9rem)] font-bold">
                    <h1>
                        Work, Built Around
                        <br />
                        Business Stages.
                    </h1>
                </div>
                <div className="text-[clamp(1rem,4vw,2.5rem)] font-light">
                    <AnimatedDescription
                        text="See how we partner with leadership"
                        delay={0.2}
                    />
                    <AnimatedDescription
                        text="teams to build brands grounded in"
                        delay={0.4}
                    />
                    <AnimatedDescription
                        text="clarity and designed to scale."
                        delay={0.6}
                    />
                </div>
            </div>
        </div>
    )
}

export default HeroSection