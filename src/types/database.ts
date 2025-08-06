export interface UserRole {
  id: string
  role: 'admin' | 'student'
  name: string
  created_at: string
}

export interface Activity {
  id: number
  title: string
  description?: string
  content?: any
  created_at: string
}

export interface ChatLog {
  id: number
  user_id: string
  message: string
  ai_response?: string
  activity_id?: number
  created_at: string
}

export interface FileRecord {
  id: number
  user_id: string
  filename: string
  file_path: string
  file_type?: string
  created_at: string
}

export interface StudentResponse {
  id: number
  user_id: string
  activity_id: number
  response_type: 'argumentation' | 'evaluation'
  content: string
  status: string
  created_at: string
}

export interface DocumentChunk {
  id: number
  content: string
  embedding?: number[]
  metadata?: any
  created_at: string
}

// API Response 타입들
export interface ApiResponse<T> {
  data?: T
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  count: number
  page: number
  limit: number
}

// 사용자 관련 타입들
export interface User {
  id: string
  email: string
  role: 'admin' | 'student'
  name: string
}

export interface AuthUser {
  user: User | null
  session: any | null
  loading: boolean
}