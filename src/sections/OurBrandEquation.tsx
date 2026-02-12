'use client'
import { motion } from "framer-motion"

function OurBrandEquation() {
    return (
        <div className='space-y-5 md:space-y-10 px-5 md:px-10 lg:px-20 my-20 md:my-50'>
            <motion.h1
                className="text-center font-special-gothic-expanded font-extrabold text-[clamp(1rem,7.5vw,7rem)] leading-[0.95]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, margin: "-50px" }}
            >
                Our Brand Equation
            </motion.h1>
            <motion.div
                className="bg-white/5 px-5 py-4 md:py-8 rounded-full equation-text"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                viewport={{ once: true, margin: "-30px" }}
            >
                <motion.p
                    className="text-center leading-[1.2] text-[clamp(0.5rem,3.7vw,3.9rem)]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-20px" }}
                >
                    Art + Strategy + Psychology ={" "}
                    <span className="relative inline-block underline-curve">
                        Storytelling
                    </span>
                </motion.p>
            </motion.div>
        </div>
    )
}

export default OurBrandEquation