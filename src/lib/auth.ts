import { supabase } from './supabase'
import { User } from '../types/database'

export const auth = {
  // 현재 사용자 가져오기
  async getCurrentUser(): Promise<User | null> {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    // user_roles 테이블에서 추가 정보 가져오기
    const { data: userRole } = await supabase
      .from('user_roles')
      .select('role, name')
      .eq('id', user.id)
      .single()

    if (!userRole) return null

    return {
      id: user.id,
      email: user.email!,
      role: userRole.role,
      name: userRole.name,
    }
  },

  // 로그인
  async signIn(email: string, password: string) {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    })
  },

  // 회원가입
  async signUp(email: string, password: string, name: string, role: 'admin' | 'student' = 'student') {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) return { data, error }

    // 사용자 역할 정보 추가
    if (data.user) {
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({
          id: data.user.id,
          role,
          name,
        })

      if (roleError) {
        return { data, error: roleError }
      }
    }

    return { data, error }
  },

  // 로그아웃
  async signOut() {
    return await supabase.auth.signOut()
  },

  // 인증 상태 변경 구독
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback)
  },
}