import { useAuthContext } from '../contexts/AuthContext'

export function StudentDashboard() {
  const { user, signOut } = useAuthContext()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                🤖 AI 교육 플랫폼 - 학생
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                안녕하세요, {user?.name}님
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
          
          {/* AI 채팅 섹션 */}
          <div className="mb-8">
            <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              💬 AI 튜터와 대화하기
            </h2>
            <div className="bg-white shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a9.863 9.863 0 01-4.906-1.298L3 21l1.298-5.094A9.863 9.863 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">AI 채팅 시작</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      AI 튜터와 대화를 시작해보세요.
                    </p>
                    <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                      채팅 시작하기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 활동 섹션 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            
            {/* 참여 가능한 활동 */}
            <div className="bg-white shadow rounded-lg">
              <div className="p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  📚 참여 가능한 활동
                </h3>
                <div className="text-center text-gray-500">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <h4 className="mt-2 text-sm font-medium text-gray-900">활동 없음</h4>
                  <p className="mt-1 text-sm text-gray-500">
                    아직 참여 가능한 활동이 없습니다.
                  </p>
                </div>
              </div>
            </div>

            {/* 진행률 */}
            <div className="bg-white shadow rounded-lg">
              <div className="p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  📊 진행 현황
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">전체 진행률</span>
                      <span className="font-medium">0%</span>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">완료된 활동</span>
                      <span className="font-medium">0개</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">AI 대화 횟수</span>
                      <span className="font-medium">0회</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* 최근 채팅 히스토리 */}
          <div>
            <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              💭 최근 채팅 기록
            </h2>
            <div className="bg-white shadow rounded-lg">
              <div className="p-6">
                <div className="text-center text-gray-500">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">채팅 기록 없음</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    아직 AI와 대화한 기록이 없습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}