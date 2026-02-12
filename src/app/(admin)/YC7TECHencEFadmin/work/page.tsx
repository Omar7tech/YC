'use client'

import { useEffect, useState } from 'react'
import { Save, Plus, Trash2, Upload, Eye, GripVertical, ChevronDown, ChevronRight } from 'lucide-react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface WorkItem {
  imageUrl?: string
  title?: string
  mediaType?: 'image' | 'gif' | 'video'
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
  const [workData, setWorkData] = useState<WorkData>({ categories: [] })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set([0]))
  const [uploadingFile, setUploadingFile] = useState<{ catIndex: number; itemIndex: number } | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [initialLoading, setInitialLoading] = useState(true)

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // Handle drag end for categories and items
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    // Handle category reordering
    if (activeId.startsWith('category-') && overId.startsWith('category-')) {
      const activeIndex = parseInt(activeId.replace('category-', ''))
      const overIndex = parseInt(overId.replace('category-', ''))

      if (activeIndex !== overIndex) {
        const newCategories = arrayMove(workData.categories, activeIndex, overIndex)
        setWorkData({ ...workData, categories: newCategories })
      }
      return
    }

    // Handle item reordering within categories
    if (activeId.startsWith('item-') && overId.startsWith('item-')) {
      const [activeCatIndex, activeItemIndex] = activeId.replace('item-', '').split('-').map(Number)
      const [overCatIndex, overItemIndex] = overId.replace('item-', '').split('-').map(Number)

      if (activeCatIndex === overCatIndex) {
        // Same category - reorder items
        const category = workData.categories[activeCatIndex]
        const newItems = arrayMove(category.items, activeItemIndex, overItemIndex)
        const newCategories = [...workData.categories]
        newCategories[activeCatIndex] = { ...category, items: newItems }
        setWorkData({ ...workData, categories: newCategories })
      } else {
        // Different categories - move item between categories
        const sourceCategory = workData.categories[activeCatIndex]
        const destCategory = workData.categories[overCatIndex]
        const item = sourceCategory.items[activeItemIndex]

        // Remove from source
        const newSourceItems = sourceCategory.items.filter((_, index) => index !== activeItemIndex)

        // Add to destination
        const newDestItems = [...destCategory.items]
        newDestItems.splice(overItemIndex, 0, item)

        const newCategories = [...workData.categories]
        newCategories[activeCatIndex] = { ...sourceCategory, items: newSourceItems }
        newCategories[overCatIndex] = { ...destCategory, items: newDestItems }

        setWorkData({ ...workData, categories: newCategories })
      }
      return
    }
  }

  useEffect(() => {
    fetchWorkData()
  }, [])

  const fetchWorkData = async () => {
    try {
      const res = await fetch('/api/admin?file=work')
      if (res.ok) setWorkData(await res.json())
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setInitialLoading(false)
    }
  }

  const saveData = async () => {
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
    const newData = { ...workData }
    newData.categories[index].name = name
    setWorkData(newData)
  }

  const addItem = (catIndex: number) => {
    const newData = { ...workData }
    newData.categories[catIndex].items.push({
      imageUrl: '',
      title: 'New Item',
      mediaType: 'image',
      link: { url: '', title: 'View Project' }
    })
    setWorkData(newData)
  }

  const removeItem = async (catIndex: number, itemIndex: number) => {
    
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
        
        // Auto-detect media type based on file extension
        const extension = file.name.split('.').pop()?.toLowerCase()
        let mediaType: 'image' | 'gif' | 'video' = 'image'
        
        if (extension === 'gif') {
          mediaType = 'gif'
        } else if (['mp4', 'webm', 'mov', 'avi', 'mkv'].includes(extension || '')) {
          mediaType = 'video'
        }
        
        updateItem(catIndex, itemIndex, 'mediaType', mediaType)
        setMessage(`Uploaded: ${result.fileName}`)
      }
    } catch (error) {
      setMessage('Upload failed')
    }
    
    setUploadingFile(null)
    setTimeout(() => setMessage(''), 3000)
  }

  if (initialLoading) return <div className="p-8">Loading...</div>

  // Sortable Category Component
  function SortableCategory({ category, catIndex }: { category: Category, catIndex: number }) {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: `category-${catIndex}` })

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
    }

    return (
      <div ref={setNodeRef} style={style} {...attributes}>
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <button
            onClick={() => toggleCategory(catIndex)}
            className="w-full flex items-center justify-between p-6 hover:bg-white/5"
          >
            <div className="flex items-center gap-4">
              {/* Drag Handle */}
              <button
                {...listeners}
                className="p-1 hover:bg-white/10 rounded cursor-grab active:cursor-grabbing"
                aria-label="Drag to reorder category"
              >
                <GripVertical className="w-4 h-4" />
              </button>

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
              <SortableItemList category={category} catIndex={catIndex} />
            </div>
          )}
        </div>
      </div>
    )
  }

  // Sortable Item List Component
  function SortableItemList({ category, catIndex }: { category: Category, catIndex: number }) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
        <SortableContext items={category.items.map((_, itemIndex) => `item-${catIndex}-${itemIndex}`)} strategy={verticalListSortingStrategy}>
          {category.items.map((item, itemIndex) => (
            <SortableItem
              key={`item-${catIndex}-${itemIndex}`}
              item={item}
              catIndex={catIndex}
              itemIndex={itemIndex}
            />
          ))}
        </SortableContext>
      </div>
    )
  }

  // Sortable Item Component
  function SortableItem({ item, catIndex, itemIndex }: { item: WorkItem, catIndex: number, itemIndex: number }) {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: `item-${catIndex}-${itemIndex}` })

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
    }

    return (
      <div ref={setNodeRef} style={style} className="bg-white/5 rounded-xl p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Drag Handle */}
            <button
              {...listeners}
              {...attributes}
              className="p-1 hover:bg-white/10 rounded cursor-grab active:cursor-grabbing"
              aria-label="Drag to reorder item"
            >
              <GripVertical className="w-3 h-3" />
            </button>
            <span className="text-sm text-white/50">Item {itemIndex + 1}</span>
          </div>
          <button onClick={() => removeItem(catIndex, itemIndex)} className="text-red-400 hover:bg-red-500/10 p-2 rounded-lg">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Media Upload */}
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Media URL"
              value={item.imageUrl || ''}
              onChange={(e) => updateItem(catIndex, itemIndex, 'imageUrl', e.target.value)}
              className="flex-1 bg-black/50 border border-white/20 rounded-lg px-3 py-2 text-sm"
            />
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*,video/*,.gif"
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
              {item.mediaType === 'video' ? (
                <video 
                  src={item.imageUrl} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img src={item.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              )}
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

        {/* Media Type Selector */}
        <div className="space-y-2">
          <label className="text-xs text-white/50">Media Type</label>
          <select
            value={item.mediaType || 'image'}
            onChange={(e) => updateItem(catIndex, itemIndex, 'mediaType', e.target.value)}
            className="w-full bg-black/50 border border-white/20 rounded-lg px-3 py-2 text-sm"
          >
            <option value="image">Image</option>
            <option value="gif">GIF</option>
            <option value="video">Video</option>
          </select>
        </div>

        {/* Has Link Checkbox */}
        <div className="pt-2 border-t border-white/10">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={!!item.link}
              onChange={(e) => {
                const newData = { ...workData }
                const currentItem = newData.categories![catIndex].items[itemIndex]

                if (e.target.checked) {
                  // Enable link with default values
                  currentItem.link = { url: '', title: 'View Project' }
                } else {
                  // Disable link and clear data
                  delete currentItem.link
                }

                setWorkData(newData)
              }}
              className="w-4 h-4 bg-black/50 border border-white/20 rounded focus:ring-purple-500 focus:ring-2"
            />
            <span className="text-sm text-white/70">Has Link</span>
          </label>
        </div>

        {/* Link Fields - Only show if has link */}
        {item.link && (
          <div className="space-y-2 mt-3">
            <input
              type="text"
              placeholder="Link URL (required)"
              value={item.link.url || ''}
              onChange={(e) => updateItem(catIndex, itemIndex, 'link.url', e.target.value)}
              className="w-full bg-black/50 border border-white/20 rounded-lg px-3 py-2 text-sm"
              required
            />
            <input
              type="text"
              placeholder="Button Text (required)"
              value={item.link.title || ''}
              onChange={(e) => updateItem(catIndex, itemIndex, 'link.title', e.target.value)}
              className="w-full bg-black/50 border border-white/20 rounded-lg px-3 py-2 text-sm"
              required
            />
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="p-6 lg:p-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Work Section</h1>
          <p className="text-white/50">Manage your portfolio items - drag to reorder</p>
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

      {/* Categories with Drag and Drop */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="space-y-4">
          <SortableContext items={workData.categories.map((_, index) => `category-${index}`)} strategy={verticalListSortingStrategy}>
            {workData.categories.map((category, catIndex) => (
              <SortableCategory key={catIndex} category={category} catIndex={catIndex} />
            ))}
          </SortableContext>

          {/* Add Category Button */}
          <button
            onClick={() => {
              const newCategory = {
                name: 'New Category',
                items: []
              }
              setWorkData({ ...workData, categories: [...workData.categories, newCategory] })
            }}
            className="w-full py-4 border-2 border-dashed border-white/20 rounded-xl hover:border-purple-500/50 hover:bg-purple-500/10 transition-all text-white/60 hover:text-white"
          >
            <Plus className="w-6 h-6 mx-auto" />
            Add New Category
          </button>
        </div>
      </DndContext>

      {/* Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={() => setPreviewImage(null)}>
          {workData.categories.some(cat => 
            cat.items.some(item => item.imageUrl === previewImage && item.mediaType === 'video')
          ) ? (
            <video 
              src={previewImage} 
              className="max-w-full max-h-full rounded-lg" 
              controls
              autoPlay
              muted
              loop
            />
          ) : (
            <img src={previewImage} alt="Preview" className="max-w-full max-h-full rounded-lg" />
          )}
        </div>
      )}
    </div>
  )
}
