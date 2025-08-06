import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'

interface ProtectedRouteProps {
  children: ReactNode
  requireAuth?: boolean
  requireRole?: 'admin' | 'student'
  redirectTo?: string
}

export function ProtectedRoute({ 
  children, 
  requireAuth = true,
  requireRole,
  redirectTo = '/login'
}: ProtectedRouteProps) {
  const { loading, isAuthenticated, isAdmin, isStudent } = useAuthContext()
  const location = useLocation()

  // 로딩 중일 때는 로딩 화면 표시
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // 인증이 필요하지만 로그인하지 않은 경우
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />
  }

  // 인증하지 않은 상태에서 접근해야 하는 페이지 (로그인, 회원가입)
  if (!requireAuth && isAuthenticated) {
    const redirectPath = isAdmin ? '/admin' : '/student'
    return <Navigate to={redirectPath} replace />
  }

  // 특정 역할이 필요한 경우
  if (requireRole && isAuthenticated) {
    if (requireRole === 'admin' && !isAdmin) {
      return <Navigate to="/unauthorized" replace />
    }
    if (requireRole === 'student' && !isStudent) {
      return <Navigate to="/unauthorized" replace />
    }
  }

  return <>{children}</>
}

// 권한 없음 페이지
export function UnauthorizedPage() {
  const { user, signOut } = useAuthContext()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center">
          <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          접근 권한이 없습니다
        </h2>
        <p className="mt-2 text-gray-600">
          현재 계정 ({user?.role})으로는 이 페이지에 접근할 수 없습니다.
        </p>
        <button
          onClick={signOut}
          className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          다른 계정으로 로그인
        </button>
      </div>
    </div>
  )
}