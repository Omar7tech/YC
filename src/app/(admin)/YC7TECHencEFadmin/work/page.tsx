'use client'

import { useEffect, useState } from 'react'
import { Plus, Trash2, ChevronDown, ChevronRight, Save, Upload, Eye } from 'lucide-react'

interface WorkItem {
  imageUrl?: string
  title?: string
  link?: {
    url: string
    title: string
  }
}

interface Category {
  name: string
  items: WorkItem[]
}

interface WorkData {
  categories: Category[]
}

export default function WorkPage() {
  const [workData, setWorkData] = useState<WorkData | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set([0]))
  const [uploadingFile, setUploadingFile] = useState<{ catIndex: number; itemIndex: number } | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  useEffect(() => {
    fetchWorkData()
  }, [])

  const fetchWorkData = async () => {
    try {
      const res = await fetch('/api/admin?file=work')
      if (res.ok) setWorkData(await res.json())
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const saveData = async () => {
    if (!workData) return
    setLoading(true)
    try {
      const res = await fetch('/api/admin?file=work', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workData)
      })
      setMessage(res.ok ? 'Saved successfully!' : 'Error saving')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage('Error saving')
    }
    setLoading(false)
  }

  const updateCategory = (index: number, name: string) => {
    if (!workData) return
    const newData = { ...workData }
    newData.categories[index].name = name
    setWorkData(newData)
  }

  const addItem = (catIndex: number) => {
    if (!workData) return
    const newData = { ...workData }
    newData.categories[catIndex].items.push({
      imageUrl: '',
      title: 'New Item',
      link: { url: '', title: 'View Project' }
    })
    setWorkData(newData)
  }

  const removeItem = async (catIndex: number, itemIndex: number) => {
    if (!workData) return
    
    // Get the item being deleted
    const item = workData.categories[catIndex].items[itemIndex]
    
    // Check if item has an uploaded image and delete it
    if (item.imageUrl && item.imageUrl.startsWith('/uploads/')) {
      const filename = item.imageUrl.replace('/uploads/', '')
      try {
        await fetch(`/api/admin?filename=${encodeURIComponent(filename)}`, {
          method: 'DELETE'
        })
      } catch (error) {
        console.error('Error deleting image:', error)
      }
    }
    
    // Remove item from data
    const newData = { ...workData }
    newData.categories[catIndex].items.splice(itemIndex, 1)
    setWorkData(newData)
  }

  const updateItem = (catIndex: number, itemIndex: number, field: string, value: string) => {
    if (!workData) return
    const newData = { ...workData }
    const item = newData.categories[catIndex].items[itemIndex]
    
    if (field.startsWith('link.')) {
      const linkField = field.split('.')[1]
      if (!item.link) item.link = { url: '', title: 'View Project' }
      item.link[linkField as keyof typeof item.link] = value
    } else {
      (item as any)[field] = value
    }
    
    setWorkData(newData)
  }

  const toggleCategory = (index: number) => {
    const newSet = new Set(expandedCategories)
    if (newSet.has(index)) newSet.delete(index)
    else newSet.add(index)
    setExpandedCategories(newSet)
  }

  const handleImageUpload = async (catIndex: number, itemIndex: number, file: File) => {
    if (!file) return
    setUploadingFile({ catIndex, itemIndex })
    
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const res = await fetch('/api/admin?action=upload', {
        method: 'POST',
        body: formData
      })
      
      if (res.ok) {
        const result = await res.json()
        updateItem(catIndex, itemIndex, 'imageUrl', result.filePath)
        setMessage(`Uploaded: ${result.fileName}`)
      }
    } catch (error) {
      setMessage('Upload failed')
    }
    
    setUploadingFile(null)
    setTimeout(() => setMessage(''), 3000)
  }

  if (!workData) return <div className="p-8">Loading...</div>

  return (
    <div className="p-6 lg:p-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Work Section</h1>
          <p className="text-white/50">Manage your portfolio items</p>
        </div>
        <button
          onClick={saveData}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold disabled:opacity-50"
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

      {/* Categories */}
      <div className="space-y-4">
        {workData.categories.map((category, catIndex) => (
          <div key={catIndex} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <button
              onClick={() => toggleCategory(catIndex)}
              className="w-full flex items-center justify-between p-6 hover:bg-white/5"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold">
                  {catIndex + 1}
                </div>
                <input
                  type="text"
                  value={category.name}
                  onChange={(e) => updateCategory(catIndex, e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-transparent text-xl font-semibold border-b-2 border-transparent focus:border-purple-500 outline-none px-2"
                />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-white/50">{category.items.length} items</span>
                {expandedCategories.has(catIndex) ? <ChevronDown /> : <ChevronRight />}
              </div>
            </button>

            {expandedCategories.has(catIndex) && (
              <div className="p-6 pt-0 border-t border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="bg-white/5 rounded-xl p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/50">Item {itemIndex + 1}</span>
                        <button onClick={() => removeItem(catIndex, itemIndex)} className="text-red-400 hover:bg-red-500/10 p-2 rounded-lg">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Image Upload */}
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Image URL"
                            value={item.imageUrl || ''}
                            onChange={(e) => updateItem(catIndex, itemIndex, 'imageUrl', e.target.value)}
                            className="flex-1 bg-black/50 border border-white/20 rounded-lg px-3 py-2 text-sm"
                          />
                          <label className="cursor-pointer">
                            <input
                              type="file"
                              accept="image/*"
                              className="sr-only"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) handleImageUpload(catIndex, itemIndex, file)
                              }}
                            />
                            <span className={`flex items-center px-3 py-2 rounded-lg text-sm ${
                              uploadingFile?.catIndex === catIndex && uploadingFile?.itemIndex === itemIndex
                                ? 'bg-yellow-600' : 'bg-purple-600 hover:bg-purple-700'
                            }`}>
                              <Upload className="w-4 h-4" />
                            </span>
                          </label>
                        </div>
                        
                        {item.imageUrl && (
                          <div 
                            className="relative h-32 rounded-lg overflow-hidden cursor-pointer group"
                            onClick={() => setPreviewImage(item.imageUrl!)}
                          >
                            <img src={item.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                              <Eye className="w-6 h-6" />
                            </div>
                          </div>
                        )}
                      </div>

                      <input
                        type="text"
                        placeholder="Title"
                        value={item.title || ''}
                        onChange={(e) => updateItem(catIndex, itemIndex, 'title', e.target.value)}
                        className="w-full bg-black/50 border border-white/20 rounded-lg px-3 py-2 text-sm"
                      />

                      <div className="space-y-2 pt-2 border-t border-white/10">
                        <input
                          type="text"
                          placeholder="Link URL"
                          value={item.link?.url || ''}
                          onChange={(e) => updateItem(catIndex, itemIndex, 'link.url', e.target.value)}
                          className="w-full bg-black/50 border border-white/20 rounded-lg px-3 py-2 text-sm"
                        />
                        <input
                          type="text"
                          placeholder="Button Text"
                          value={item.link?.title || ''}
                          onChange={(e) => updateItem(catIndex, itemIndex, 'link.title', e.target.value)}
                          className="w-full bg-black/50 border border-white/20 rounded-lg px-3 py-2 text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => addItem(catIndex)}
                  className="mt-4 w-full py-4 border-2 border-dashed border-white/20 rounded-xl hover:border-purple-500/50 hover:bg-purple-500/10 transition-all text-white/60"
                >
                  <Plus className="w-5 h-5 mx-auto" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={() => setPreviewImage(null)}>
          <img src={previewImage} alt="Preview" className="max-w-full max-h-full rounded-lg" />
        </div>
      )}
    </div>
  )
}
