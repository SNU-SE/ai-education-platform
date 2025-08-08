import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

interface AdminStats {
  totalStudents: number
  totalChatSessions: number
  totalMessages: number
  activeSessionsToday: number
  recentStudents: Array<{
    id: string
    name: string
    role: string
    created_at: string
    lastActivity?: string
  }>
  recentChatSessions: Array<{
    id: number
    title: string
    user_name: string
    updated_at: string
    message_count: number
  }>
}

export function useAdminStats() {
  const [stats, setStats] = useState<AdminStats>({
    totalStudents: 0,
    totalChatSessions: 0,
    totalMessages: 0,
    activeSessionsToday: 0,
    recentStudents: [],
    recentChatSessions: []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = async () => {
    try {
      setLoading(true)
      setError(null)

      // 총 학생 수 (role이 'student'인 사용자)
      const { count: totalStudents } = await supabase
        .from('user_roles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'student')

      // 총 채팅 세션 수
      const { count: totalChatSessions } = await supabase
        .from('chat_sessions')
        .select('*', { count: 'exact', head: true })

      // 총 메시지 수
      const { count: totalMessages } = await supabase
        .from('chat_messages')
        .select('*', { count: 'exact', head: true })

      // 오늘 활성 세션 수 (오늘 업데이트된 세션)
      const today = new Date().toISOString().split('T')[0]
      const { count: activeSessionsToday } = await supabase
        .from('chat_sessions')
        .select('*', { count: 'exact', head: true })
        .gte('updated_at', today)

      // 최근 학생 목록
      const { data: recentStudents } = await supabase
        .from('user_roles')
        .select('id, name, role, created_at')
        .eq('role', 'student')
        .order('created_at', { ascending: false })
        .limit(5)

      // 최근 채팅 세션 (메시지 수와 함께)
      const { data: recentChatSessions } = await supabase
        .from('chat_sessions')
        .select(`
          id,
          title,
          updated_at,
          user_roles!inner(name)
        `)
        .order('updated_at', { ascending: false })
        .limit(5)

      // 각 채팅 세션의 메시지 수 가져오기
      const sessionsWithMessageCount = await Promise.all(
        (recentChatSessions || []).map(async (session: any) => {
          const { count } = await supabase
            .from('chat_messages')
            .select('*', { count: 'exact', head: true })
            .eq('session_id', session.id)

          return {
            id: session.id,
            title: session.title,
            user_name: session.user_roles.name,
            updated_at: session.updated_at,
            message_count: count || 0
          }
        })
      )

      setStats({
        totalStudents: totalStudents || 0,
        totalChatSessions: totalChatSessions || 0,
        totalMessages: totalMessages || 0,
        activeSessionsToday: activeSessionsToday || 0,
        recentStudents: recentStudents || [],
        recentChatSessions: sessionsWithMessageCount
      })

    } catch (err) {
      console.error('Admin stats fetch error:', err)
      setError(err instanceof Error ? err.message : '데이터를 불러오는 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return { stats, loading, error, refetch: fetchStats }
}