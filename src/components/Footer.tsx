
import FooterCard from './FooterCard'

function Footer() {
    return (
        <div className='px-5 md:px-10 lg:px-20 flex flex-col justify-center items-center text-center space-y-5'>
            <div className=''>
                <p className='text-[clamp(2rem,4vw,5rem)] font-extralight'>WeCo-Create®</p>
                <p className='text-[clamp(2rem,4vw,5rem)] font-extralight'>Strategic Brand & Creative Partner</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 w-full mx-auto'>
                <FooterCard title="Home">
                    this is home
                </FooterCard>
                <FooterCard title="Work">
                    this is work
                </FooterCard>
                <FooterCard title="Contact">
                    this is contact from latest push
                </FooterCard>
            </div>
            <div className='font-extralight text-white/50'>
                <p>Copyright © {new Date().getFullYear()} Yamen Creates. All rights reserved.</p>
            </div>

        </div>
    )
}

export default Footer