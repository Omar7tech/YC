function FooterCard({children , title, className}: {children: React.ReactNode , title: string, className?: string}) {
    return (
        <div className={`text-left w-full bg-white/5 border-white/[.145] p-5 rounded-2xl border  transition-all duration-500 ease-in-out  ${className || ''}`}>
            <p className="font-light text-[clamp(3rem,4vw,4rem)]">{title}</p>
            {children}
        </div>
    )
}

export default FooterCard