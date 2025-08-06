import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 타입 정의
export type Database = {
  public: {
    Tables: {
      user_roles: {
        Row: {
          id: string
          role: 'admin' | 'student'
          name: string
          created_at: string
        }
        Insert: {
          id: string
          role: 'admin' | 'student'
          name: string
        }
        Update: {
          role?: 'admin' | 'student'
          name?: string
        }
      }
      activities: {
        Row: {
          id: number
          title: string
          description: string | null
          content: any | null
          created_at: string
        }
        Insert: {
          title: string
          description?: string
          content?: any
        }
        Update: {
          title?: string
          description?: string
          content?: any
        }
      }
      chat_logs: {
        Row: {
          id: number
          user_id: string
          message: string
          ai_response: string | null
          activity_id: number | null
          created_at: string
        }
        Insert: {
          user_id: string
          message: string
          ai_response?: string
          activity_id?: number
        }
        Update: {
          ai_response?: string
        }
      }
      files: {
        Row: {
          id: number
          user_id: string
          filename: string
          file_path: string
          file_type: string | null
          created_at: string
        }
        Insert: {
          user_id: string
          filename: string
          file_path: string
          file_type?: string
        }
        Update: {
          filename?: string
          file_path?: string
          file_type?: string
        }
      }
      student_responses: {
        Row: {
          id: number
          user_id: string
          activity_id: number
          response_type: 'argumentation' | 'evaluation'
          content: string
          status: string
          created_at: string
        }
        Insert: {
          user_id: string
          activity_id: number
          response_type: 'argumentation' | 'evaluation'
          content: string
          status?: string
        }
        Update: {
          content?: string
          status?: string
        }
      }
      document_chunks: {
        Row: {
          id: number
          content: string
          embedding: number[] | null
          metadata: any | null
          created_at: string
        }
        Insert: {
          content: string
          embedding?: number[]
          metadata?: any
        }
        Update: {
          content?: string
          embedding?: number[]
          metadata?: any
        }
      }
    }
  }
}