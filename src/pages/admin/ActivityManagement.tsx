import { useState, useEffect } from 'react'
import { useAuthContext } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'

interface Activity {
  id: number
  title: string
  description?: string
  content?: any
  created_at: string
  participant_count?: number
  completion_rate?: number
}

interface ActivityFormData {
  title: string
  description: string
  content: {
    checklist: Array<{ id: string; text: string; completed: boolean }>
    instructions: string
  }
}

export function ActivityManagement() {
  const { user, signOut } = useAuthContext()
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [formData, setFormData] = useState<ActivityFormData>({
    title: '',
    description: '',
    content: {
      checklist: [{ id: '1', text: '', completed: false }],
      instructions: ''
    }
  })

  const fetchActivities = async () => {
    try {
      setLoading(true)
      setError(null)

      // 활동 기본 정보 가져오기
      const { data: activitiesData, error: activitiesError } = await supabase
        .from('activities')
        .select('*')
        .order('created_at', { ascending: false })

      if (activitiesError) throw activitiesError

      // 각 활동의 참여 통계 가져오기
      const activitiesWithStats = await Promise.all(
        (activitiesData || []).map(async (activity) => {
          // 참여자 수 (해당 활동에 응답한 고유 학생 수)
          const { data: participantData } = await supabase
            .from('student_responses')
            .select('user_id')
            .eq('activity_id', activity.id)

          const uniqueParticipants = new Set(participantData?.map(p => p.user_id) || [])
          const participantCount = uniqueParticipants.size

          // 완료율 계산 (status가 'completed'인 응답의 비율)
          const { count: totalResponses } = await supabase
            .from('student_responses')
            .select('*', { count: 'exact', head: true })
            .eq('activity_id', activity.id)

          const { count: completedResponses } = await supabase
            .from('student_responses')
            .select('*', { count: 'exact', head: true })
            .eq('activity_id', activity.id)
            .eq('status', 'completed')

          const completionRate = totalResponses > 0 
            ? Math.round((completedResponses || 0) / totalResponses * 100)
            : 0

          return {
            ...activity,
            participant_count: participantCount,
            completion_rate: completionRate
          }
        })
      )

      setActivities(activitiesWithStats)
    } catch (err) {
      console.error('Activities fetch error:', err)
      setError(err instanceof Error ? err.message : '활동 데이터를 불러오는 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateActivity = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)

      const { error: createError } = await supabase
        .from('activities')
        .insert({
          title: formData.title,
          description: formData.description,
          content: formData.content,
          created_at: new Date().toISOString()
        })

      if (createError) throw createError

      // 폼 리셋
      setFormData({
        title: '',
        description: '',
        content: {
          checklist: [{ id: '1', text: '', completed: false }],
          instructions: ''
        }
      })
      setShowCreateForm(false)
      fetchActivities()
    } catch (err) {
      console.error('Create activity error:', err)
      setError(err instanceof Error ? err.message : '활동 생성 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteActivity = async (activityId: number, activityTitle: string) => {
    if (!confirm(`정말로 "${activityTitle}" 활동을 삭제하시겠습니까?`)) {
      return
    }

    try {
      await supabase
        .from('activities')
        .delete()
        .eq('id', activityId)

      fetchActivities()
      setSelectedActivity(null)
    } catch (err) {
      console.error('Delete activity error:', err)
      alert('활동 삭제 중 오류가 발생했습니다.')
    }
  }

  const addChecklistItem = () => {
    const newItem = {
      id: Date.now().toString(),
      text: '',
      completed: false
    }
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        checklist: [...prev.content.checklist, newItem]
      }
    }))
  }

  const removeChecklistItem = (itemId: string) => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        checklist: prev.content.checklist.filter(item => item.id !== itemId)
      }
    }))
  }

  const updateChecklistItem = (itemId: string, text: string) => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        checklist: prev.content.checklist.map(item =>
          item.id === itemId ? { ...item, text } : item
        )
      }
    }))
  }

  useEffect(() => {
    fetchActivities()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-semibold text-gray-900">
                🤖 AI 교육 플랫폼 - 관리자
              </h1>
              <nav className="flex space-x-4">
                <a href="/admin" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  대시보드
                </a>
                <a href="/admin/students" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  학생 관리
                </a>
                <a href="/admin/activities" className="text-blue-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
                  활동 관리
                </a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                안녕하세요, {user?.name}님 ({user?.role})
              </span>
              <button
                onClick={signOut}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          
          {/* 액션 바 */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-semibold text-gray-900">활동 관리</h1>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                총 {activities.length}개
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                새 활동 만들기
              </button>
              <button
                onClick={fetchActivities}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    새로고침 중...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    새로고침
                  </>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              오류: {error}
            </div>
          )}

          {/* 활동 생성 폼 */}
          {showCreateForm && (
            <div className="mb-8 bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">새 활동 만들기</h2>
              <form onSubmit={handleCreateActivity} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">활동 제목</label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="활동의 제목을 입력하세요"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">활동 설명</label>
                  <textarea
                    rows={3}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="활동에 대한 설명을 입력하세요"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">활동 지침</label>
                  <textarea
                    rows={4}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.content.instructions}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      content: { ...prev.content, instructions: e.target.value }
                    }))}
                    placeholder="학생들이 따라야 할 지침을 입력하세요"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">체크리스트 항목</label>
                    <button
                      type="button"
                      onClick={addChecklistItem}
                      className="text-sm text-blue-600 hover:text-blue-500"
                    >
                      + 항목 추가
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.content.checklist.map((item, index) => (
                      <div key={item.id} className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500 w-6">{index + 1}.</span>
                        <input
                          type="text"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          value={item.text}
                          onChange={(e) => updateChecklistItem(item.id, e.target.value)}
                          placeholder="체크리스트 항목을 입력하세요"
                        />
                        {formData.content.checklist.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeChecklistItem(item.id)}
                            className="text-red-600 hover:text-red-500"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    {loading ? '생성 중...' : '활동 생성'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 활동 목록 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="ml-3 text-gray-500">로딩 중...</p>
              </div>
            ) : activities.length > 0 ? (
              activities.map((activity) => (
                <div key={activity.id} className="bg-white shadow rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-medium text-gray-900 truncate">
                      {activity.title}
                    </h3>
                    <button
                      onClick={() => handleDeleteActivity(activity.id, activity.title)}
                      className="text-red-600 hover:text-red-500 ml-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  
                  {activity.description && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {activity.description}
                    </p>
                  )}
                  
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span>생성일: {new Date(activity.created_at).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-4 text-sm">
                      <span className="text-blue-600 font-medium">
                        참여자: {activity.participant_count}명
                      </span>
                      <span className="text-green-600 font-medium">
                        완료율: {activity.completion_rate}%
                      </span>
                    </div>
                  </div>
                  
                  {activity.content?.checklist && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-500 mb-2">체크리스트 미리보기:</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {activity.content.checklist.slice(0, 3).map((item: any, index: number) => (
                          <li key={index} className="flex items-center">
                            <span className="w-4 h-4 mr-2 border border-gray-300 rounded"></span>
                            <span className="truncate">{item.text}</span>
                          </li>
                        ))}
                        {activity.content.checklist.length > 3 && (
                          <li className="text-gray-400">
                            ... 외 {activity.content.checklist.length - 3}개 항목
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">활동이 없습니다</h3>
                <p className="mt-1 text-sm text-gray-500">
                  새 활동을 만들어 학생들에게 과제를 제공해보세요.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}