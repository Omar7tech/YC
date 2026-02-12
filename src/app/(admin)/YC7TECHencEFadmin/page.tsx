'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Briefcase, GraduationCap, Image as ImageIcon, ArrowRight } from 'lucide-react'

interface DashboardStats {
  workItems: number
  programs: number
  images: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({ workItems: 0, programs: 0, images: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [workRes, programsRes, imagesRes] = await Promise.all([
        fetch('/api/admin?file=work'),
        fetch('/api/admin?file=programs'),
        fetch('/api/admin?file=uploads')
      ])

      const workData = workRes.ok ? await workRes.json() : { categories: [] }
      const programsData = programsRes.ok ? await programsRes.json() : { programs: [] }
      const imagesData = imagesRes.ok ? await imagesRes.json() : { images: [] }

      const workItems = workData.categories?.reduce((acc: number, cat: any) => acc + (cat.items?.length || 0), 0) || 0

      setStats({
        workItems,
        programs: programsData.programs?.length || 0,
        images: imagesData.images?.length || 0
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
    setLoading(false)
  }

  const quickLinks = [
    {
      title: 'Work Section',
      description: 'Manage work categories and items',
      icon: Briefcase,
      href: '/YC7TECHencEFadmin/work',
      count: stats.workItems,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Programs',
      description: 'Edit program content',
      icon: GraduationCap,
      href: '/YC7TECHencEFadmin/programs',
      count: stats.programs,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Image Gallery',
      description: 'Upload and manage images',
      icon: ImageIcon,
      href: '/YC7TECHencEFadmin/images',
      count: stats.images,
      color: 'from-green-500 to-emerald-500'
    }
  ]

  return (
    <div className="p-6 lg:p-0">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-white/50">Welcome to your content management dashboard</p>
      </div>

      {/* Stats Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-white/5 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.title}
                href={link.href}
                className="group relative overflow-hidden bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${link.color} opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:opacity-20 transition-opacity`} />
                
                <div className="relative">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{link.title}</h3>
                  <p className="text-white/50 text-sm mb-4">{link.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{link.count}</span>
                    <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}

      {/* Recent Activity */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/YC7TECHencEFadmin/work"
              className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="font-medium">Add Work Item</p>
                <p className="text-sm text-white/50">Create new portfolio piece</p>
              </div>
            </Link>
            
            <Link
              href="/YC7TECHencEFadmin/images"
              className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="font-medium">Upload Images</p>
                <p className="text-sm text-white/50">Add new media files</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
