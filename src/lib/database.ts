import { supabase } from './supabase'
import type { Visitor, MasterStatus, MasterPIC, MasterGender } from './supabase'

// Fetch all visitors with details
export async function getVisitors(): Promise<Visitor[]> {
  const { data, error } = await supabase
    .from('visitors')
    .select('*')
    .order('no')
  
  if (error) throw error
  return data || []
}

// Fetch single visitor
export async function getVisitor(id: string): Promise<Visitor | null> {
  const { data, error } = await supabase
    .from('visitors')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data
}

// Create visitor
export async function createVisitor(visitor: Omit<Visitor, 'id' | 'created_at' | 'updated_at' | 'wa_link'>): Promise<Visitor> {
  const { data, error } = await supabase
    .from('visitors')
    .insert([visitor])
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Update visitor
export async function updateVisitor(id: string, updates: Partial<Visitor>): Promise<Visitor> {
  const { data, error } = await supabase
    .from('visitors')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Delete visitor
export async function deleteVisitor(id: string): Promise<void> {
  const { error } = await supabase
    .from('visitors')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}

// Fetch master data
export async function getMasterStatus(): Promise<MasterStatus[]> {
  const { data, error } = await supabase
    .from('master_status')
    .select('*')
    .eq('is_active', true)
    .order('sort_order')
  
  if (error) throw error
  return data || []
}

export async function getMasterPICs(): Promise<MasterPIC[]> {
  const { data, error } = await supabase
    .from('master_pic')
    .select('*')
    .eq('is_active', true)
  
  if (error) throw error
  return data || []
}

export async function getMasterGenders(): Promise<MasterGender[]> {
  const { data, error } = await supabase
    .from('master_gender')
    .select('*')
    .eq('is_active', true)
  
  if (error) throw error
  return data || []
}

// Get summary statistics
export async function getVisitorSummary() {
  const { data, error } = await supabase
    .from('visitor_summary')
    .select('*')
    .single()
  
  if (error) throw error
  return data
}

// Get PIC workload
export async function getPICWorkload() {
  const { data, error } = await supabase
    .from('pic_workload')
    .select('*')
  
  if (error) throw error
  return data || []
}

// Get status distribution
export async function getStatusDistribution() {
  const { data, error } = await supabase
    .from('status_distribution')
    .select('*')
    .order('sort_order')
  
  if (error) throw error
  return data || []
}