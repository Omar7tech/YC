import Image from 'next/image'
import React from 'react'
import { ProjectCard } from '@/types/recentlyCreated'

const projectData: ProjectCard[] = [
  { id: 1, image: '/bento-img1.webp', alt: 'More than a story', title: 'More than a story', description: 'A legacy is born' },
  { id: 2, image: '/bento-img2.webp', alt: 'Lebanese Roasters', title: 'Lebanese Roasters', description: 'www.yamencreates.com' },
  { id: 3, image: '/bento-img3.webp', alt: 'Dalia Abi Hussein', title: 'Dalia Abi Hussein', description: 'makeup artist brand known for elevating beauty through creativity, precision, and personalized artistry.' },
  { id: 4, image: '/bento-img4.webp', alt: 'LeMah', title: 'LeMah', description: 'Premium leather goods and accessories' },
  { id: 5, image: '/bento-img5.webp', alt: 'STONE HOUSE', title: 'STONE HOUSE', description: 'Here to Take Care of It' },
  { id: 6, image: '/bento-img6.webp', alt: 'Makeup Artist', title: 'Makeup Artist', description: 'Professional makeup services and brand consultation' }
]

const layout = [
  { index: 0, colSpan: 'col-span-1' },
  { index: 1, colSpan: 'col-span-1' },
  { index: 2, colSpan: 'col-span-5' },
  { index: 5, colSpan: 'col-span-1' },
  { index: 4, colSpan: 'col-span-1' },
  { index: 3, colSpan: 'col-span-5' }
]

function ProjectTile({ project, colSpan }: { project: ProjectCard; colSpan: string }) {
  return (
    <div
      className={`${colSpan} relative h-[150px] md:h-[320px] overflow-hidden rounded-lg md:rounded-4xl 
      border border-white/[.145] hover:-translate-y-0.5 
      hover:shadow-[0_8px_25px_rgba(147,51,234,0.3)] hover:border-purple-500/50 transition-all duration-300`}
    >
      <Image
        src={project.image}
        alt={project.alt}
        fill
        className="object-cover"
      />
    </div>
  )
}

export default function RecentlyCreated() {
  return (
    <div className="px-5 md:px-10 lg:px-20 pt-8 md:pt-20">
      <h1 className="uppercase font-special-gothic-expanded text-[clamp(1rem,6vw,6rem)] font-extrabold leading-[0.95] mb-6">
        Recently Created
      </h1>

      <div className="grid grid-cols-7 gap-1 md:gap-3">
        {layout.map(({ index, colSpan }) => (
          <ProjectTile
            key={projectData[index].id}
            project={projectData[index]}
            colSpan={colSpan}
          />
        ))}
      </div>
    </div>
  )
}
