import Image from 'next/image'
import LogoMarquee from '@/components/LogoMarquee'

function Clients() {
    const clientLogos = [
        { src: '/clients/bmw.png', alt: 'BMW' },
        { src: '/clients/continental.png', alt: 'Continental' },
        { src: '/clients/goodmorning.webp', alt: 'Good Morning' },
        { src: '/clients/ittihad.webp', alt: 'Ittihad' },
        { src: '/clients/liwan.webp', alt: 'Liwan' },
    ]

    return (
        <div>
            <div className="px-5 md:px-10 lg:px-20 pt-10 md:pt-20">
                <h1 className="text-center uppercase font-special-gothic-expanded text-[clamp(1.1rem,5.5vw,6rem)] font-extrabold leading-[0.95] mb-10">
                    Clients & Co Creators
                </h1>
            </div>
            <LogoMarquee
                ariaLabel="Client logos"
                gapPx={48}
                durationSec={18}
                pauseOnHover
                items={clientLogos.map(logo => ({
                    key: logo.src,
                    node: (
                        <Image
                            src={logo.src}
                            alt={logo.alt}
                            width={180}
                            height={90}
                            className="h-12 md:h-18 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                        />
                    )
                }))}
            />
        </div>
    )
}

export default Clients