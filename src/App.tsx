import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
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
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
            <p>📋 Phase 1: 환경 설정 진행 중...</p>
            <p>✅ Git Checkpoint 2 목표</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App