import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const WORK_JSON_PATH = path.join(process.cwd(), 'src', 'data', 'work.json')
const PROGRAMS_JSON_PATH = path.join(process.cwd(), 'src', 'data', 'programs.json')
const PUBLIC_UPLOAD_PATH = path.join(process.cwd(), 'public', 'uploads')

// Generate random 30-character uppercase string
function generateRandomFilename(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < 30; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// GET - Read JSON files
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const file = searchParams.get('file')

    // Handle image uploads directory request
    if (file === 'uploads') {
      try {
        await fs.access(PUBLIC_UPLOAD_PATH)
        const files = await fs.readdir(PUBLIC_UPLOAD_PATH)
        const imageFiles = files.filter(f => 
          f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png') || f.endsWith('.webp') || 
          f.endsWith('.gif') || f.endsWith('.mp4') || f.endsWith('.webm') || f.endsWith('.mov')
        )
        return NextResponse.json({ images: imageFiles })
      } catch {
        return NextResponse.json({ images: [] })
      }
    }

    let filePath: string
    if (file === 'work') {
      filePath = WORK_JSON_PATH
    } else if (file === 'programs') {
      filePath = PROGRAMS_JSON_PATH
    } else {
      return NextResponse.json({ error: 'Invalid file parameter' }, { status: 400 })
    }

    const data = await fs.readFile(filePath, 'utf-8')
    return NextResponse.json(JSON.parse(data))
  } catch (error) {
    console.error('Error reading JSON file:', error)
    return NextResponse.json({ error: 'Failed to read file' }, { status: 500 })
  }
}

// POST - Handle JSON updates and file uploads
export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')

    // Handle file upload
    if (action === 'upload') {
      const formData = await request.formData()
      const file = formData.get('file') as File
      
      if (!file) {
        return NextResponse.json({ error: 'No file provided' }, { status: 400 })
      }

      // Ensure uploads directory exists
      try {
        await fs.access(PUBLIC_UPLOAD_PATH)
      } catch {
        await fs.mkdir(PUBLIC_UPLOAD_PATH, { recursive: true })
      }

      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      
      // Get file extension
      const originalName = file.name
      const extension = originalName.slice(originalName.lastIndexOf('.')).toLowerCase()
      
      // Generate random 30-character uppercase filename
      const randomName = generateRandomFilename()
      const fileName = `${randomName}${extension}`
      const filePath = path.join(PUBLIC_UPLOAD_PATH, fileName)
      
      await fs.writeFile(filePath, buffer)
      
      // Return relative path for public access
      return NextResponse.json({ 
        success: true, 
        filePath: `/uploads/${fileName}`,
        fileName: fileName
      })
    }

    // Handle JSON updates
    const file = searchParams.get('file')
    let filePath: string
    if (file === 'work') {
      filePath = WORK_JSON_PATH
    } else if (file === 'programs') {
      filePath = PROGRAMS_JSON_PATH
    } else {
      return NextResponse.json({ error: 'Invalid file parameter' }, { status: 400 })
    }

    const body = await request.json()
    await fs.writeFile(filePath, JSON.stringify(body, null, 2))
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}

// DELETE - Delete uploaded image
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const filename = searchParams.get('filename')

    if (!filename) {
      return NextResponse.json({ error: 'No filename provided' }, { status: 400 })
    }

    // Validate filename to prevent directory traversal
    const sanitizedFilename = path.basename(filename)
    const filePath = path.join(PUBLIC_UPLOAD_PATH, sanitizedFilename)

    // Check if file exists
    try {
      await fs.access(filePath)
    } catch {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    // Delete the file
    await fs.unlink(filePath)

    return NextResponse.json({ success: true, message: 'File deleted successfully' })
  } catch (error) {
    console.error('Error deleting file:', error)
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 })
  }
}
