import { useState, useEffect, useRef } from 'react'
import { useAuthContext } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'

interface ChatMessage {
  id: number
  role: 'user' | 'assistant'
  content: string
  created_at: string
}

interface ChatSession {
  id: number
  title: string
  updated_at: string
}

export function ChatInterface() {
  const { user } = useAuthContext()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [currentSessionId, setCurrentSessionId] = useState<number | null>(null)
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    loadChatSessions()
  }, [])

  const loadChatSessions = async () => {
    if (!user) return

    const { data, error } = await supabase
      .from('chat_sessions')
      .select('id, title, updated_at')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })
      .limit(10)

    if (!error && data) {
      setSessions(data)
      if (data.length > 0 && !currentSessionId) {
        setCurrentSessionId(data[0].id)
        loadMessages(data[0].id)
      }
    }
  }

  const loadMessages = async (sessionId: number) => {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('id, role, content, created_at')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true })

    if (!error && data) {
      setMessages(data)
    }
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || loading || !user) return

    const userMessage = inputMessage.trim()
    setInputMessage('')
    setLoading(true)

    // 사용자 메시지 즉시 표시
    const tempUserMessage: ChatMessage = {
      id: Date.now(),
      role: 'user',
      content: userMessage,
      created_at: new Date().toISOString()
    }
    setMessages(prev => [...prev, tempUserMessage])

    try {
      // Edge Function 호출
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: {
          message: userMessage,
          userId: user.id,
          sessionId: currentSessionId
        }
      })

      if (error) {
        console.error('AI 채팅 오류:', error)
        alert('채팅 중 오류가 발생했습니다: ' + error.message)
        return
      }

      // 새 세션이 생성된 경우 업데이트
      if (data.sessionId && !currentSessionId) {
        setCurrentSessionId(data.sessionId)
        loadChatSessions() // 세션 목록 새로고침
      }

      // AI 응답 추가
      const aiMessage: ChatMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: data.message,
        created_at: new Date().toISOString()
      }

      // 실제 데이터베이스에서 메시지 다시 로드
      if (currentSessionId || data.sessionId) {
        loadMessages(currentSessionId || data.sessionId)
      } else {
        setMessages(prev => [...prev, aiMessage])
      }

    } catch (error) {
      console.error('채팅 오류:', error)
      alert('채팅 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const startNewChat = () => {
    setCurrentSessionId(null)
    setMessages([])
  }

  const selectSession = (sessionId: number) => {
    setCurrentSessionId(sessionId)
    loadMessages(sessionId)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex h-full bg-white rounded-lg shadow overflow-hidden">
      {/* 채팅 세션 사이드바 */}
      <div className="w-64 bg-gray-50 border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={startNewChat}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            새 채팅 시작
          </button>
        </div>
        <div className="overflow-y-auto">
          {sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => selectSession(session.id)}
              className={`w-full text-left p-3 hover:bg-gray-100 border-b border-gray-100 ${
                currentSessionId === session.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
              }`}
            >
              <div className="text-sm font-medium text-gray-900 truncate">
                {session.title}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {new Date(session.updated_at).toLocaleDateString()}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 메인 채팅 영역 */}
      <div className="flex-1 flex flex-col">
        {/* 채팅 메시지 영역 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">AI 튜터와 대화해보세요!</h3>
              <p className="text-sm text-gray-600">
                궁금한 것이 있으면 언제든 질문해주세요.
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  <div
                    className={`text-xs mt-1 ${
                      message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}
                  >
                    {new Date(message.created_at).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))
          )}
          
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-900 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm text-gray-500">AI가 답변하는 중...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* 메시지 입력 영역 */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex space-x-2">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="메시지를 입력하세요... (Shift+Enter로 줄바꿈)"
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !inputMessage.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-4 py-2 rounded-md font-medium"
            >
              전송
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}