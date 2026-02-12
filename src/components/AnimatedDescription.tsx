'use client'
import { motion } from "framer-motion"

interface AnimatedDescriptionProps {
  text: string
  delay?: number
}

function AnimatedDescription({ text, delay = 0 }: AnimatedDescriptionProps) {
  return (
    <motion.p
      className="text-white/70 text-sm leading-none text-[clamp(1rem,4vw,1.5rem)] font-extralight"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {text}
    </motion.p>
  )
}

export default AnimatedDescription
