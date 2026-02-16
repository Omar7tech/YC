import FooterCard from './FooterCard'
import Link from 'next/link'
import LoadingIndicator from '@/components/loading-indicator'

function Footer() {
    return (
        <footer className='px-5 md:px-10 lg:px-40 flex flex-col justify-center items-center text-center space-y-5'>
            <div>
                <p className='text-[clamp(2rem,4vw,5rem)] font-extralight'>WeCo-Create®</p>
                <p className='text-[clamp(2rem,4vw,5rem)] font-extralight'>Strategic Brand & Creative Partner</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 w-full mx-auto'>
                <FooterCard title="Home" href="/">
                    <ul className='text-[clamp(1.5rem,2vw,2rem)] font-extralight leading-[1.2] pt-5 overflow-auto'>
                        <li><Link href="/#hero" aria-label="Go to About Us section on Home page" className="hover:text-white/80 transition-colors">About Us<LoadingIndicator /></Link></li>
                        <li><Link href="/#we-believe" aria-label="Go to Our Philosophy section on Home page" className="hover:text-white/80 transition-colors">Our Philosophy<LoadingIndicator /></Link></li>
                        <li><Link href="/#services" aria-label="Go to Our Services section on Home page" className="hover:text-white/80 transition-colors">Our Services<LoadingIndicator /></Link></li>
                        <li><Link href="/#clients" aria-label="Go to Our Clients section on Home page" className="hover:text-white/80 transition-colors">Our Clients<LoadingIndicator /></Link></li>
                    </ul>
                </FooterCard>
                <FooterCard title="Work" href="/work">
                    <ul className='text-[clamp(1.5rem,2vw,2rem)] font-extralight leading-[1.2] pt-5 overflow-auto'>
                        <li><Link href="/work#programs" aria-label="Go to Programs section on Work page" className="hover:text-white/80 transition-colors">Programs<LoadingIndicator /></Link></li>
                        <li><Link href="/work?category=Branding#our-work" aria-label="Go to Branding Projects on Work page" className="hover:text-white/80 transition-colors">Branding<LoadingIndicator /></Link></li>
                        <li><Link href="/work?category=Websites#our-work" aria-label="Go to Website Projects on Work page" className="hover:text-white/80 transition-colors">Websites<LoadingIndicator /></Link></li>
                        <li><Link href="/work?category=Content#our-work" aria-label="Go to Content Projects on Work page" className="hover:text-white/80 transition-colors">Content<LoadingIndicator /></Link></li>
                    </ul>
                </FooterCard>
                <FooterCard title="Contact" href="/contact">
                    <ul className='text-[clamp(1.5rem,2vw,2rem)] font-extralight leading-[1.2] pt-5 overflow-auto'>
                        <li><Link href="tel:+96170075077" className="hover:text-white/80 transition-colors">+961 70 075 077<LoadingIndicator /></Link></li>
                        <li><Link href="mailto:hello@yamencreates.com" className="hover:text-white/80 transition-colors text-[clamp(1.5rem,1vw,1.6rem)]">hello@yamencreates.com<LoadingIndicator /></Link></li>
                        <li><Link aria-label="Visit Yamen Creates on Instagram" href="https://www.instagram.com/yamencreates/" target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors">Instagram<LoadingIndicator /></Link></li>
                        <li><Link aria-label="Visit Yamen Creates on LinkedIn" href="https://www.linkedin.com/company/yamen-creates/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors">LinkedIn<LoadingIndicator /></Link></li>
                    </ul>
                </FooterCard>
            </div>
            <div className='font-extralight text-white/50 py-5'>
                <p>Copyright {new Date().getFullYear()} Yamen Creates. All rights reserved.</p>
            </div>

        </footer>
    )
}

export default Footer