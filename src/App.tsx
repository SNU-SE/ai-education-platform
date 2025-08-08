import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './contexts/AuthContext'
import { ProtectedRoute, UnauthorizedPage } from './components/auth/ProtectedRoute'
import { AuthPage } from './pages/AuthPage'
import { AdminDashboard } from './pages/AdminDashboard'
import { StudentDashboard } from './pages/StudentDashboard'
import { StudentManagement } from './pages/admin/StudentManagement'
import { ActivityManagement } from './pages/admin/ActivityManagement'
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
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/ai-education-platform">
        <AuthProvider>
          <Routes>
            {/* 인증이 필요하지 않은 라우트 (로그인, 회원가입) */}
            <Route 
              path="/login" 
              element={
                <ProtectedRoute requireAuth={false}>
                  <AuthPage />
                </ProtectedRoute>
              } 
            />
            
            {/* 관리자 전용 라우트 */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requireAuth={true} requireRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/students" 
              element={
                <ProtectedRoute requireAuth={true} requireRole="admin">
                  <StudentManagement />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/activities" 
              element={
                <ProtectedRoute requireAuth={true} requireRole="admin">
                  <ActivityManagement />
                </ProtectedRoute>
              } 
            />
            
            {/* 학생 전용 라우트 */}
            <Route 
              path="/student" 
              element={
                <ProtectedRoute requireAuth={true} requireRole="student">
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* 권한 없음 페이지 */}
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            
            {/* 메인 페이지 - 로그인 페이지로 리다이렉트 */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* 404 페이지 - 로그인 페이지로 리다이렉트 */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App