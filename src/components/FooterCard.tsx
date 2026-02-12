function FooterCard({children , title}: {children: React.ReactNode , title: string}) {
    return (
        <div className="text-left w-full bg-[#1a1a1a78] p-5 rounded-2xl border  border-white/10">
            <p className="font-light text-[clamp(1.5rem,4vw,5rem)]">{title}</p>
            {children}
        </div>
    )
}

export default FooterCard