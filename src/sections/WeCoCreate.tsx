'use client'
import Antigravity from "@/components/Antigravity"
import { motion } from "framer-motion"

function WeCoCreate() {
    return (
        <div className="   font-extralight text-[clamp(1rem,20vw,20rem)] leading-[0.85] relative mb-35 ">
            {/* Animation - only visible on desktop */}
            <motion.div
                className="hidden md:block"
                style={{ width: '100%', height: '400px', position: 'relative' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: true, margin: "-100px" }}
            >
                <Antigravity
                    count={300}
                    magnetRadius={6}
                    ringRadius={7}
                    waveSpeed={0.4}
                    waveAmplitude={1}
                    particleSize={1.5}
                    lerpSpeed={0.05}
                    color="#C82AFF"
                    autoAnimate={false}
                    particleVariance={1}
                    rotationSpeed={0}
                    depthFactor={1}
                    pulseSpeed={3}
                    particleShape="sphere"
                    fieldStrength={10}
                />


                <div className="px-5 md:px-10 lg:px-20 absolute inset-0 flex flex-col justify-center z-10 pointer-events-none">
                    <motion.h1
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="transform-gpu"
                    >
                        WeCo
                    </motion.h1>
                    <motion.h1
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="transform-gpu"
                    >
                        -Create <span className="text-white ">®</span>
                    </motion.h1>
                </div>
            </motion.div>
            
            {/* Text only - only visible on mobile */}
            <div className="px-5 md:px-10 lg:px-20 md:hidden">
                <motion.h1
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-30px" }}
                    className="transform-gpu"
                >
                    WeCo
                </motion.h1>
                <motion.h1
                    initial={{ opacity: 0, y: 30, rotateX: -15 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-30px" }}
                    className="transform-gpu"
                >
                    -Create <span className="text-white/50 ">®</span>
                </motion.h1>
            </div>
        </div>
    )
}

export default WeCoCreate