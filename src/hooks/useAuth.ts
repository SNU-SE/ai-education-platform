import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import { User as AppUser } from '../types/database'

export function useAuth() {
  const [user, setUser] = useState<AppUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    // 현재 사용자 세션 확인
    const getSession = async () => {
      const { data: { session: currentSession }, error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('Error getting session:', error)
        setLoading(false)
        return
      }

      setSession(currentSession)
      
      if (currentSession?.user) {
        await fetchUserProfile(currentSession.user)
      } else {
        setUser(null)
      }
      
      setLoading(false)
    }

    getSession()

    // 인증 상태 변경 감지
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('Auth state changed:', event)
        setSession(currentSession)
        
        if (currentSession?.user) {
          await fetchUserProfile(currentSession.user)
        } else {
          setUser(null)
        }
        
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const fetchUserProfile = async (authUser: User) => {
    try {
      const { data: userRole, error } = await supabase
        .from('user_roles')
        .select('role, name')
        .eq('id', authUser.id)
        .single()

      if (error) {
        console.error('Error fetching user role:', error)
        return
      }

      if (userRole) {
        setUser({
          id: authUser.id,
          email: authUser.email!,
          role: userRole.role,
          name: userRole.name,
        })
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error)
    }
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    const result = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    setLoading(false)
    return result
  }

  const signUp = async (
    email: string, 
    password: string, 
    name: string, 
    role: 'admin' | 'student' = 'student'
  ) => {
    setLoading(true)
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error || !data.user) {
      setLoading(false)
      return { data, error }
    }

    // 사용자 역할 정보 추가
    const { error: roleError } = await supabase
      .from('user_roles')
      .insert({
        id: data.user.id,
        role,
        name,
      })

    setLoading(false)
    
    if (roleError) {
      return { data, error: roleError }
    }

    return { data, error }
  }

  const signOut = async () => {
    setLoading(true)
    const result = await supabase.auth.signOut()
    setUser(null)
    setSession(null)
    setLoading(false)
    return result
  }

  const updateProfile = async (updates: { name?: string }) => {
    if (!user) return { error: 'No user logged in' }

    const { error } = await supabase
      .from('user_roles')
      .update(updates)
      .eq('id', user.id)

    if (!error && updates.name) {
      setUser({ ...user, name: updates.name })
    }

    return { error }
  }

  return {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isStudent: user?.role === 'student',
  }
}