function FooterCard({children , title, className}: {children: React.ReactNode , title: string, className?: string}) {
    return (
        <div className={`text-left w-full bg-[#1a1a1a78] p-5 rounded-2xl border  border-white/10 ${className || ''}`}>
            <p className="font-light text-[clamp(3rem,4vw,4rem)]">{title}</p>
            {children}
        </div>
    )
}

export default FooterCard