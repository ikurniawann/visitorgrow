'use client'

import { useState, useEffect } from 'react'
import VisitorForm from './VisitorForm'
import { 
  getVisitors, 
  getVisitorSummary, 
  getPICWorkload, 
  getStatusDistribution,
  getMasterStatus,
  getMasterPICs,
  getMasterGenders,
  createVisitor,
  updateVisitor,
  deleteVisitor
} from '@/lib/database'
import type { Visitor, MasterStatus, MasterPIC, MasterGender } from '@/lib/supabase'
import { Download, Plus, Pencil, Trash2, MessageCircle } from 'lucide-react'

export default function Dashboard() {
  const [visitors, setVisitors] = useState<Visitor[]>([])
  const [summary, setSummary] = useState<any>(null)
  const [picWorkload, setPicWorkload] = useState<any[]>([])
  const [statusDist, setStatusDist] = useState<any[]>([])
  const [statuses, setStatuses] = useState<MasterStatus[]>([])
  const [pics, setPics] = useState<MasterPIC[]>([])
  const [genders, setGenders] = useState<MasterGender[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingVisitor, setEditingVisitor] = useState<Visitor | null>(null)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      setLoading(true)
      const [
        visitorsData,
        summaryData,
        picData,
        statusData,
        masterStatuses,
        masterPics,
        masterGenders
      ] = await Promise.all([
        getVisitors(),
        getVisitorSummary(),
        getPICWorkload(),
        getStatusDistribution(),
        getMasterStatus(),
        getMasterPICs(),
        getMasterGenders()
      ])
      
      setVisitors(visitorsData)
      setSummary(summaryData)
      setPicWorkload(picData)
      setStatusDist(statusData)
      setStatuses(masterStatuses)
      setPics(masterPics)
      setGenders(masterGenders)
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (formData: any) => {
    try {
      await createVisitor(formData)
      setShowForm(false)
      loadData()
    } catch (error) {
      console.error('Error creating visitor:', error)
    }
  }

  const handleUpdate = async (formData: any) => {
    if (!editingVisitor) return
    try {
      await updateVisitor(editingVisitor.id, formData)
      setEditingVisitor(null)
      setShowForm(false)
      loadData()
    } catch (error) {
      console.error('Error updating visitor:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this visitor?')) return
    try {
      await deleteVisitor(id)
      loadData()
    } catch (error) {
      console.error('Error deleting visitor:', error)
    }
  }

  const exportToCSV = () => {
    const headers = ['No', 'Nama', 'Nomor HP', 'Email', 'Gender', 'Perusahaan', 'Jabatan', 'Bidang Usaha', 'Invitation', 'PIC', 'Status']
    const rows = visitors.map(v => [
      v.no,
      v.nama,
      v.nomor_hp,
      v.email,
      v.gender_code,
      v.perusahaan || '-',
      v.jabatan || '-',
      v.bidang_usaha || '-',
      v.invitation,
      v.pic_code,
      v.status_code
    ])
    
    const csv = [headers.join(','), ...rows.map(r => r.map(field => `"${field}"`).join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'Visitor_List.csv'
    a.click()
  }

  const getStatusColor = (code: string) => {
    const colors: Record<string, string> = {
      'open': '#3b82f6',
      'followup': '#f59e0b',
      'not_contacted_yet': '#6b7280',
      'confirmed': '#10b981',
      'reschedule': '#8b5cf6',
      'cancel': '#ef4444'
    }
    return colors[code] || '#6b7280'
  }

  const getStatusName = (code: string) => {
    const names: Record<string, string> = {
      'open': 'Open',
      'followup': 'Followup',
      'not_contacted_yet': 'Not Contacted',
      'confirmed': 'Confirmed',
      'reschedule': 'Reschedule',
      'cancel': 'Cancel'
    }
    return names[code] || code
  }

  const getPICBadgeClass = (code: string) => {
    const classes: Record<string, string> = {
      'ilham': 'bg-red-100 text-red-600',
      'hans': 'bg-amber-100 text-amber-600',
      'eva': 'bg-emerald-100 text-emerald-600'
    }
    return classes[code] || 'bg-gray-100 text-gray-600'
  }

  const getGenderBadgeClass = (code: string) => {
    return code === 'female' 
      ? 'bg-pink-100 text-pink-600' 
      : 'bg-blue-100 text-blue-600'
  }

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <div className="max-w-[1400px] mx-auto px-5 py-5">
        
        {/* Header */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-4">
            <img 
              src="https://assets.cdn.filesafe.space/kJWLd8r4D5EA3Bwx6viH/media/6701c394411b67221313779a.png" 
              alt="BNI GROW Logo" 
              className="h-12"
            />
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Visitor List 9 April 2026</h1>
              <p className="text-sm text-gray-500">Weekly Meeting Dashboard</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-400 uppercase tracking-wider">Last Updated</div>
            <div className="text-sm font-medium text-gray-900">
              {lastUpdated.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} • {lastUpdated.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
            </div>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <VisitorForm
            visitor={editingVisitor || undefined}
            statuses={statuses}
            pics={pics}
            genders={genders}
            onSubmit={editingVisitor ? handleUpdate : handleCreate}
            onCancel={() => {
              setShowForm(false)
              setEditingVisitor(null)
            }}
          />
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white border border-gray-200 rounded-lg p-5 relative overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-red-600"></div>
            <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Total Visitors</div>
            <div className="text-3xl font-bold text-gray-900">{summary?.total_visitors || 0}</div>
            <div className="text-sm text-gray-500 mt-2 flex items-center gap-1">
              <span>👥</span> 100% assigned
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-5 relative overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-emerald-500"></div>
            <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Confirmed</div>
            <div className="text-3xl font-bold text-gray-900">{summary?.confirmed_count || 0}</div>
            <div className="text-sm text-emerald-600 mt-2 flex items-center gap-1">
              <span>✓</span> {summary?.confirmation_rate || 0}% conversion
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-5 relative overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-amber-500"></div>
            <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Followup</div>
            <div className="text-3xl font-bold text-gray-900">{summary?.followup_count || 0}</div>
            <div className="text-sm text-amber-600 mt-2 flex items-center gap-1">
              <span>!</span> Needs action
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-5 relative overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gray-500"></div>
            <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Not Contacted</div>
            <div className="text-3xl font-bold text-gray-900">{summary?.not_contacted_count || 0}</div>
            <div className="text-sm text-gray-500 mt-2 flex items-center gap-1">
              <span>○</span> {Math.round((summary?.not_contacted_count || 0) / (summary?.total_visitors || 1) * 100)}% pending
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* Status Distribution */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-semibold text-gray-900">Status Distribution</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="relative w-[200px] h-[200px]">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <circle cx="100" cy="100" r="80" fill="none" stroke="#f1f3f5" strokeWidth="30" />
                  {statusDist.map((status, index) => {
                    const circumference = 2 * Math.PI * 80
                    const total = statusDist.reduce((acc, s) => acc + (s.visitor_count || 0), 0) || 1
                    const percentage = (status.visitor_count / total) * 100
                    const dashArray = `${(percentage / 100) * circumference} ${circumference}`
                    let offset = 0
                    for (let i = 0; i < index; i++) {
                      const prevPercent = (statusDist[i].visitor_count / total) * 100
                      offset += (prevPercent / 100) * circumference
                    }
                    return (
                      <circle
                        key={status.status_code}
                        cx="100"
                        cy="100"
                        r="80"
                        fill="none"
                        stroke={status.color_code}
                        strokeWidth="30"
                        strokeDasharray={dashArray}
                        strokeDashoffset={-offset}
                        transform="rotate(-90 100 100)"
                      />
                    )
                  })}
                  <text x="100" y="95" textAnchor="middle" fontSize="14" fill="#6b7280">Total</text>
                  <text x="100" y="115" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#1e2329">{summary?.total_visitors || 0}</text>
                </svg>
              </div>
              
              <div className="flex flex-wrap justify-center gap-6 mt-4">
                {statusDist.map((status) => (
                  <div key={status.status_code} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: status.color_code }}></div>
                    <span>{status.status_name} ({status.visitor_count})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* PIC Workload */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-semibold text-gray-900">PIC Workload</h3>
            </div>
            
            <div className="space-y-5">
              {picWorkload.map((pic) => (
                <div key={pic.pic_code}>
                  <div className="flex justify-between mb-1.5 text-sm">
                    <span className="text-gray-600">{pic.pic_name}</span>
                    <span className="text-gray-900 font-semibold">{pic.total_assigned} visitors ({Math.round((pic.total_assigned / (summary?.total_visitors || 1)) * 100)}%)</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        pic.pic_code === 'ilham' ? 'bg-red-600' :
                        pic.pic_code === 'hans' ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${(pic.total_assigned / (summary?.total_visitors || 1)) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 p-3 bg-gray-50 rounded-md text-sm text-gray-600">
              <strong>Action Required:</strong> {(summary?.followup_count || 0) + (summary?.not_contacted_count || 0)} visitors need follow-up
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-base font-semibold text-gray-900">Visitor List Detail</h3>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{visitors.length} entries</span>
              <button
                onClick={() => {
                  setEditingVisitor(null)
                  setShowForm(!showForm)
                }}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all text-sm font-medium"
              >
                <Plus size={16} />
                Add Visitor
              </button>
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all text-sm font-medium"
              >
                <Download size={16} />
                Export CSV
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">No</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Nama</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Gender</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Nomor HP</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Perusahaan</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Jabatan</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Bidang Usaha</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Invitation</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">PIC</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {visitors.map((visitor) => (
                  <tr key={visitor.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3.5 text-sm">{visitor.no}</td>
                    <td className="px-4 py-3.5 text-sm font-semibold">{visitor.nama}</td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${getGenderBadgeClass(visitor.gender_code)}`}>
                        {visitor.gender_code === 'female' ? 'Female' : 'Male'}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <a 
                        href={visitor.wa_link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-red-600 hover:bg-red-50 px-2 py-1 rounded text-sm font-mono transition-colors"
                      >
                        <MessageCircle size={14} />
                        {visitor.nomor_hp}
                      </a>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-gray-500 font-mono hidden lg:table-cell">{visitor.email}</td>
                    <td className="px-4 py-3.5 text-sm">
                      <div className="font-medium text-gray-700">{visitor.perusahaan || '-'}</div>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-gray-500">{visitor.jabatan || '-'}</td>
                    <td className="px-4 py-3.5">
                      {visitor.bidang_usaha ? (
                        <span className="inline-block px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600">{visitor.bidang_usaha}</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-sm text-gray-600">{visitor.invitation}</td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-block px-2.5 py-1 rounded text-xs font-medium ${getPICBadgeClass(visitor.pic_code)}`}>
                        {visitor.pic_code.charAt(0).toUpperCase() + visitor.pic_code.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span 
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium"
                        style={{ 
                          backgroundColor: `${getStatusColor(visitor.status_code)}20`,
                          color: getStatusColor(visitor.status_code)
                        }}
                      >
                        <span 
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: getStatusColor(visitor.status_code) }}
                        />
                        {getStatusName(visitor.status_code)}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingVisitor(visitor)
                            setShowForm(true)
                          }}
                          className="p-1.5 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded transition-colors"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(visitor.id)}
                          className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center py-6 bg-white border border-gray-200 rounded-lg">
          <p className="text-sm font-semibold text-gray-900 mb-1">Visitor List 9 April 2026</p>
          <p className="text-xs text-gray-400">
            Powered by Ilham Kurniawan | <a href="https://wit.id" target="_blank" className="text-red-600 hover:underline">WIT.ID</a>
          </p>
          <p className="text-xs text-gray-400 mt-2">Generated on {lastUpdated.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} • {lastUpdated.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB</p>
        </div>

      </div>
    </div>
  )
}