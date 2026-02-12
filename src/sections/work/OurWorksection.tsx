function OurWorksection() {
  return (
    <div className="px-5 md:px-20 lg:px-40 space-y-8">
        <h1 className="text-[clamp(1.5rem,11vw,15rem)] font-special-gothic-expanded uppercase">Our Work</h1>
        <div id="filtering-tabs" className="flex flex-wrap gap-2">
            <button className="px-3 py-1.5 md:px-4 md:py-2 border border-white/30 rounded-full text-white font-light hover:bg-white/10 transition-all duration-300 text-xs md:text-sm cursor-pointer">Branding</button>
            <button className="px-3 py-1.5 md:px-4 md:py-2 border border-white/30 rounded-full text-white font-light hover:bg-white/10 transition-all duration-300 text-xs md:text-sm cursor-pointer">Websites</button>
            <button className="px-3 py-1.5 md:px-4 md:py-2 border border-white/30 rounded-full text-white font-light hover:bg-white/10 transition-all duration-300 text-xs md:text-sm cursor-pointer">Content</button>
        </div>
        <div id="work-grid">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-10">
                <div className="aspect-square relative overflow-hidden rounded-lg md:rounded-3xl border border-white/20">
                    
                </div>
                <div className="aspect-square relative overflow-hidden rounded-lg md:rounded-3xl border border-white/20">
                    
                </div>
                <div className="aspect-square relative overflow-hidden rounded-lg md:rounded-3xl border border-white/20">
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default OurWorksection