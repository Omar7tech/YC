'use client'

import Image from "next/image"
import { Menu, X } from "lucide-react"
import DecryptedText from "@/components/DecryptedText"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import LoadingIndicator from "./loading-indicator";

const logo = "/yamenlogo.svg"

interface LinkItem {
  name: string;
  href: string;
}

interface NavClientProps {
  links: LinkItem[];
}

export default function NavClient({ links }: NavClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, x: 20 },
    show: { opacity: 1, x: 0 }
  }), []);

  return (
    <>
      <nav role="navigation" aria-label="Main navigation" className="mx-auto fixed z-100 top-0 left-0 right-0 flex content-center justify-between items-center p-5 max-w-[2000px] px-5 md:px-10 lg:px-15 gap-3">
        <Link href="/" aria-label="Go to homepage" className="font-light text-2xl border-solid border-white/[.145] border-2 rounded-full px-4 py-3 backdrop-blur-sm bg-white/10 transition-all duration-300 hover:bg-gray-100 hover:border-gray-300 hover:scale-105 cursor-pointer group">
          <Image
            src={logo}
            alt="yamen logo"
            width={250}
            height={20}
            className="transition-all duration-300 group-hover:brightness-20 group-hover:grayscale"
          />
        </Link>
        <ul className="hidden sm:flex space-x-3">
          {links.map((link) => (
            <li key={link.href}>
              <Link
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
                <LoadingIndicator />
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Burger Menu - Capsule Style */}
        <button type="button" aria-label="Toggle navigation menu" aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="sm:hidden font-light text-2xl border-solid border-white/[.145] border-2 rounded-full px-4 py-3 backdrop-blur-sm bg-white/10 transition-all duration-300 hover:bg-white/10 hover:border-white/5 hover:text-zinc-300 hover:scale-105 cursor-pointer">
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
                id="mobile-menu"
                className="fixed top-22 left-1/2 transform -translate-x-1/2 w-[90%] h-fit overflow-hidden bg-black/20 backdrop-blur-md flex flex-col space-y-4 p-5 rounded-2xl border border-white/10 z-40"
                variants={containerVariants}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "tween", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                {links.map((link) => (
                  <motion.div key={link.href} variants={itemVariants}>
                    <Link
                      className="w-full font-base text-3xl border-solid border-white/[.145] border-2 rounded-full px-6 py-3 backdrop-blur-sm bg-white/10 transition-all duration-300 hover:bg-white/20 hover:border-white/5 hover:text-zinc-300 hover:scale-105 text-left justify-start flex"
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
    </>
  )
}
