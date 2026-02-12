'use client';

import Image from "next/image"
import { Menu, X } from "lucide-react"
import DecryptedText from "@/components/DecryptedText"
import Link from "next/link"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

const logo = "/yamenlogo.svg"
const links = [
    { name: "Home", href: "/" },
    { name: "Work", href: "/work" },
    { name: "Contact", href: "/contact" },
]

function Nav() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: 20 },
        show: { opacity: 1, x: 0 }
    };

    return (
        <nav className="mx-auto fixed z-50 top-0 left-0 right-0 flex content-center justify-between items-center p-5 max-w-[2000px] px-5 md:px-10 lg:px-15 gap-3">
            <div className="font-light text-2xl border-solid border-white/[.145] border-2 rounded-full px-4 py-3 backdrop-blur-sm bg-white/10 transition-all duration-300 hover:bg-gray-100 hover:border-gray-300 hover:scale-105 cursor-pointer group">
                <Image 
                    src={logo} 
                    alt="yamen logo" 
                    width={250} 
                    height={20} 
                    className="transition-all duration-300 group-hover:brightness-20 group-hover:grayscale"
                />
            </div>
            <div className="hidden sm:flex space-x-3">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        className="font-light text-2xl border-solid border-white/[.145] border-2 rounded-full px-4 py-2 backdrop-blur-sm bg-white/5 transition-all duration-300 hover:bg-white/10 hover:border-white/5 hover:text-zinc-300 hover:scale-105" 
                        href={link.href}
                    >
                        <DecryptedText
                            text={link.name}
                            animateOn="hover"
                            speed={50}
                            revealDirection="start"
                            sequential
                            useOriginalCharsOnly={false}
                        />
                    </Link>
                ))}
            </div>

            {/* Mobile Burger Menu - Capsule Style */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="sm:hidden font-light text-2xl border-solid border-white/[.145] border-2 rounded-full px-4 py-3 backdrop-blur-sm bg-white/5 transition-all duration-300 hover:bg-white/10 hover:border-white/5 hover:text-zinc-300 hover:scale-105 cursor-pointer">
                <motion.div animate={{ rotate: mobileMenuOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </motion.div>
            </button>
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Invisible overlay to close on outside click */}
                        <div
                            className="fixed inset-0 z-39"
                            onClick={() => setMobileMenuOpen(false)}
                        />
                        <motion.div
                            className="fixed top-22 left-5 right-5 z-40 flex flex-col space-y-4"
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {links.map((link) => (
                                <motion.div key={link.href} variants={itemVariants}>
                                    <Link
                                        className="w-full font-base text-3xl border-solid border-white/[.145] border-2 rounded-full px-6 py-3 backdrop-blur-xl bg-white/10 transition-all duration-300 hover:bg-white/20 hover:border-white/5 hover:text-zinc-300 hover:scale-105 text-left justify-start flex"
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <DecryptedText
                                            text={link.name}
                                            speed={50}
                                            revealDirection="start"
                                            sequential
                                            useOriginalCharsOnly={false}
                                        />
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    )
}

export default Nav