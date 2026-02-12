import { ArrowRight } from 'lucide-react'
import React from 'react'

function Footer() {
    return (
        <div className='flex flex-col justify-center items-center text-center space-y-5'>
            <div className=''>
                <p className='text-[clamp(2rem,4vw,5rem)] font-extralight'>WeCo-Create®</p>
                <p className='text-[clamp(2rem,4vw,5rem)] font-extralight'>Strategic Brand & Creative Partner</p>
            </div>
            <div className='font-extralight text-white/50'>
                <p>Copyright © {new Date().getFullYear()} Yamen Creates. All rights reserved.</p>
            </div>
            <div className='flex flex-row gap-5'>
                <div>
                    
                </div>
            </div>
        </div>
    )
}

export default Footer