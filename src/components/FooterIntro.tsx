import { ArrowRight } from 'lucide-react'

function FooterIntro() {
   return (
        <div className='px-5 md:px-10 lg:px-20 py-20 flex justify-center items-center h-screen'>
            <div>
                <div id='footer-title' className='font-bold text-[clamp(2rem,7vw,30rem)] leading-none'>
                    <p> All This, And It</p>
                    <p> Still Feels Unclear?</p>
                </div>
                <div className="flex  flex-row gap-3 pt-5">
                    <button className="px-6 py-3 border border-white/30 rounded-full text-white font-light hover:bg-white/10 transition-all duration-300 flex items-center justify-between gap-2">
                        Find Your Program
                        <ArrowRight className="w-4 h-4" />
                    </button>
                    <button className="px-6 py-3 border border-white/30 rounded-full text-white font-light hover:bg-white/10 transition-all duration-300 flex items-center justify-between gap-2">
                        Let's Talk
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FooterIntro