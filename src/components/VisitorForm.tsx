'use client'

import { useState } from 'react'
import type { Visitor, MasterStatus, MasterPIC, MasterGender } from '@/lib/supabase'

interface VisitorFormProps {
  visitor?: Visitor
  statuses: MasterStatus[]
  pics: MasterPIC[]
  genders: MasterGender[]
  onSubmit: (data: any) => void
  onCancel: () => void
}

export default function VisitorForm({ visitor, statuses, pics, genders, onSubmit, onCancel }: VisitorFormProps) {
  const [formData, setFormData] = useState({
    no: visitor?.no || 0,
    nama: visitor?.nama || '',
    nomor_hp: visitor?.nomor_hp || '',
    gender_code: visitor?.gender_code || '',
    invitation: visitor?.invitation || '',
    email: visitor?.email || '',
    pic_code: visitor?.pic_code || '',
    status_code: visitor?.status_code || 'open',
    perusahaan: visitor?.perusahaan || '',
    jabatan: visitor?.jabatan || '',
    bidang_usaha: visitor?.bidang_usaha || '',
    notes: visitor?.notes || '',
    event_date: visitor?.event_date || '2026-04-09'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {visitor ? 'Edit Visitor' : 'Add New Visitor'}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* No */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">No</label>
          <input
            type="number"
            value={formData.no}
            onChange={(e) => setFormData({ ...formData, no: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>

        {/* Nama */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
          <input
            type="text"
            value={formData.nama}
            onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>

        {/* Nomor HP */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nomor HP</label>
          <input
            type="text"
            value={formData.nomor_hp}
            onChange={(e) => setFormData({ ...formData, nomor_hp: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="08123456789"
            required
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <select
            value={formData.gender_code}
            onChange={(e) => setFormData({ ...formData, gender_code: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          >
            <option value="">Select Gender</option>
            {genders.map((g) => (
              <option key={g.gender_code} value={g.gender_code}>{g.gender_name}</option>
            ))}
          </select>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>

        {/* PIC */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">PIC</label>
          <select
            value={formData.pic_code}
            onChange={(e) => setFormData({ ...formData, pic_code: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          >
            <option value="">Select PIC</option>
            {pics.map((p) => (
              <option key={p.pic_code} value={p.pic_code}>{p.pic_name}</option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={formData.status_code}
            onChange={(e) => setFormData({ ...formData, status_code: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          >
            <option value="">Select Status</option>
            {statuses.map((s) => (
              <option key={s.status_code} value={s.status_code}>{s.status_name}</option>
            ))}
          </select>
        </div>

        {/* Perusahaan */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Perusahaan</label>
          <input
            type="text"
            value={formData.perusahaan}
            onChange={(e) => setFormData({ ...formData, perusahaan: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Jabatan */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Jabatan</label>
          <input
            type="text"
            value={formData.jabatan}
            onChange={(e) => setFormData({ ...formData, jabatan: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Bidang Usaha */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bidang Usaha</label>
          <input
            type="text"
            value={formData.bidang_usaha}
            onChange={(e) => setFormData({ ...formData, bidang_usaha: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Invitation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Invitation</label>
          <input
            type="text"
            value={formData.invitation}
            onChange={(e) => setFormData({ ...formData, invitation: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>

        {/* Event Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
          <input
            type="date"
            value={formData.event_date}
            onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>
      </div>

      {/* Notes */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          rows={3}
        />
      </div>

      <div className="flex gap-3 mt-6">
        <button
          type="submit"
          className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          {visitor ? 'Update' : 'Create'} Visitor
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}