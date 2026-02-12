'use client'

import { useEffect, useState } from 'react'
import { Save, Plus, Trash2, Upload } from 'lucide-react'

interface ProgramData {
  id: string
  title: string
  description: string
  buttonText: string
  bulletPoints: string[]
  tags: string[]
  images: { src: string; alt: string }[]
}

interface ProgramsData {
  sectionTitle: string
  programs: ProgramData[]
}

export default function ProgramsPage() {
  const [programsData, setProgramsData] = useState<ProgramsData | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchProgramsData()
  }, [])

  const fetchProgramsData = async () => {
    try {
      const res = await fetch('/api/admin?file=programs')
      if (res.ok) setProgramsData(await res.json())
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const saveData = async () => {
    if (!programsData) return
    setLoading(true)
    try {
      const res = await fetch('/api/admin?file=programs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(programsData)
      })
      setMessage(res.ok ? 'Saved successfully!' : 'Error saving')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage('Error saving')
    }
    setLoading(false)
  }

  if (!programsData) return <div className="p-8">Loading...</div>

  return (
    <div className="p-6 lg:p-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Programs</h1>
          <p className="text-white/50">Manage your programs and services</p>
        </div>
        <button
          onClick={saveData}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-semibold disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-xl ${message.includes('Error') ? 'bg-red-600' : 'bg-green-600'}`}>
          {message}
        </div>
      )}

      {/* Section Title */}
      <div className="mb-6">
        <label className="block text-sm text-white/50 mb-2">Section Title</label>
        <input
          type="text"
          value={programsData.sectionTitle}
          onChange={(e) => setProgramsData({ ...programsData, sectionTitle: e.target.value })}
          className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-lg"
        />
      </div>

      {/* Programs List */}
      <div className="space-y-4">
        {programsData.programs.map((program, index) => (
          <div key={program.id} className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    {program.title || `Program ${index + 1}`}
                  </h3>
                  <p className="text-sm text-white/50">ID: {program.id}</p>
                </div>
              </div>
              <button
                onClick={async () => {
                  // Delete all uploaded images associated with this program
                  for (const img of program.images) {
                    if (img.src && img.src.startsWith('/uploads/')) {
                      const filename = img.src.replace('/uploads/', '')
                      try {
                        await fetch(`/api/admin?filename=${encodeURIComponent(filename)}`, {
                          method: 'DELETE'
                        })
                      } catch (error) {
                        console.error('Error deleting image:', error)
                      }
                    }
                  }
                  
                  // Remove program from data
                  const newPrograms = [...programsData.programs]
                  newPrograms.splice(index, 1)
                  setProgramsData({ ...programsData, programs: newPrograms })
                }}
                className="text-red-400 hover:bg-red-500/10 p-2 rounded-lg"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="ID"
                value={program.id}
                onChange={(e) => {
                  const newPrograms = [...programsData.programs]
                  newPrograms[index].id = e.target.value
                  setProgramsData({ ...programsData, programs: newPrograms })
                }}
                className="bg-black/50 border border-white/20 rounded-lg px-3 py-2"
              />
              <input
                type="text"
                placeholder="Title"
                value={program.title}
                onChange={(e) => {
                  const newPrograms = [...programsData.programs]
                  newPrograms[index].title = e.target.value
                  setProgramsData({ ...programsData, programs: newPrograms })
                }}
                className="bg-black/50 border border-white/20 rounded-lg px-3 py-2"
              />
              <input
                type="text"
                placeholder="Button Text"
                value={program.buttonText}
                onChange={(e) => {
                  const newPrograms = [...programsData.programs]
                  newPrograms[index].buttonText = e.target.value
                  setProgramsData({ ...programsData, programs: newPrograms })
                }}
                className="bg-black/50 border border-white/20 rounded-lg px-3 py-2"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm text-white/50 mb-2">Description</label>
              <textarea
                value={program.description}
                onChange={(e) => {
                  const newPrograms = [...programsData.programs]
                  newPrograms[index].description = e.target.value
                  setProgramsData({ ...programsData, programs: newPrograms })
                }}
                rows={3}
                className="w-full bg-black/50 border border-white/20 rounded-lg px-3 py-2"
              />
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-white/50 mb-2">Bullet Points (one per line)</label>
                <textarea
                  value={program.bulletPoints.join('\n')}
                  onChange={(e) => {
                    const newPrograms = [...programsData.programs]
                    newPrograms[index].bulletPoints = e.target.value.split('\n').filter(Boolean)
                    setProgramsData({ ...programsData, programs: newPrograms })
                  }}
                  rows={4}
                  className="w-full bg-black/50 border border-white/20 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-white/50 mb-2">Tags (comma separated)</label>
                <textarea
                  value={program.tags.join(', ')}
                  onChange={(e) => {
                    const newPrograms = [...programsData.programs]
                    newPrograms[index].tags = e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                    setProgramsData({ ...programsData, programs: newPrograms })
                  }}
                  rows={4}
                  className="w-full bg-black/50 border border-white/20 rounded-lg px-3 py-2"
                />
              </div>
            </div>
            {/* Program Images */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm text-white/50">Program Images ({program.images.length})</label>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="sr-only"
                    onChange={async (e) => {
                      const files = e.target.files
                      if (!files) return
                      
                      for (let i = 0; i < files.length; i++) {
                        const file = files[i]
                        const formData = new FormData()
                        formData.append('file', file)
                        
                        try {
                          const res = await fetch('/api/admin?action=upload', {
                            method: 'POST',
                            body: formData
                          })
                          
                          if (res.ok) {
                            const result = await res.json()
                            const newPrograms = [...programsData.programs]
                            newPrograms[index].images.push({
                              src: result.filePath,
                              alt: file.name
                            })
                            setProgramsData({ ...programsData, programs: newPrograms })
                          }
                        } catch (error) {
                          console.error('Upload error:', error)
                        }
                      }
                    }}
                  />
                  <span className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm cursor-pointer">
                    <Upload className="w-4 h-4" />
                    Add Images
                  </span>
                </label>
              </div>
              
              {program.images.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {program.images.map((img, imgIndex) => (
                    <div key={imgIndex} className="relative aspect-square rounded-lg overflow-hidden bg-white/5 group">
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={async () => {
                          // Delete image from folder if it's an upload
                          if (img.src.startsWith('/uploads/')) {
                            const filename = img.src.replace('/uploads/', '')
                            try {
                              await fetch(`/api/admin?filename=${encodeURIComponent(filename)}`, {
                                method: 'DELETE'
                              })
                            } catch (error) {
                              console.error('Error deleting image:', error)
                            }
                          }
                          
                          // Remove from program
                          const newPrograms = [...programsData.programs]
                          newPrograms[index].images.splice(imgIndex, 1)
                          setProgramsData({ ...programsData, programs: newPrograms })
                        }}
                        className="absolute top-2 right-2 p-1.5 bg-red-500/80 hover:bg-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-white/30">No images added yet</p>
              )}
            </div>

          </div>
        ))}

        {/* Add Program Button */}
        <button
          onClick={() => {
            const newProgram: ProgramData = {
              id: `program-${Date.now()}`,
              title: 'New Program',
              description: '',
              buttonText: 'Learn More',
              bulletPoints: [],
              tags: [],
              images: []
            }
            setProgramsData({
              ...programsData,
              programs: [...programsData.programs, newProgram]
            })
          }}
          className="w-full py-4 border-2 border-dashed border-white/20 rounded-xl hover:border-blue-500/50 hover:bg-blue-500/10 transition-all"
        >
          <Plus className="w-6 h-6 mx-auto" />
        </button>
      </div>
    </div>
  )
}
