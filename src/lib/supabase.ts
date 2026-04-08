import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// Types based on database schema
export interface Visitor {
  id: string
  no: number
  nama: string
  nomor_hp: string
  gender_code: 'male' | 'female'
  invitation: string
  email: string
  pic_code: 'ilham' | 'hans' | 'eva'
  status_code: 'open' | 'followup' | 'not_contacted_yet' | 'confirmed' | 'reschedule' | 'cancel'
  perusahaan: string | null
  jabatan: string | null
  bidang_usaha: string | null
  wa_link: string
  notes: string | null
  created_at: string
  updated_at: string
  event_date: string
}

export interface MasterStatus {
  status_code: string
  status_name: string
  description: string
  color_code: string
}

export interface MasterPIC {
  pic_code: string
  pic_name: string
  email: string
  phone: string
}

export interface MasterGender {
  gender_code: string
  gender_name: string
}

// Helper function to generate WhatsApp link
export function generateWALink(nomor_hp: string): string {
  const cleaned = nomor_hp.replace(/[-\s.]/g, '')
  return `https://wa.me/62${cleaned.substring(1)}`
}