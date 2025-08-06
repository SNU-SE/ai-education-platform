# AI 교육 챗봇 앱 개발 계획서 (Supabase 버전)

## 🎯 프로젝트 개요
STRUCTURE.md 기반 AI 교육 플랫폼을 Supabase + React 스택으로 구축하여 Hostinger VPS에서 호스팅

## 🏗️ 기술 스택

### 프론트엔드 & 클라이언트
- **React 18.3.1** + **TypeScript**
- **Vite** (빌드 도구)
- **Tailwind CSS** + **shadcn/ui**
- **React Router DOM 6.26.2**
- **TanStack React Query 5.56.2**
- **Supabase JS Client**

### 백엔드 서비스 (Supabase)
- **Supabase Database** (PostgreSQL)
- **Supabase Auth** (인증 시스템)
- **Supabase Realtime** (실시간 기능)
- **Supabase Storage** (파일 저장소)
- **Supabase Edge Functions** (서버리스 함수)

### AI 통합 (Edge Functions)
- **OpenAI API** (GPT 모델)
- **Anthropic Claude API**
- **Vector Embeddings** (Supabase Vector)
- **PDF 처리** (Edge Functions)

### 배포 환경
- **Hostinger VPS** (Ubuntu 22.04)
- **Nginx** (정적 파일 서빙)
- **SSL/TLS** (Let's Encrypt)

## 📅 개발 일정 (총 8-12일)

### Phase 1: Supabase 설정 및 기초 구조 (2-3일)
**Day 1: Supabase 프로젝트 설정**
- Supabase 프로젝트 생성 및 설정
- 데이터베이스 스키마 설계 (STRUCTURE.md 기반)
- RLS (Row Level Security) 정책 설정
- Edge Functions 초기 설정

**Day 2: React 프로젝트 초기화**
- React + Vite + TypeScript 프로젝트 생성
- Supabase 클라이언트 설정
- 기본 폴더 구조 및 라우팅 설정
- 인증 시스템 연동

**Day 3: 기본 UI 컴포넌트**
- shadcn/ui 설치 및 설정
- 기본 페이지 컴포넌트 생성
- 인증 관련 컴포넌트 구현
- 보호된 라우트 설정

### Phase 2: 핵심 기능 개발 (3-4일)
**Day 4-5: AI 채팅 시스템**
- Edge Function: ai-chat 구현
- 실시간 채팅 (Supabase Realtime)
- OpenAI/Claude API 통합
- 채팅 인터페이스 컴포넌트

**Day 6: 관리자 대시보드**
- 학생 관리 인터페이스
- 실시간 모니터링 대시보드
- 클래스 관리 시스템
- AI 설정 관리

**Day 7: 학생 인터페이스**
- 활동 참여 화면
- 논증/토론 기능
- 체크리스트 시스템
- 동료평가 기능

### Phase 3: 고급 기능 (2-3일)
**Day 8-9: RAG 시스템**
- Edge Function: process-pdf 구현
- Edge Function: rag-search 구현
- Vector 검색 기능
- 문서 기반 AI 답변

**Day 9-10: 파일 관리 및 최적화**
- Supabase Storage 통합
- 파일 업로드/다운로드 기능
- 성능 최적화
- 에러 처리 개선

### Phase 4: VPS 배포 (1-2일)
**Day 11-12: 배포 및 최적화**
- React 앱 빌드 및 VPS 배포
- Nginx 설정 및 SSL 인증서
- 성능 모니터링 설정
- 최종 테스트 및 문서화

## 🏛️ 시스템 아키텍처

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React App     │    │    Supabase      │    │  Hostinger VPS  │
│   (Frontend)    │────│   (Backend)      │    │   (Hosting)     │
│                 │    │                  │    │                 │
│ • 학생 인터페이스 │    │ • PostgreSQL DB  │    │ • Nginx         │
│ • 관리자 대시보드 │    │ • Auth System   │    │ • SSL/TLS       │
│ • 실시간 채팅    │    │ • Realtime      │    │ • Static Files  │
│ • 파일 업로드    │    │ • Storage       │    │ • Domain        │
└─────────────────┘    │ • Edge Functions │    └─────────────────┘
                       └──────────────────┘
                                │
                       ┌──────────────────┐
                       │   External APIs  │
                       │  • OpenAI API    │
                       │  • Claude API    │
                       └──────────────────┘
```

## 📁 프로젝트 구조

```
ai-education-platform/
├── src/                         # React 애플리케이션
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
├── supabase/                    # Supabase 설정
│   ├── functions/              # Edge Functions
│   │   ├── ai-chat/           # AI 채팅 함수
│   │   ├── process-pdf/       # PDF 처리 함수
│   │   ├── rag-search/        # RAG 검색 함수
│   │   └── verify-admin/      # 관리자 권한 검증
│   ├── migrations/            # 데이터베이스 마이그레이션
│   └── config.toml           # Supabase 설정
│
├── docs/                       # 문서
│   ├── supabase-setup.md      # Supabase 설정 가이드
│   ├── deployment.md          # 배포 가이드
│   └── api-reference.md       # API 레퍼런스
│
├── scripts/                    # 배포 스크립트
│   ├── deploy.sh              # VPS 배포 스크립트
│   └── build.sh               # 빌드 스크립트
│
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## 🗄️ 데이터베이스 설계 (Supabase)

### 핵심 테이블 (STRUCTURE.md 기반)

#### 1. 사용자 관리
```sql
-- auth.users (Supabase 기본 테이블)
-- user_roles: 사용자 역할 관리
-- students: 학생 상세 정보
-- student_sessions: 세션 관리
```

#### 2. 활동 관리
```sql
-- activities: 교육 활동
-- activity_modules: 활동 모듈
-- checklist_items: 체크리스트
-- student_checklist_progress: 진행상황
```

#### 3. AI 채팅 시스템
```sql
-- chat_logs: 채팅 기록
-- document_chunks: RAG용 문서 청크 (Vector 컬럼 포함)
-- admin_settings: AI 설정
-- prompt_templates: 프롬프트 템플릿
```

#### 4. 파일 및 응답
```sql
-- files: 파일 메타데이터 (Supabase Storage 연동)
-- argumentation_responses: 논증 응답
-- peer_evaluations: 동료평가
```

### RLS (Row Level Security) 정책
```sql
-- 관리자: 모든 데이터 접근
-- 학생: 본인 데이터만 접근
-- 활동 데이터: 역할별 제한된 접근
```

## 🔧 주요 기능 구현 방식

### 1. Supabase 인증 시스템
```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseKey)

// 인증 헬퍼
export const signUp = async (email: string, password: string) => {
  return await supabase.auth.signUp({ email, password })
}

export const signIn = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({ email, password })
}
```

### 2. 실시간 채팅 (Supabase Realtime)
```typescript
// hooks/useChat.ts
const [messages, setMessages] = useState([])

useEffect(() => {
  const channel = supabase
    .channel('chat')
    .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'chat_logs' },
        (payload) => {
          setMessages(prev => [...prev, payload.new])
        }
    )
    .subscribe()

  return () => supabase.removeChannel(channel)
}, [])
```

### 3. Edge Functions (AI 통합)
```typescript
// supabase/functions/ai-chat/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const { message, userId } = await req.json()
  
  // OpenAI API 호출
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    }),
  })
  
  const aiResponse = await response.json()
  
  // 채팅 로그 저장
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )
  
  await supabase.from('chat_logs').insert({
    user_id: userId,
    message: message,
    ai_response: aiResponse.choices[0].message.content,
  })
  
  return new Response(JSON.stringify(aiResponse), {
    headers: { 'Content-Type': 'application/json' },
  })
})
```

### 4. RAG 시스템 (Vector 검색)
```typescript
// supabase/functions/rag-search/index.ts
serve(async (req) => {
  const { query, similarity_threshold = 0.8 } = await req.json()
  
  // 쿼리 임베딩 생성
  const embedding = await generateEmbedding(query)
  
  // Vector 검색
  const { data } = await supabase.rpc('match_documents', {
    query_embedding: embedding,
    similarity_threshold,
    match_count: 5
  })
  
  return new Response(JSON.stringify({ results: data }))
})
```

### 5. 파일 업로드 (Supabase Storage)
```typescript
// utils/fileUpload.ts
export const uploadFile = async (file: File, bucket: string) => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random()}.${fileExt}`
  const filePath = `${fileName}`

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file)

  if (error) throw error
  return data
}
```

## 🚀 Supabase 설정 가이드

### 1. 프로젝트 생성
1. [Supabase Dashboard](https://app.supabase.com) 접속
2. "New Project" 클릭
3. 프로젝트 이름, 비밀번호, 지역 설정
4. 생성 완료 후 API Keys 확인

### 2. 데이터베이스 설정
```sql
-- Vector extension 활성화
CREATE EXTENSION IF NOT EXISTS vector;

-- RLS 활성화
ALTER TABLE chat_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
-- 기타 테이블들...

-- RLS 정책 생성
CREATE POLICY "Users can view own chat logs" ON chat_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all data" ON chat_logs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );
```

### 3. Storage 설정
```sql
-- chat-files 버킷 생성
INSERT INTO storage.buckets (id, name, public) 
VALUES ('chat-files', 'chat-files', false);

-- 파일 업로드 정책
CREATE POLICY "Users can upload own files" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'chat-files' AND auth.uid()::text = (storage.foldername(name))[1]);
```

### 4. Edge Functions 배포
```bash
# Supabase CLI 설치
npm install -g supabase

# 로그인
supabase login

# Edge Functions 배포
supabase functions deploy ai-chat
supabase functions deploy process-pdf
supabase functions deploy rag-search
```

## 💰 비용 분석

### Supabase 요금제
- **Free Tier**: 월 50만 API 요청, 500MB 데이터베이스
- **Pro Tier**: $25/월 - 무제한 API, 8GB 데이터베이스
- **Team Tier**: $125/월 - 팀 기능 추가

### 예상 월간 비용
- **Hostinger VPS**: $7.99 (정적 파일 호스팅용)
- **Supabase Pro**: $25 (데이터베이스 + 백엔드)
- **OpenAI API**: $20-50 (사용량 기반)
- **도메인**: $1.25

**총 월간 비용**: $54-84

## 🎯 Supabase 사용의 장점

### 개발 속도
- **50% 빠른 개발**: 백엔드 구축 시간 단축
- **실시간 기능**: 복잡한 Socket.io 설정 불필요
- **인증 시스템**: JWT, OAuth 기본 제공
- **파일 저장소**: AWS S3 호환 스토리지

### 확장성
- **자동 확장**: 트래픽 증가 시 자동 스케일링
- **글로벌 CDN**: 전 세계 빠른 접속
- **백업**: 자동 백업 및 복구
- **모니터링**: 내장 분석 도구

### 보안
- **RLS**: 행 수준 보안 정책
- **API Gateway**: 자동 rate limiting
- **SSL/TLS**: 기본 암호화
- **SOC2**: 엔터프라이즈급 보안

## 📊 성능 최적화 전략

### 1. 프론트엔드 최적화
- **React Query**: Supabase 데이터 캐싱
- **Code Splitting**: 라우트별 코드 분할
- **Image Optimization**: Supabase Image Transform
- **Bundle Analysis**: 번들 크기 최적화

### 2. 데이터베이스 최적화
- **인덱싱**: 자주 쿼리되는 컬럼 인덱스
- **RLS 최적화**: 효율적인 정책 작성
- **Connection Pooling**: Supabase 자동 관리
- **Query Optimization**: 복잡한 쿼리 최적화

### 3. Edge Functions 최적화
- **콜드 스타트 최소화**: 함수 실행 시간 단축
- **메모리 사용량**: 효율적인 메모리 관리
- **API 호출 최적화**: 외부 API 호출 줄이기
- **캐싱 전략**: 자주 사용되는 데이터 캐싱

## 🔄 배포 워크플로우

### 개발 환경
```bash
# 로컬 Supabase 시작
supabase start

# 개발 서버 실행
npm run dev

# Edge Functions 로컬 테스트
supabase functions serve
```

### 프로덕션 배포
```bash
# React 앱 빌드
npm run build

# VPS에 업로드
scp -r dist/* user@your-vps:/var/www/html/

# Edge Functions 배포
supabase functions deploy --project-ref YOUR_PROJECT_REF

# 데이터베이스 마이그레이션
supabase db push --project-ref YOUR_PROJECT_REF
```

## 🎯 성공 지표

### 기술적 목표
- **응답 시간**: < 100ms (Supabase 글로벌 네트워크)
- **가용성**: 99.9% (Supabase SLA)
- **동시 접속**: 1000명+ (자동 스케일링)
- **데이터 일관성**: ACID 트랜잭션 보장

### 교육적 목표
- **실시간 상호작용**: 지연 없는 채팅
- **안정적인 AI 응답**: 높은 성공률
- **사용자 경험**: 직관적인 인터페이스
- **데이터 분석**: 학습 패턴 추적

---

이 계획서는 Supabase의 강력한 BaaS 기능을 활용하여 빠르고 안정적인 AI 교육 플랫폼을 구축하는 현실적인 로드맵을 제시합니다. 백엔드 개발 시간을 크게 단축하면서도 엔터프라이즈급 기능을 제공할 수 있습니다.