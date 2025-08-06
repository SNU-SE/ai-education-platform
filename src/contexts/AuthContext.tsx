import { createContext, useContext, ReactNode } from 'react'
import { useAuth } from '../hooks/useAuth'
import { User } from '../types/database'

interface AuthContextType {
  user: User | null
  session: any
  loading: boolean
  signIn: (email: string, password: string) => Promise<any>
  signUp: (email: string, password: string, name: string, role?: 'admin' | 'student') => Promise<any>
  signOut: () => Promise<any>
  updateProfile: (updates: { name?: string }) => Promise<any>
  isAuthenticated: boolean
  isAdmin: boolean
  isStudent: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth()

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}