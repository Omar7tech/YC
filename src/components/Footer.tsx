
import FooterCard from './FooterCard'
import Link from 'next/link'

function Footer() {
    return (
        <div className='px-5 md:px-10 lg:px-40 flex flex-col justify-center items-center text-center space-y-5'>
            <div className=''>
                <p className='text-[clamp(2rem,4vw,5rem)] font-extralight'>WeCo-Create®</p>
                <p className='text-[clamp(2rem,4vw,5rem)] font-extralight'>Strategic Brand & Creative Partner</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-7 gap-5 w-full mx-auto'>
                <FooterCard title="Home" className='col-span-1 md:col-span-2'>
                    <ul className='text-[clamp(1.5rem,2vw,2rem)] font-extralight leading-[1.2] pt-5'>
                        <li><Link href="/#hero" className="hover:text-white/80 transition-colors">About</Link></li>
                        <li><Link href="/#we-believe" className="hover:text-white/80 transition-colors">We</Link></li>
                        <li><Link href="/#services" className="hover:text-white/80 transition-colors">Services</Link></li>
                        <li><Link href="/#clients" className="hover:text-white/80 transition-colors">Clients</Link></li>
                    </ul>
                </FooterCard>
                <FooterCard title="Work" className='col-span-1 md:col-span-2'>
                    <ul className='text-[clamp(1.5rem,2vw,2rem)] font-extralight leading-[1.2] pt-5'>
                        <li><Link href="/work#programs" className="hover:text-white/80 transition-colors">Programs</Link></li>
                        <li><Link href="/work?category=Branding#our-work" className="hover:text-white/80 transition-colors">Branding</Link></li>
                        <li><Link href="/work?category=Websites#our-work" className="hover:text-white/80 transition-colors">Websites</Link></li>
                        <li><Link href="/work?category=Content#our-work" className="hover:text-white/80 transition-colors">Content</Link></li>
                    </ul>
                </FooterCard>
                <FooterCard title="Contact" className='col-span-1 md:col-span-3'>
                    <ul className='text-[clamp(1.5rem,2vw,2rem)] font-extralight leading-[1.2] pt-5'>
                        <li><Link href="tel:+96170075077" className="hover:text-white/80 transition-colors">+961 70 075 077</Link></li>
                        <li><Link href="mailto:hello@yamencreates.com" className="hover:text-white/80 transition-colors">hello@yamencreates.com</Link></li>
                        <li><Link href="https://www.instagram.com/yamencreates/" target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors">Instagram</Link></li>
                        <li><Link href="https://www.linkedin.com/company/yamen-creates/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="hover:text-white/80 transition-colors">LinkedIn</Link></li>
                    </ul>
                </FooterCard>
            </div>
            <div className='font-extralight text-white/50 py-5'>
                <p>Copyright {new Date().getFullYear()} Yamen Creates. All rights reserved.</p>
            </div>

        </div>
    )
}

export default Footer