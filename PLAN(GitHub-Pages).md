# AI 교육 챗봇 앱 개발 계획서 (GitHub Pages + Supabase)

## 🎯 프로젝트 개요
STRUCTURE.md 기반 AI 교육 플랫폼을 GitHub Pages + Supabase 조합으로 구축하여 **완전 무료**로 시작 가능한 솔루션

## 🏗️ 기술 스택

### 프론트엔드 & 배포
- **React 18.3.1** + **TypeScript**
- **Vite** (빌드 도구)
- **Tailwind CSS** + **shadcn/ui**
- **React Router DOM 6.26.2**
- **TanStack React Query 5.56.2**
- **GitHub Pages** (정적 사이트 호스팅)
- **GitHub Actions** (자동 배포)

### 백엔드 서비스 (Supabase)
- **Supabase Database** (PostgreSQL)
- **Supabase Auth** (인증 시스템)
- **Supabase Realtime** (실시간 기능)
- **Supabase Storage** (파일 저장소)
- **Supabase Edge Functions** (서버리스 함수)

### AI 통합
- **OpenAI API** (GPT 모델)
- **Anthropic Claude API**
- **Vector Embeddings** (Supabase Vector)

## 📅 개발 일정 (총 6-8일)

### Phase 1: GitHub 설정 및 기초 구조 (1-2일)
**Day 1: GitHub Repository 및 환경 설정**
- GitHub Repository 생성 (Public)
- GitHub Pages 활성화
- GitHub Actions 워크플로우 설정
- 로컬 개발환경 구축
- Supabase 프로젝트 생성

**Day 2: React 프로젝트 초기화**
- React + Vite + TypeScript 프로젝트 생성
- GitHub Pages용 설정 (base path, routing)
- Supabase 클라이언트 설정
- 기본 폴더 구조 및 컴포넌트 생성

### Phase 2: 핵심 기능 개발 (2-3일)
**Day 3: 인증 시스템 및 기본 UI**
- Supabase Auth 연동
- 로그인/회원가입 컴포넌트
- 역할 기반 라우팅 (admin/student)
- shadcn/ui 컴포넌트 설정

**Day 4: AI 채팅 시스템**
- Edge Function: ai-chat 구현
- 실시간 채팅 인터페이스
- OpenAI API 통합
- 채팅 히스토리 관리

**Day 5: 관리자 및 학생 인터페이스**
- 관리자 대시보드 (학생 관리, 모니터링)
- 학생 활동 참여 화면
- 체크리스트 시스템
- 기본 논증/평가 기능

### Phase 3: 고급 기능 및 최적화 (2-3일)
**Day 6: RAG 시스템 및 파일 처리**
- PDF 처리 Edge Function
- Vector 검색 구현
- 파일 업로드/다운로드
- 문서 기반 AI 답변

**Day 7: 배포 및 최적화**
- GitHub Actions 자동 배포 설정
- 성능 최적화 (코드 스플리팅, 캐싱)
- 에러 처리 및 UX 개선
- 모바일 반응형 최적화

**Day 8: 테스트 및 문서화**
- 전체 기능 테스트
- 사용자 가이드 작성
- 버그 수정 및 최종 배포

## 🏛️ 시스템 아키텍처

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│  GitHub Pages   │    │    Supabase      │    │  External APIs  │
│   (Frontend)    │────│   (Backend)      │────│                 │
│                 │    │                  │    │ • OpenAI API    │
│ • React SPA     │    │ • PostgreSQL DB  │    │ • Claude API    │
│ • Static Files  │    │ • Auth System    │    │                 │
│ • CDN Delivery  │    │ • Realtime       │    └─────────────────┘
│ • HTTPS         │    │ • Storage        │
│ • Custom Domain │    │ • Edge Functions │
└─────────────────┘    └──────────────────┘

GitHub Actions (CI/CD)
├── 코드 Push 감지
├── 자동 빌드 (npm run build)
├── GitHub Pages 배포
└── 배포 완료 알림
```

## 📁 프로젝트 구조

```
ai-education-platform/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 배포 스크립트
│
├── public/
│   ├── index.html
│   └── assets/
│
├── src/
│   ├── components/
│   │   ├── admin/              # 관리자 컴포넌트
│   │   ├── student/            # 학생 컴포넌트
│   │   ├── auth/               # 인증 컴포넌트
│   │   └── ui/                 # 공통 UI 컴포넌트
│   ├── pages/                  # 페이지 컴포넌트
│   ├── hooks/                  # 커스텀 훅
│   ├── types/                  # TypeScript 타입
│   ├── utils/                  # 유틸리티 함수
│   └── lib/
│       ├── supabase.ts         # Supabase 클라이언트
│       └── auth.ts             # 인증 헬퍼
│
├── supabase/                   # Supabase 설정 (로컬 개발용)
│   ├── functions/              # Edge Functions
│   │   ├── ai-chat/
│   │   ├── process-pdf/
│   │   └── rag-search/
│   ├── migrations/
│   └── config.toml
│
├── vite.config.ts              # GitHub Pages 설정 포함
├── package.json
├── tailwind.config.js
└── README.md
```

## ⚙️ GitHub Pages 전용 설정

### 1. Vite 설정 (GitHub Pages용)
```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/ai-education-platform/', // GitHub Repository 이름
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
```

### 2. React Router 설정 (GitHub Pages용)
```typescript
// src/App.tsx
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter basename="/ai-education-platform">
      {/* 라우트 컴포넌트들 */}
    </BrowserRouter>
  )
}
```

### 3. GitHub Actions 워크플로우
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      env:
        VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
        VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
        
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### 4. 404 페이지 처리 (SPA 라우팅용)
```html
<!-- public/404.html -->
<!DOCTYPE html>
<html>
<head>
  <script>
    // GitHub Pages SPA 해결책
    var pathSegmentsToKeep = 1;
    var l = window.location;
    l.replace(
      l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
      l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + 
      '/?/' + l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
      (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
      l.hash
    );
  </script>
</head>
<body></body>
</html>
```

```typescript
// src/main.tsx - 404 리다이렉트 처리
useEffect(() => {
  // GitHub Pages SPA 리다이렉트 처리
  if (location.search.includes('/?/')) {
    const path = location.search.slice(3).replace(/~and~/g, '&')
    history.replaceState(null, '', path)
  }
}, [])
```

## 🗄️ Supabase 데이터베이스 설계

### 간소화된 테이블 구조 (핵심만)
```sql
-- 사용자 관리
CREATE TABLE user_roles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  role TEXT NOT NULL CHECK (role IN ('admin', 'student')),
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 활동 관리
CREATE TABLE activities (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  content JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI 채팅
CREATE TABLE chat_logs (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  message TEXT NOT NULL,
  ai_response TEXT,
  activity_id INTEGER REFERENCES activities(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 파일 관리
CREATE TABLE files (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  filename TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 학생 응답 (논증, 평가 통합)
CREATE TABLE student_responses (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  activity_id INTEGER REFERENCES activities(id),
  response_type TEXT CHECK (response_type IN ('argumentation', 'evaluation')),
  content TEXT NOT NULL,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RAG용 문서 청크 (Vector 검색)
CREATE TABLE document_chunks (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  embedding VECTOR(1536), -- OpenAI embeddings
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vector 검색 함수
CREATE OR REPLACE FUNCTION match_documents (
  query_embedding VECTOR(1536),
  similarity_threshold FLOAT = 0.8,
  match_count INT = 5
)
RETURNS TABLE (
  id INTEGER,
  content TEXT,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    document_chunks.id,
    document_chunks.content,
    1 - (document_chunks.embedding <=> query_embedding) AS similarity
  FROM document_chunks
  WHERE 1 - (document_chunks.embedding <=> query_embedding) > similarity_threshold
  ORDER BY document_chunks.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
```

### RLS (Row Level Security) 정책
```sql
-- 사용자는 본인 데이터만 접근
ALTER TABLE chat_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own chat logs" ON chat_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own chat logs" ON chat_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 관리자는 모든 데이터 접근
CREATE POLICY "Admins can view all chat logs" ON chat_logs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );
```

## 🔧 핵심 기능 구현

### 1. Supabase 클라이언트 설정
```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 타입 정의
export type Database = {
  public: {
    Tables: {
      user_roles: {
        Row: {
          id: string
          role: 'admin' | 'student'
          name: string
          created_at: string
        }
        Insert: {
          id: string
          role: 'admin' | 'student'
          name: string
        }
        Update: {
          role?: 'admin' | 'student'
          name?: string
        }
      }
      chat_logs: {
        Row: {
          id: number
          user_id: string
          message: string
          ai_response: string | null
          activity_id: number | null
          created_at: string
        }
        Insert: {
          user_id: string
          message: string
          ai_response?: string
          activity_id?: number
        }
        Update: {
          ai_response?: string
        }
      }
    }
  }
}
```

### 2. 인증 시스템
```typescript
// src/hooks/useAuth.ts
import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [userRole, setUserRole] = useState<'admin' | 'student' | null>(null)

  useEffect(() => {
    // 현재 사용자 세션 확인
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchUserRole(session.user.id)
      }
      setLoading(false)
    })

    // 인증 상태 변경 감지
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        if (session?.user) {
          fetchUserRole(session.user.id)
        } else {
          setUserRole(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const fetchUserRole = async (userId: string) => {
    const { data } = await supabase
      .from('user_roles')
      .select('role')
      .eq('id', userId)
      .single()
    
    setUserRole(data?.role ?? null)
  }

  const signIn = async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password })
  }

  const signUp = async (email: string, password: string, name: string, role: 'admin' | 'student') => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    
    if (data.user && !error) {
      // 사용자 역할 정보 추가
      await supabase.from('user_roles').insert({
        id: data.user.id,
        role,
        name
      })
    }
    
    return { data, error }
  }

  const signOut = async () => {
    return await supabase.auth.signOut()
  }

  return {
    user,
    userRole,
    loading,
    signIn,
    signUp,
    signOut
  }
}
```

### 3. 실시간 채팅
```typescript
// src/hooks/useChat.ts
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

interface ChatMessage {
  id: number
  user_id: string
  message: string
  ai_response: string | null
  created_at: string
}

export function useChat(userId: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 기존 메시지 로드
    fetchMessages()

    // 실시간 메시지 구독
    const channel = supabase
      .channel('chat')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_logs',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          setMessages(prev => [...prev, payload.new as ChatMessage])
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'chat_logs',
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          setMessages(prev => 
            prev.map(msg => 
              msg.id === payload.new.id ? payload.new as ChatMessage : msg
            )
          )
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [userId])

  const fetchMessages = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('chat_logs')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true })
    
    setMessages(data || [])
    setLoading(false)
  }

  const sendMessage = async (message: string) => {
    // 메시지 저장
    const { data } = await supabase
      .from('chat_logs')
      .insert({
        user_id: userId,
        message
      })
      .select()
      .single()

    if (data) {
      // AI 응답 요청 (Edge Function 호출)
      const response = await supabase.functions.invoke('ai-chat', {
        body: { 
          message, 
          chatId: data.id,
          userId 
        }
      })
    }
  }

  return {
    messages,
    loading,
    sendMessage
  }
}
```

### 4. Edge Functions (AI 통합)
```typescript
// supabase/functions/ai-chat/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message, chatId, userId } = await req.json()

    // OpenAI API 호출
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: '당신은 교육용 AI 어시스턴트입니다. 학생들의 학습을 도와주세요.'
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    })

    const aiData = await openaiResponse.json()
    const aiResponse = aiData.choices[0].message.content

    // Supabase에 AI 응답 업데이트
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    await supabase
      .from('chat_logs')
      .update({ ai_response: aiResponse })
      .eq('id', chatId)

    return new Response(
      JSON.stringify({ success: true, response: aiResponse }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
```

## 💰 비용 분석 (완전 무료 시작 가능)

### 무료 티어 제한
```
GitHub Pages: 완전 무료
- 100GB 대역폭/월
- 1GB 저장공간
- 무제한 public 레포지토리

Supabase 무료 티어:
- 50만 API 요청/월
- 500MB 데이터베이스
- 1GB 파일 저장소
- 2개 Edge Functions

OpenAI API:
- $5 무료 크레딧 (신규 가입)
- 이후 사용량 기반 과금
```

### 확장 시 비용
```
Supabase Pro ($25/월):
- 무제한 API 요청
- 8GB 데이터베이스
- 100GB 파일 저장소
- 500 Edge Functions

총 월간 비용: $25-45 (OpenAI 사용량에 따라)
```

## 🚀 배포 워크플로우

### 개발 단계
```bash
# 1. 로컬 개발
npm run dev

# 2. Supabase 로컬 개발 (선택사항)
supabase start
supabase functions serve

# 3. 코드 커밋
git add .
git commit -m "feat: 새 기능 추가"
git push origin main
```

### 자동 배포
```
GitHub Push → GitHub Actions → Build → Deploy to GitHub Pages
           ↓
    환경변수 주입 → Vite Build → 최적화 → CDN 배포
```

### 커스텀 도메인 설정
```bash
# GitHub Pages 설정에서
# Custom domain: your-domain.com
# CNAME 파일 자동 생성
```

## 📊 성능 최적화

### GitHub Pages 최적화
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          supabase: ['@supabase/supabase-js'],
          ui: ['@radix-ui/react-dialog', 'lucide-react']
        }
      }
    }
  }
})
```

### 캐싱 전략
```typescript
// src/lib/cache.ts
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분
      cacheTime: 1000 * 60 * 30, // 30분
    }
  }
})
```

## 🎯 최종 장점

### ✅ **완전 무료 시작**
- 개발 단계에서 $0 비용
- 소규모 사용자도 무료 운영 가능

### ✅ **간단한 배포**
- Git Push만으로 자동 배포
- 서버 관리 불필요
- SSL 인증서 자동 적용

### ✅ **확장성**
- 사용자 증가 시 Supabase Pro로 업그레이드
- GitHub Pages는 트래픽 제한 없음

### ✅ **안정성**
- GitHub의 99.9% 업타임
- 전 세계 CDN 네트워크
- 자동 백업 및 버전 관리

---

이 계획서는 **최소 비용으로 시작**하여 **점진적으로 확장** 가능한 현실적인 솔루션을 제시합니다. 교육용 프로젝트에 최적화된 구조입니다.