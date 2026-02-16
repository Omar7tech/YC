function FooterCard({children , title, className}: {children: React.ReactNode , title: string, className?: string}) {
    return (
        <div className={`text-left w-full bg-[#1a1a1a78] p-5 rounded-2xl border border-white/10 transition-all duration-500 ease-in-out hover:border-[rgba(200,42,255,0.3)] hover:shadow-[0_0_10px_rgba(200,42,255,0.2)] ${className || ''}`}>
            <p className="font-light text-[clamp(3rem,4vw,4rem)]">{title}</p>
            {children}
        </div>
    )
}

export default FooterCard