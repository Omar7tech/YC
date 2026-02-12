type ServiceCardProps = {
  index: string
  title: string
  items: string[]
}
function ServiceCard({ index, title, items }: ServiceCardProps) {
  return (
    <div className="relative group">
      {/* card glow - simplified */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-[2.5rem] bg-purple-500/20 blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-200"
      />
      {/* card - optimized */}
      <div
        className="relative bg-[#262626] rounded-[2.5rem] px-10 py-14 min-h-fit flex flex-col justify-between border-2 border-transparent [background:linear-gradient(#262626,#262626)_padding-box,linear-gradient(135deg,#d8b4fe_0%,#d8b4fe_25%,#a855f7_75%,#a855f7_100%)_border-box] shadow-[0_0_40px_rgba(168,85,247,0.45)] transition-all duration-200 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_4px_60px_rgba(168,85,247,0.55)]"
      >
        {/* title with index */}
        <div className="flex items-start justify-between">
          <h2 className="font-extrabold tracking-tight text-white text-[clamp(2.5rem,5vw,4rem)]">
            {title}
          </h2>
          <span className="text-md text-white/70 mt-2 font-extralight">
            {index}
          </span>
        </div>
        {/* list */}
        <ul className="font-extralight uppercase text-white/80 text-xl leading-none">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
export default ServiceCard