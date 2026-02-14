'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

const workJson = {
  "categories": [
    {
      "name": "Websites",
      "items": [
        {
          "imageUrl": "https://picsum.photos/400/400?random=1",
          "title": "Portfolio Site",
          "mediaType": "image",
          "link": {
            "url": "https://example.com/portfolio-site",
            "title": "View Project"
          }
        },
        {
          "imageUrl": "https://picsum.photos/400/400?random=2",
          "title": "E-commerce Platform",
          "mediaType": "image",
          "link": {
            "url": "https://example.com/ecommerce-platform",
            "title": "View Project"
          }
        },
        {
          "imageUrl": "https://picsum.photos/400/400?random=3",
          "title": "Corporate Website",
          "mediaType": "image",
          "link": {
            "url": "https://example.com/corporate-website",
            "title": "View Project"
          }
        }
      ]
    },
    {
      "name": "Branding",
      "items": [
        {
          "imageUrl": "https://picsum.photos/400/400?random=4",
          "title": "Brand Identity",
          "mediaType": "image"
        },
        {
          "imageUrl": "https://picsum.photos/400/400?random=5",
          "title": "Logo Design",
          "mediaType": "image"
        }
      ]
    },
    {
      "name": "Content",
      "items": [
        {
          "imageUrl": "https://picsum.photos/400/400?random=6",
          "title": "Social Media Campaign",
          "mediaType": "image",
          "link": {
            "url": "https://example.com/social-media-campaign",
            "title": "View Project"
          }
        },
        {
          "imageUrl": "/vid.mp4",
          "title": "Video Production",
          "mediaType": "video",
          "link": {
            "url": "https://example.com/video-production",
            "title": "View Project"
          }
        },
        {
          "imageUrl": "https://picsum.photos/400/400?random=8",
          "title": "Content Strategy",
          "mediaType": "image",
          "link": {
            "url": "https://example.com/content-strategy",
            "title": "View Project"
          }
        }
      ]
    }
  ]
}

interface WorkItem {
  imageUrl: string
  title: string
  mediaType: 'image' | 'gif' | 'video'
  link?: {
    url: string
    title: string
  }
}

// Type assertion to ensure the imported data matches our interface
const workData = workJson as { categories: { name: string; items: WorkItem[] }[] }

function OurWorksection() {
  const searchParams = useSearchParams()
  const [activeCategory, setActiveCategory] = useState<string>(() => {
    const categoryFromUrl = searchParams.get('category')
    if (categoryFromUrl) return categoryFromUrl
    return workData.categories[0]?.name || ''
  })
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  const [loadedVideos, setLoadedVideos] = useState<Set<string>>(new Set())

  // Don't render anything if there are no categories
  if (workData.categories.length === 0) {
    return null
  }

  const categories = workData.categories.map(cat => cat.name)

  const activeCategoryData = workData.categories.find(cat => cat.name === activeCategory)
  const filteredItems = activeCategoryData?.items || []

  const handleImageLoad = (imageUrl: string) => {
    setLoadedImages(prev => new Set(prev).add(imageUrl))
  }

  const handleVideoLoad = (videoUrl: string) => {
    setLoadedVideos(prev => new Set(prev).add(videoUrl))
  }

  const handleCategoryChange = (category: string) => {
    if (category === activeCategory) {
      // If clicking the same category, force reload by clearing cache and state
      setLoadedImages(new Set())
      setLoadedVideos(new Set())
      // Force re-render of images to trigger reload
      setTimeout(() => {
        const images = document.querySelectorAll('#work-grid img') as NodeListOf<HTMLImageElement>
        images.forEach(img => {
          const newImg = new Image()
          newImg.src = img.src
          newImg.onload = () => {
            const imageUrl = img.getAttribute('src')
            if (imageUrl) handleImageLoad(imageUrl)
          }
        })
      }, 100)
    } else {
      setLoadedImages(new Set()) // Clear loaded images when switching categories
      setActiveCategory(category)
    }
  }

  // Pre-load first category images on mount
  useEffect(() => {
    const firstCategoryItems = workData.categories[0]?.items || []
    firstCategoryItems.forEach(item => {
      if (item.imageUrl) {
        const img = new Image()
        img.src = item.imageUrl
        img.onload = () => handleImageLoad(item.imageUrl!)
      }
    })
  }, [])

  useEffect(() => {
  const categoryFromUrl = searchParams.get('category')
  if (categoryFromUrl) {
    setActiveCategory(categoryFromUrl)
    setLoadedImages(new Set())
    setLoadedVideos(new Set())
  }
}, [searchParams])


  return (
    <div className="px-5 md:px-20 lg:px-40 space-y-8">
      <h1 className="text-[clamp(1.5rem,11vw,15rem)] font-special-gothic-expanded uppercase">Our Work</h1>
      <div id="filtering-tabs" className="flex flex-wrap gap-2">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => handleCategoryChange(category)}
            className={`px-3 py-1.5 md:px-4 md:py-2 border rounded-full font-light transition-all duration-300 text-xs md:text-sm cursor-pointer ${activeCategory === category
                ? 'bg-gray-200 text-black border-gray-300'
                : 'border-white/30 text-white hover:bg-white/10'
              }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div id="work-grid">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-5 lg:gap-10">
          {filteredItems.map((item, index) => (
            <div key={index} className="aspect-square relative overflow-hidden rounded-lg md:rounded-3xl border border-white/20 group">
              {item.imageUrl ? (
                <>
                  {(item.mediaType === 'video' ? !loadedVideos.has(item.imageUrl) : !loadedImages.has(item.imageUrl)) && (
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center z-20">
                      <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    </div>
                  )}
                  {item.mediaType === 'video' ? (
                    <video
                      src={item.imageUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className={`w-full h-full object-cover transition-all duration-300 ${loadedVideos.has(item.imageUrl) ? 'opacity-100' : 'opacity-0'
                        }`}
                      onLoadedData={() => handleVideoLoad(item.imageUrl!)}
                    />
                  ) : (
                    <img
                      src={item.imageUrl}
                      alt={item.title || 'Work item'}
                      className={`w-full h-full object-cover transition-all duration-300 ${loadedImages.has(item.imageUrl) ? 'opacity-100' : 'opacity-0'
                        }`}
                      onLoad={() => handleImageLoad(item.imageUrl!)}
                    />
                  )}
                </>
              ) : (
                <div className="w-full h-full bg-white/5 flex items-center justify-center">
                  <span className="text-white/50 text-sm">No media</span>
                </div>
              )}
              {item.link && (
                <a
                  href={item.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-2 md:top-4 right-2 md:right-4 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-medium transition-all duration-300 hover:bg-white/20 hover:scale-105 z-10"
                  onClick={(e) => e.stopPropagation()}
                >
                  {item.link.title}
                </a>
              )}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 pointer-events-none">
                <div>
                  <p className="text-white text-sm font-medium">{activeCategory}</p>
                  {item.title && <h3 className="text-white text-lg font-semibold">{item.title}</h3>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OurWorksection