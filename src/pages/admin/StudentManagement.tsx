import { useState, useEffect } from 'react'
import { useAuthContext } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'

interface Student {
  id: string
  name: string
  role: string
  created_at: string
  email?: string
  last_activity?: string
  chat_count?: number
  message_count?: number
}

export function StudentManagement() {
  const { user, signOut } = useAuthContext()
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  const fetchStudents = async () => {
    try {
      setLoading(true)
      setError(null)

      // 학생 기본 정보 가져오기
      const { data: studentsData, error: studentsError } = await supabase
        .from('user_roles')
        .select('id, name, role, created_at')
        .eq('role', 'student')
        .order('created_at', { ascending: false })

      if (studentsError) throw studentsError

      // 각 학생의 채팅 통계 가져오기
      const studentsWithStats = await Promise.all(
        (studentsData || []).map(async (student) => {
          // 채팅 세션 수
          const { count: chatCount } = await supabase
            .from('chat_sessions')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', student.id)

          // 메시지 수
          const { count: messageCount } = await supabase
            .from('chat_messages')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', student.id)

          // 최근 활동 (가장 최근 채팅 세션 업데이트 시간)
          const { data: lastActivity } = await supabase
            .from('chat_sessions')
            .select('updated_at')
            .eq('user_id', student.id)
            .order('updated_at', { ascending: false })
            .limit(1)
            .single()

          return {
            ...student,
            chat_count: chatCount || 0,
            message_count: messageCount || 0,
            last_activity: lastActivity?.updated_at || null
          }
        })
      )

      setStudents(studentsWithStats)
    } catch (err) {
      console.error('Students fetch error:', err)
      setError(err instanceof Error ? err.message : '학생 데이터를 불러오는 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteStudent = async (studentId: string, studentName: string) => {
    if (!confirm(`정말로 ${studentName} 학생을 삭제하시겠습니까?`)) {
      return
    }

    try {
      // 학생의 모든 데이터 삭제 (cascade로 자동 삭제되지만 명시적으로)
      await supabase
        .from('user_roles')
        .delete()
        .eq('id', studentId)

      // 목록 새로고침
      fetchStudents()
      setShowDetails(false)
      setSelectedStudent(null)
    } catch (err) {
      console.error('Delete student error:', err)
      alert('학생 삭제 중 오류가 발생했습니다.')
    }
  }

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(() => {
    fetchStudents()
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
                <a href="/admin/students" className="text-blue-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
                  학생 관리
                </a>
                <a href="/admin/activities" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
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
          
          {/* 검색 및 액션 바 */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-semibold text-gray-900">학생 관리</h1>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                총 {students.length}명
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="학생 이름 또는 ID 검색..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                onClick={fetchStudents}
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* 학생 목록 */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                {loading ? (
                  <div className="p-6 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2 text-gray-500">로딩 중...</p>
                  </div>
                ) : filteredStudents.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {filteredStudents.map((student) => (
                      <li key={student.id}>
                        <div 
                          className={`px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer ${
                            selectedStudent?.id === student.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                          }`}
                          onClick={() => {
                            setSelectedStudent(student)
                            setShowDetails(true)
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div className="text-sm font-medium text-blue-600 truncate">
                                  {student.name}
                                </div>
                                <div className="ml-2 flex-shrink-0 flex space-x-2">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    {student.role}
                                  </span>
                                  {student.chat_count > 0 && (
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                      채팅 {student.chat_count}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="mt-2 sm:flex sm:justify-between">
                                <div className="sm:flex items-center space-x-4">
                                  <div className="text-sm text-gray-500">
                                    가입일: {new Date(student.created_at).toLocaleDateString()}
                                  </div>
                                  {student.last_activity && (
                                    <div className="text-sm text-gray-500">
                                      최근 활동: {new Date(student.last_activity).toLocaleDateString()}
                                    </div>
                                  )}
                                </div>
                                <div className="mt-2 flex items-center text-sm text-gray-500">
                                  <span>메시지: {student.message_count}개</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-6 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      {searchTerm ? '검색 결과가 없습니다' : '등록된 학생이 없습니다'}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {searchTerm ? '다른 검색어를 시도해보세요.' : '아직 등록된 학생이 없습니다.'}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* 학생 상세 정보 */}
            <div className="lg:col-span-1">
              <div className="bg-white shadow rounded-lg">
                {showDetails && selectedStudent ? (
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">학생 상세 정보</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">이름</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedStudent.name}</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-500">ID</label>
                        <p className="mt-1 text-sm text-gray-900 font-mono text-xs bg-gray-100 p-2 rounded">
                          {selectedStudent.id}
                        </p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-500">역할</label>
                        <p className="mt-1">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {selectedStudent.role}
                          </span>
                        </p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-gray-500">가입일</label>
                        <p className="mt-1 text-sm text-gray-900">
                          {new Date(selectedStudent.created_at).toLocaleString()}
                        </p>
                      </div>
                      
                      {selectedStudent.last_activity && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">최근 활동</label>
                          <p className="mt-1 text-sm text-gray-900">
                            {new Date(selectedStudent.last_activity).toLocaleString()}
                          </p>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">채팅 세션</label>
                          <p className="mt-1 text-lg font-semibold text-blue-600">
                            {selectedStudent.chat_count}개
                          </p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">메시지</label>
                          <p className="mt-1 text-lg font-semibold text-purple-600">
                            {selectedStudent.message_count}개
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => handleDeleteStudent(selectedStudent.id, selectedStudent.name)}
                        className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                      >
                        학생 삭제
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">학생을 선택하세요</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      좌측 목록에서 학생을 클릭하면 상세 정보를 볼 수 있습니다.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}