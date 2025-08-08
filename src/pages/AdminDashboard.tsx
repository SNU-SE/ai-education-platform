import { useAuthContext } from '../contexts/AuthContext'
import { useAdminStats } from '../hooks/useAdminStats'

export function AdminDashboard() {
  const { user, signOut } = useAuthContext()
  const { stats, loading, error, refetch } = useAdminStats()

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
                <a href="/admin" className="text-blue-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
                  대시보드
                </a>
                <a href="/admin/students" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
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
          
          {/* 새로고침 버튼 */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">관리자 대시보드</h1>
            <button
              onClick={refetch}
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

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              오류: {error}
            </div>
          )}

          {/* 통계 카드들 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            
            {/* 총 학생 수 */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">총 학생 수</dt>
                      <dd className="text-2xl font-semibold text-gray-900">
                        {loading ? '...' : stats.totalStudents}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* 총 채팅 세션 */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a9.863 9.863 0 01-4.906-1.298L3 21l1.298-5.094A9.863 9.863 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">채팅 세션</dt>
                      <dd className="text-2xl font-semibold text-gray-900">
                        {loading ? '...' : stats.totalChatSessions}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* 총 메시지 수 */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-8 w-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">총 메시지</dt>
                      <dd className="text-2xl font-semibold text-gray-900">
                        {loading ? '...' : stats.totalMessages}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* 오늘 활성 세션 */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-8 w-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">오늘 활성</dt>
                      <dd className="text-2xl font-semibold text-gray-900">
                        {loading ? '...' : stats.activeSessionsToday}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* 최근 학생 목록 */}
            <div>
              <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                최근 가입 학생
              </h2>
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                {loading ? (
                  <div className="p-6 text-center text-gray-500">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2">로딩 중...</p>
                  </div>
                ) : stats.recentStudents.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {stats.recentStudents.map((student) => (
                      <li key={student.id}>
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-medium text-blue-600 truncate">
                              {student.name}
                            </div>
                            <div className="ml-2 flex-shrink-0 flex">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {student.role}
                              </span>
                            </div>
                          </div>
                          <div className="mt-2 sm:flex sm:justify-between">
                            <div className="sm:flex">
                              <div className="text-sm text-gray-500">
                                가입일: {new Date(student.created_at).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">학생 없음</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      아직 등록된 학생이 없습니다.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* 최근 채팅 세션 */}
            <div>
              <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                최근 채팅 세션
              </h2>
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                {loading ? (
                  <div className="p-6 text-center text-gray-500">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2">로딩 중...</p>
                  </div>
                ) : stats.recentChatSessions.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {stats.recentChatSessions.map((session) => (
                      <li key={session.id}>
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-medium text-blue-600 truncate">
                              {session.title}
                            </div>
                            <div className="ml-2 flex-shrink-0 flex">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                {session.message_count}개 메시지
                              </span>
                            </div>
                          </div>
                          <div className="mt-2 sm:flex sm:justify-between">
                            <div className="sm:flex">
                              <div className="text-sm text-gray-500">
                                {session.user_name} · {new Date(session.updated_at).toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a9.863 9.863 0 01-4.906-1.298L3 21l1.298-5.094A9.863 9.863 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">채팅 세션 없음</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      아직 생성된 채팅 세션이 없습니다.
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