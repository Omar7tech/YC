import Link from 'next/link'; // Assuming you're using Next.js

function FooterCard({children , title, className, href}: {children: React.ReactNode , title: string, className?: string, href?: string}) {
    return (
        <div className={`text-left w-full bg-white/5 border-white/30 p-5 rounded-3xl border-2  transition-all duration-500 ease-in-out  ${className || ''}`}>
            {href ? (
                <Link href={href} className="block">
                    <h2 className="font-light text-[clamp(3rem,4vw,4rem)]">{title}</h2>
                </Link>
            ) : (
                <h2 className="font-light text-[clamp(3rem,4vw,4rem)]">{title}</h2>
            )}
            {children}
        </div>
    )
}

export default FooterCard