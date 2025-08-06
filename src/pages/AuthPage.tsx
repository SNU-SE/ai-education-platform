import { useState } from 'react'
import { LoginForm } from '../components/auth/LoginForm'
import { SignUpForm } from '../components/auth/SignUpForm'

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  if (isLogin) {
    return (
      <div>
        <LoginForm />
        <div className="text-center mt-4">
          <button
            onClick={() => setIsLogin(false)}
            className="text-blue-600 hover:text-blue-500 text-sm font-medium"
          >
            회원가입하기
          </button>
        </div>
      </div>
    )
  }

  return (
    <SignUpForm onSwitchToLogin={() => setIsLogin(true)} />
  )
}