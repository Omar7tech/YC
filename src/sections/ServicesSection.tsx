'use client'
import ServiceCard from "@/components/ServiceCard"
import { motion } from "framer-motion"
import Script from "next/script"

function ServicesSection() {
    const serviceJsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Brand Strategy and Creative Services",
        "description": "Combining art, strategy, and psychology to create compelling storytelling for brands. Strategic brand & creative partnership services.",
        "provider": {
            "@type": "Organization",
            "name": "Yamen Creates",
            "url": "https://yamencreates.com"
        },
        "serviceType": "Brand Strategy",
        "areaServed": "Global",
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Creative Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Branding"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Websites"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Content Creation"
                    }
                }
            ]
        }
    };

    return (
        <section className="relative pt-10">
            <Script
                id="services-jsonld"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(serviceJsonLd)
                }}
            />
            <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-x-70 -top-64 -bottom-64 -left-40 bg-[radial-gradient(ellipse_at_center,rgba(200,42,255,0.50),transparent_70%)] blur-[120px]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
            />

            {/* secondary soft glow for depth */}
            <motion.div
                aria-hidden
                className="max-w-50 max-h-50 pointer-events-none absolute inset-x-50 -top-40 -bottom-40 left-100 bg-[radial-gradient(ellipse_at_center,rgba(130,42,200,0.70),transparent_75%)] blur-[120px]"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                viewport={{ once: true, margin: "-50px" }}
            />

            {/* content */}
            <motion.div
                className="relative mx-auto px-5 md:px-10 lg:px-20"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                        viewport={{ once: true, margin: "0px" }}
                    >
                        <ServiceCard
                            index="01"
                            title="BRND"
                            items={["Strategies", "Identities", "Designs"]}
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        viewport={{ once: true, margin: "0px" }}
                    >
                        <ServiceCard
                            index="02"
                            title="MRKT"
                            items={["Products", "Markets", "Growth"]}
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                        viewport={{ once: true, margin: "0px" }}
                    >
                        <ServiceCard
                            index="03"
                            title="CTNT"
                            items={["Content", "Media", "Sales"]}
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                        viewport={{ once: true, margin: "0px" }}
                    >
                        <ServiceCard
                            index="04"
                            title="DVLP"
                            items={["Websites", "Interface", "Experience"]}
                        />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    )
}

export default ServicesSection
