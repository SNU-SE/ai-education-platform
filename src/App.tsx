import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import './App.css'

// React Query 클라이언트 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분
      gcTime: 1000 * 60 * 30, // 30분 (기존 cacheTime)
    },
  },
})

function App() {
  const [count, setCount] = useState(0)

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/ai-education-platform">
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🤖 AI 교육 플랫폼
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              GitHub Pages + Supabase로 구축한 무료 AI 교육 시스템
            </p>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="mb-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
                  onClick={() => setCount((count) => count + 1)}
                >
                  count is {count}
                </button>
              </div>
              <p className="text-gray-600">
                React + TypeScript + Vite 프로젝트 정상 실행 중!
              </p>
            </div>
            
            <div className="mt-8 text-sm text-gray-500">
              <p>📋 Phase 1.3: Supabase 연동 진행 중...</p>
              <p>✅ Git Checkpoint 3 목표</p>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App