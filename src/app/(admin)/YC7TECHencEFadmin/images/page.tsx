'use client'

import { useEffect, useState } from 'react'
import { Upload, Trash2, Copy, Check, Image as ImageIcon, Video } from 'lucide-react'

export default function ImagesPage() {
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [copiedPath, setCopiedPath] = useState<string | null>(null)

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      const res = await fetch('/api/admin?file=uploads')
      if (res.ok) {
        const data = await res.json()
        setImages(data.images || [])
      }
    } catch (error) {
      console.error('Error fetching images:', error)
    }
  }

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    
    setUploading(true)
    let successCount = 0
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      try {
        const formData = new FormData()
        formData.append('file', file)
        
        const res = await fetch('/api/admin?action=upload', {
          method: 'POST',
          body: formData
        })
        
        if (res.ok) {
          successCount++
        }
      } catch (error) {
        console.error('Upload error:', error)
      }
    }
    
    if (successCount > 0) {
      setMessage(`${successCount} file(s) uploaded successfully!`)
      fetchImages()
    } else {
      setMessage('Error uploading files')
    }
    
    setUploading(false)
    setTimeout(() => setMessage(''), 3000)
  }

  const deleteImage = async (filename: string) => {
    if (!confirm(`Are you sure you want to delete "${filename}"?`)) return
    
    try {
      const res = await fetch(`/api/admin?filename=${encodeURIComponent(filename)}`, {
        method: 'DELETE'
      })
      
      if (res.ok) {
        setImages(prev => prev.filter(img => img !== filename))
        setMessage('Image deleted successfully')
      } else {
        setMessage('Error deleting image')
      }
    } catch (error) {
      console.error('Delete error:', error)
      setMessage('Error deleting image')
    }
    
    setTimeout(() => setMessage(''), 3000)
  }

  const copyPath = (path: string) => {
    navigator.clipboard.writeText(path)
    setCopiedPath(path)
    setTimeout(() => setCopiedPath(null), 2000)
  }

  return (
    <div className="p-6 lg:p-0">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Media Gallery</h1>
        <p className="text-white/50">Upload and manage your images, videos, and GIFs</p>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-xl ${message.includes('Error') ? 'bg-red-600' : 'bg-green-600'}`}>
          {message}
        </div>
      )}

      {/* Upload Area */}
      <div className="mb-8">
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-white/20 rounded-2xl cursor-pointer hover:border-purple-500/50 hover:bg-purple-500/5 transition-all group">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploading ? (
              <div className="w-12 h-12 border-4 border-white/20 border-t-purple-500 rounded-full animate-spin mb-4" />
            ) : (
              <Upload className="w-12 h-12 mb-4 text-white/40 group-hover:text-purple-400 transition-colors" />
            )}
            <p className="mb-2 text-lg text-white/60 group-hover:text-white">
              {uploading ? 'Uploading...' : 'Click to upload media'}
            </p>
            <p className="text-xs text-white/40">PNG, JPG, WebP, GIF, MP4, WebM up to 50MB</p>
          </div>
          <input
            type="file"
            className="sr-only"
            accept="image/*,video/*,.gif"
            multiple
            onChange={(e) => handleUpload(e.target.files)}
            disabled={uploading}
          />
        </label>
      </div>

      {/* Images Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Uploaded Media 
          <span className="text-white/50 text-sm ml-2">({images.length})</span>
        </h2>
        
        {images.length === 0 ? (
          <div className="text-center py-12 text-white/40">
            <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p>No media uploaded yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {images.map((filename) => {
              const imagePath = `/uploads/${filename}`
              const isVideo = /\.(mp4|webm|mov|avi|mkv)$/i.test(filename)
              const isGif = /\.gif$/i.test(filename)
              
              return (
                <div key={filename} className="group relative aspect-square rounded-xl overflow-hidden bg-white/5 border border-white/10">
                  {isVideo ? (
                    <video
                      src={imagePath}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <img
                      src={imagePath}
                      alt={filename}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                  )}
                  
                  {/* Media Type Badge */}
                  <div className="absolute top-2 left-2">
                    {isVideo && (
                      <div className="bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
                        <Video className="w-3 h-3 text-white" />
                        <span className="text-xs text-white">Video</span>
                      </div>
                    )}
                    {isGif && (
                      <div className="bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg">
                        <span className="text-xs text-white">GIF</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-xs text-white/80 truncate mb-2">{filename}</p>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => copyPath(imagePath)}
                          className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-xs"
                        >
                          {copiedPath === imagePath ? (
                            <>
                              <Check className="w-3 h-3" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              Copy Path
                            </>
                          )}
                        </button>
                        
                        <button
                          onClick={() => deleteImage(filename)}
                          className="p-1.5 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Usage Info */}
      <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
        <h3 className="font-semibold mb-2">How to use uploaded media</h3>
        <p className="text-sm text-white/60 mb-2">
          Copy media path and paste it in Work or Programs editor.
        </p>
        <code className="text-xs bg-black/50 px-2 py-1 rounded">
          /uploads/filename.jpg
        </code>
      </div>
    </div>
  )
}
