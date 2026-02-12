'use client'

import Image from "next/image"
import { useState } from "react"

interface ImageData {
  src: string;
  alt: string;
}

interface ImageWithLoaderProps {
  images: ImageData[];
}

function ImageWithLoader({ images }: ImageWithLoaderProps) {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => new Set(prev).add(index))
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-10 mt-6 md:mt-8">
      {images.map((image, index) => (
        <div key={index} className="aspect-square relative overflow-hidden rounded-lg md:rounded-3xl border border-white/20">
          {!loadedImages.has(index) && (
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center z-10">
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
          )}
          <Image 
            src={image.src} 
            alt={image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 33vw, (max-width: 1200px) 50vw, 33vw"
            onLoadingComplete={() => handleImageLoad(index)}
          />
        </div>
      ))}
    </div>
  )
}

export default ImageWithLoader
