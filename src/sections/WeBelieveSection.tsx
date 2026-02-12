'use client'
import Image from "next/image"
import { motion } from "framer-motion"

function WeBelieveSection() {

    return (
        <>
            <div className="px-5 md:px-10 lg:px-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div
                        id="title-illustration"
                        className="flex items-center justify-between gap-4 md:grid md:grid-rows-[auto_1fr] md:gap-0"
                    >
                        <motion.h1
                            className="font-special-gothic-expanded text-[clamp(6rem,10vw,15rem)] font-extrabold leading-[100px]"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            WE
                        </motion.h1>
                        <motion.div
                            className="flex items-center min-h-0 md:hidden"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                            viewport={{ once: true, margin: "-50px" }}
                        >
                            <Image
                                src="/jam.png"
                                alt=""
                                width={100}
                                height={100}
                                className="transition-all duration-500 hover:scale-115 hover:drop-shadow-2xl hover:shadow-purple-500/25"
                            />
                        </motion.div>
                        <motion.div
                            className="hidden md:flex items-center justify-center content-center min-h-0"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                            viewport={{ once: true, margin: "-50px" }}
                        >
                            <Image
                                src="/illustration2.png"
                                alt=""
                                width={300}
                                height={300}
                                className="transition-all duration-500 hover:scale-115 hover:drop-shadow-2xl hover:shadow-purple-500/25"
                            />
                        </motion.div>

                    </div>

                    <motion.div
                        id="paragraph"
                        className="font-extralight text-[clamp(1.125rem,2.5vw,1.875rem)] space-y-5 tracking-wide leading-[1.2]"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                        viewport={{ once: true, margin: "-50px" }}
                    >

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                            viewport={{ once: true, margin: "-30px" }}
                        >
                            We believe every business starts with an
                            idea—but only becomes a brand through
                            clarity, structure, and intent.
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                            viewport={{ once: true, margin: "-30px" }}
                        >
                            Our role is to transform raw concepts into
                            market-ready businesses by aligning
                            strategy with human behavior, and
                            translating ideas into brand, marketing,
                            content, and digital systems built to
                            perform through growth, complexity, and
                            scale.
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
                            viewport={{ once: true, margin: "-30px" }}
                        >
                            Through program-led brand strategy,
                            identity systems, content direction, and
                            web infrastructure, we partner with
                            founders and leadership teams to build
                            brands that connect emotionally, operate
                            commercially, and endure over time.
                        </motion.p>

                    </motion.div>

                </div>

            </div>


        </>

    )

}



export default WeBelieveSection