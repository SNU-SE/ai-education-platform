# AI 교육 챗봇 개발 태스크 리스트 (GitHub Pages + Supabase)

> plan(github-pages).md 기반으로 작성된 단계별 개발 가이드
> **목표**: 11개 Git Checkpoint를 통한 안정적 개발 진행

## 🎯 프로젝트 개요
GitHub Pages + Supabase를 활용한 **완전 무료** AI 교육 플랫폼 개발

---

## 📋 Phase 1: 환경 설정 및 기초 구조 (Day 1-2)

### 🚀 Phase 1.1: GitHub Repository 및 환경 설정 (Day 1)

#### ✅ **Git Checkpoint 1**: 기본 repository 구조 완료

#### T1.1.1: GitHub Repository 생성
- [ ] GitHub에서 새 Repository 생성
  - Repository name: `ai-education-platform`
  - Public으로 설정
  - README.md, .gitignore (Node.js) 추가
- [ ] 로컬에 clone
  ```bash
  git clone https://github.com/YOUR_USERNAME/ai-education-platform.git
  cd ai-education-platform
  ```
- [ ] GitHub Pages 활성화
  - Settings → Pages → Source: GitHub Actions

#### T1.1.2: Supabase 프로젝트 생성
- [ ] https://supabase.com에서 새 프로젝트 생성
  - 프로젝트명: ai-education-platform
  - Region: Northeast Asia (Singapore)
- [ ] API Keys 확인 (URL, anon key)
- [ ] GitHub Repository Secrets 추가
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`

#### T1.1.3: 로컬 개발환경 구축
- [ ] Node.js v18+ 설치 확인
- [ ] Git 설정 확인
- [ ] 에디터 설정 (VS Code 추천)

**🔄 Git Push 1**: 기본 환경 설정 완료

### 🏗️ Phase 1.2: React 프로젝트 초기화 (Day 1)

#### ✅ **Git Checkpoint 2**: React 프로젝트 기본 구조 완료

#### T1.2.1: React + Vite + TypeScript 프로젝트 생성
- [ ] Vite 프로젝트 생성
  ```bash
  npm create vite@latest . -- --template react-ts
  npm install
  ```
- [ ] 프로젝트 구조 확인
- [ ] 개발 서버 실행 테스트 (`npm run dev`)

#### T1.2.2: 필수 패키지 설치
```bash
# 핵심 라이브러리
npm install @supabase/supabase-js @tanstack/react-query react-router-dom

# UI 라이브러리
npm install tailwindcss @tailwindcss/typography autoprefixer postcss
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu
npm install lucide-react class-variance-authority clsx tailwind-merge
```

#### T1.2.3: 개발 도구 설치
```bash
npm install -D @types/node
npm install -D eslint @typescript-eslint/eslint-plugin
npm install -D prettier eslint-config-prettier
```

#### T1.2.4: GitHub Pages용 Vite 설정
- [ ] `vite.config.ts` 수정
  ```typescript
  export default defineConfig({
    plugins: [react()],
    base: '/ai-education-platform/', // Repository 이름
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
    },
  })
  ```

#### T1.2.5: TailwindCSS 설정
- [ ] Tailwind 초기화
  ```bash
  npx tailwindcss init -p
  ```
- [ ] `tailwind.config.js` 설정
- [ ] `src/index.css`에 Tailwind directives 추가
- [ ] 기본 스타일 확인

#### T1.2.6: 기본 폴더 구조 생성
```
src/
├── components/
│   ├── admin/        # 관리자 컴포넌트
│   ├── student/      # 학생 컴포넌트  
│   ├── auth/         # 인증 컴포넌트
│   └── ui/           # 공통 UI 컴포넌트
├── pages/            # 페이지 컴포넌트
├── hooks/            # 커스텀 훅
├── types/            # TypeScript 타입
├── utils/            # 유틸리티 함수
└── lib/              # 라이브러리 설정
    ├── supabase.ts   # Supabase 클라이언트
    └── auth.ts       # 인증 헬퍼
```

**🔄 Git Push 2**: React 프로젝트 구조 완료

### 🔧 Phase 1.3: Supabase 연동 및 기본 설정 (Day 1)

#### ✅ **Git Checkpoint 3**: Supabase 연동 및 라우팅 설정 완료

#### T1.3.1: Supabase 클라이언트 설정
- [ ] `src/lib/supabase.ts` 생성
  ```typescript
  import { createClient } from '@supabase/supabase-js'
  
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
  
  export const supabase = createClient(supabaseUrl, supabaseAnonKey)
  ```
- [ ] 환경변수 로드 테스트

#### T1.3.2: TypeScript 타입 정의
- [ ] `src/types/database.ts` 생성
- [ ] Supabase 테이블 타입 정의 작성
- [ ] 기본 인터페이스 정의

#### T1.3.3: React Router 설정 (GitHub Pages용)
- [ ] `src/App.tsx` 라우터 설정
  ```typescript
  import { BrowserRouter } from 'react-router-dom'
  
  function App() {
    return (
      <BrowserRouter basename="/ai-education-platform">
        {/* 라우트 컴포넌트들 */}
      </BrowserRouter>
    )
  }
  ```
- [ ] 기본 페이지 컴포넌트 생성
  - `pages/Login.tsx`
  - `pages/AdminDashboard.tsx`
  - `pages/StudentDashboard.tsx`

#### T1.3.4: 404.html 파일 생성 (SPA 라우팅용)
- [ ] `public/404.html` 생성
  ```html
  <!DOCTYPE html>
  <html>
  <head>
    <script>
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

#### T1.3.5: 기본 레이아웃 및 컴포넌트
- [ ] `components/ui/Layout.tsx` 생성
- [ ] `components/ui/Loading.tsx` 생성
- [ ] 기본 스타일링 적용

**🔄 Git Push 3**: Supabase 연동 완료

---

## 📋 Phase 2: 인증 시스템 및 기본 UI (Day 2-3)

### 🔐 Phase 2.1: Supabase Database 스키마 생성 (Day 2)

#### ✅ **Git Checkpoint 4**: 인증 시스템 완료

#### T2.1.1: Supabase 데이터베이스 스키마 생성
- [ ] Supabase 대시보드에서 테이블 생성
  - `user_roles` 테이블
  - `activities` 테이블  
  - `chat_logs` 테이블
  - `files` 테이블
  - `student_responses` 테이블
  - `document_chunks` 테이블 (Vector 지원)
- [ ] RLS (Row Level Security) 정책 설정
- [ ] 기본 데이터 삽입

#### T2.1.2: Supabase Vector Extension 설정
- [ ] pgvector extension 활성화
- [ ] Vector 검색 함수 생성
- [ ] 임베딩 저장 구조 설정

**🔄 Git Push 4**: 데이터베이스 스키마 완료

### 👥 Phase 2.2: 인증 시스템 구현 (Day 2)

#### ✅ **Git Checkpoint 5**: 기본 UI 구조 완료

#### T2.2.1: 인증 Hook 개발
- [ ] `src/hooks/useAuth.ts` 생성
  - Supabase Auth 연동
  - 사용자 상태 관리
  - 역할 기반 권한 체크
- [ ] `src/contexts/AuthContext.tsx` 생성

#### T2.2.2: 인증 컴포넌트 구현
- [ ] `components/auth/LoginForm.tsx`
  - 이메일/비밀번호 로그인
  - 폼 검증
  - 에러 처리
- [ ] `components/auth/SignUpForm.tsx`
  - 회원가입 폼
  - 역할 선택 (admin/student)
  - user_roles 테이블에 데이터 저장
- [ ] `components/auth/ProtectedRoute.tsx`
  - 인증된 사용자만 접근 가능
  - 역할 기반 라우팅

#### T2.2.3: 역할 기반 라우팅 구현
- [ ] 관리자 전용 경로 설정
- [ ] 학생 전용 경로 설정  
- [ ] 리다이렉션 로직

**🔄 Git Push 5**: 인증 시스템 완료

### 🎨 Phase 2.3: UI/UX 기본 구조 (Day 3)

#### ✅ **Git Checkpoint 6**: AI 채팅 시스템 완료

#### T2.3.1: shadcn/ui 컴포넌트 설정
- [ ] shadcn/ui 초기화
  ```bash
  npx shadcn-ui@latest init
  npx shadcn-ui@latest add button input card dialog
  ```
- [ ] 공통 UI 컴포넌트 커스터마이징

#### T2.3.2: 레이아웃 컴포넌트 개발
- [ ] `components/admin/AdminLayout.tsx`
  - 사이드바 네비게이션
  - 헤더 (로그아웃, 프로필)
  - 메인 컨텐츠 영역
- [ ] `components/student/StudentLayout.tsx`
  - 단순화된 네비게이션
  - 채팅 인터페이스 영역
  - 활동 참여 영역

#### T2.3.3: 반응형 디자인 기본 구조
- [ ] 모바일 우선 반응형 설계
- [ ] 브레이크포인트 설정
- [ ] 터치 친화적 인터페이스

**🔄 Git Push 6**: 기본 UI 완료

---

## 📋 Phase 3: AI 채팅 및 핵심 기능 (Day 3-5)

### 💬 Phase 3.1: AI 채팅 시스템 (Day 3-4)

#### ✅ **Git Checkpoint 7**: 기본 사용자 인터페이스 완료

#### T3.1.1: Supabase Edge Functions 개발
- [ ] `supabase/functions/ai-chat/index.ts` 생성
  - OpenAI API 통합
  - 사용자 메시지 처리
  - AI 응답 생성 및 저장
  - CORS 설정
- [ ] 로컬 개발용 Supabase CLI 설정
  ```bash
  npm install -g supabase
  supabase functions new ai-chat
  ```

#### T3.1.2: 채팅 Hook 개발
- [ ] `src/hooks/useChat.ts` 생성
  - 실시간 메시지 동기화
  - Supabase Realtime 구독
  - 메시지 전송/수신 로직
  - 채팅 히스토리 관리
#### T3.1.3: 실시간 채팅 인터페이스
- [ ] `components/student/ChatInterface.tsx`
  - 메시지 리스트 (무한 스크롤)
  - 메시지 입력창
  - 파일 첨부 기능
  - AI 응답 스트리밍 표시
  - 타이핑 인디케이터
- [ ] `components/ui/MessageBubble.tsx`
- [ ] `components/ui/TypingIndicator.tsx`

#### T3.1.4: 채팅 히스토리 관리
- [ ] 메시지 검색 기능
- [ ] 채팅 기록 내보내기
- [ ] 메시지 삭제 기능
- [ ] 채팅방별 관리

**🔄 Git Push 7**: AI 채팅 시스템 완료

### 👥 Phase 3.2: 관리자 및 학생 인터페이스 (Day 4-5)

#### ✅ **Git Checkpoint 8**: RAG 시스템 완료

#### T3.2.1: 관리자 대시보드
- [ ] `pages/admin/Dashboard.tsx`
  - 학생 현황 요약
  - 최근 활동 통계
  - 시스템 상태 모니터링
- [ ] `pages/admin/StudentManagement.tsx`
  - 학생 목록 및 검색
  - 학생 등록/편집
  - 학생 활동 기록 조회
- [ ] `pages/admin/ActivityManagement.tsx`
  - 활동 생성/편집
  - 체크리스트 관리
  - 활동 진행상황 모니터링

#### T3.2.2: 학생 인터페이스
- [ ] `pages/student/StudentDashboard.tsx`
  - 참여 가능한 활동 목록
  - 개인 진행상황
  - 최근 채팅 요약
- [ ] `pages/student/ActivityParticipation.tsx`
  - 활동 세부 내용
  - 체크리스트 인터페이스
  - 진행률 시각화
- [ ] `pages/student/ChatHistory.tsx`
  - 이전 채팅 기록
  - 즐겨찾기 기능

#### T3.2.3: 체크리스트 시스템
- [ ] `components/student/Checklist.tsx`
  - 체크리스트 항목 표시
  - 완료/미완료 상태 관리
  - 진행률 시각화
  - 완료 히스토리

#### T3.2.4: 기본 논증/평가 기능
- [ ] 논증 작성 인터페이스
- [ ] 간단한 평가 시스템
- [ ] 학생 응답 저장 및 조회

**🔄 Git Push 8**: 사용자 인터페이스 완료

---

## 📋 Phase 4: 고급 기능 및 최적화 (Day 5-7)

### 📄 Phase 4.1: RAG 시스템 및 파일 처리 (Day 5-6)

#### ✅ **Git Checkpoint 9**: 배포 자동화 완료

#### T4.1.1: PDF 처리 Edge Function
- [ ] `supabase/functions/process-pdf/index.ts` 생성
  - PDF 텍스트 추출
  - 문서 청킹 알고리즘
  - 메타데이터 추출
  - Vector 임베딩 생성

#### T4.1.2: Vector 검색 구현
- [ ] `supabase/functions/rag-search/index.ts` 생성
  - 코사인 유사도 검색
  - 하이브리드 검색 (키워드 + 벡터)
  - 검색 결과 랭킹
- [ ] Supabase Vector 컬럼 활용
- [ ] 검색 성능 최적화

#### T4.1.3: 파일 업로드/관리 시스템
- [ ] Supabase Storage 연동
- [ ] 파일 업로드 인터페이스
- [ ] 파일 타입 검증
- [ ] 안전한 파일 저장
- [ ] 파일 다운로드 기능

#### T4.1.4: 문서 기반 AI 답변
- [ ] RAG 시스템과 AI 채팅 통합
- [ ] 관련 문서 검색 및 컨텍스트 구성
- [ ] 출처 표시 기능
- [ ] 답변 품질 향상

**🔄 Git Push 9**: RAG 시스템 완료

### 🚀 Phase 4.2: 배포 및 자동화 (Day 6-7)

#### ✅ **Git Checkpoint 10**: 모바일 최적화 완료

#### T4.2.1: GitHub Actions 워크플로우
- [ ] `.github/workflows/deploy.yml` 생성
  ```yaml
  name: Deploy to GitHub Pages
  on:
    push:
      branches: [ main ]
  jobs:
    build-and-deploy:
      runs-on: ubuntu-latest
      steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
  ```
- [ ] 환경변수 주입 설정
- [ ] 빌드 최적화

#### T4.2.2: 성능 최적화
- [ ] 코드 스플리팅 설정
  ```typescript
  // vite.config.ts
  export default defineConfig({
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            supabase: ['@supabase/supabase-js']
          }
        }
      }
    }
  })
  ```
- [ ] 이미지 최적화
- [ ] 캐싱 전략 구현
- [ ] Bundle 크기 최적화

#### T4.2.3: 에러 처리 및 UX 개선
- [ ] 전역 에러 바운더리
- [ ] 로딩 상태 관리
- [ ] 오프라인 감지 및 처리
- [ ] 사용자 피드백 시스템
- [ ] 접근성 개선

#### T4.2.4: 모바일 반응형 최적화
- [ ] 모바일 터치 인터페이스
- [ ] 반응형 레이아웃 완성
- [ ] PWA 기능 추가 (옵션)
- [ ] 성능 모니터링 설정

**🔄 Git Push 10**: 배포 최적화 완료

### 🧪 Phase 4.3: 테스트 및 문서화 (Day 7)

#### ✅ **Git Checkpoint 11**: 테스트 및 문서화 완료

#### T4.3.1: 전체 기능 테스트
- [ ] 사용자 인증 테스트
- [ ] AI 채팅 기능 테스트
- [ ] 파일 업로드/RAG 테스트
- [ ] 관리자/학생 인터페이스 테스트
- [ ] 모바일 환경 테스트
- [ ] 크로스 브라우저 테스트

#### T4.3.2: 사용자 가이드 작성
- [ ] README.md 업데이트
  - 프로젝트 설명
  - 설치 및 실행 가이드
  - 배포 방법
  - 환경변수 설정
- [ ] 관리자 사용 가이드
- [ ] 학생 사용 가이드

#### T4.3.3: 버그 수정 및 최종 배포
- [ ] 발견된 버그 수정
- [ ] 성능 이슈 해결
- [ ] 최종 GitHub Pages 배포
- [ ] 도메인 연결 (옵션)

#### T4.3.4: 배포 후 검증
- [ ] 프로덕션 환경 기능 테스트
- [ ] SSL 인증서 확인
- [ ] 성능 모니터링
- [ ] 사용자 피드백 수집

**🔄 Git Push 11**: 최종 배포 완료

---

## 🚀 빠른 시작 가이드

### 1. Repository 생성 및 클론
```bash
# GitHub에서 새 repository 생성 후
git clone https://github.com/YOUR_USERNAME/ai-education-platform.git
cd ai-education-platform
```

### 2. React 프로젝트 초기화
```bash
npm create vite@latest . -- --template react-ts
npm install
npm install @supabase/supabase-js @tanstack/react-query react-router-dom
npm install tailwindcss autoprefixer postcss
npx tailwindcss init -p
npm run dev  # 개발 서버 실행
```

### 3. Supabase 설정
- https://supabase.com에서 새 프로젝트 생성
- Database → SQL Editor에서 스키마 생성
- API Keys를 GitHub Repository Secrets에 추가

### 4. 첫 배포
```bash
git add .
git commit -m "feat: initial project setup"
git push origin main
```

---

## 📊 진행 상황 체크리스트

### Phase별 완료 기준

#### ✅ Phase 1 완료 기준 (Day 1-2)
- [ ] GitHub Repository 및 GitHub Pages 활성화
- [ ] Supabase 프로젝트 생성 및 연동
- [ ] React 프로젝트가 localhost에서 정상 실행
- [ ] 기본 폴더 구조 및 라우팅 설정
- [ ] 환경변수 설정 완료

#### ✅ Phase 2 완료 기준 (Day 2-3)
- [ ] Supabase 데이터베이스 스키마 생성
- [ ] 사용자 인증 시스템 정상 작동
- [ ] 역할 기반 라우팅 구현
- [ ] 기본 UI 컴포넌트 완성
- [ ] 관리자/학생 레이아웃 구조

#### ✅ Phase 3 완료 기준 (Day 3-5)
- [ ] AI 채팅 기능 정상 작동
- [ ] Supabase Edge Functions 배포
- [ ] 실시간 메시징 구현
- [ ] 관리자 대시보드 기본 기능
- [ ] 학생 인터페이스 핵심 기능

#### ✅ Phase 4 완료 기준 (Day 5-7)
- [ ] PDF 업로드 및 RAG 시스템 구현
- [ ] GitHub Actions 자동 배포 설정
- [ ] 성능 최적화 완료
- [ ] 모바일 반응형 지원
- [ ] GitHub Pages에서 정상 배포

### 현재 작업 중
- **Phase**: 
- **Checkpoint**: 
- **진행률**: 0%

### 다음 단계
1. **Checkpoint 1**부터 순서대로 시작
2. 각 Git Push 후 GitHub Pages 배포 확인
3. 문제 발생 시 해당 단계에서 해결 후 진행

---

## 💡 개발 팁 및 주의사항

### GitHub Pages 관련
- `vite.config.ts`에서 정확한 base path 설정
- SPA 라우팅을 위한 `404.html` 파일 필수
- 환경변수는 `VITE_` 접두사 필요

### Supabase 관련
- API 키는 반드시 GitHub Secrets에 저장
- RLS 정책 설정으로 데이터 보안 확보
- Edge Functions는 로컬에서 먼저 테스트

### AI API 관련
- OpenAI API 키 보안 관리
- API 사용량 모니터링
- 에러 핸들링 및 폴백 시스템

### 성능 최적화
- 코드 스플리팅으로 초기 로딩 속도 개선
- 이미지 및 정적 자산 최적화
- React Query로 데이터 캐싱

### 문제 해결 가이드
- **배포 실패**: GitHub Actions 로그 확인
- **Supabase 연결 오류**: 환경변수 및 CORS 설정
- **AI API 오류**: API 키 및 사용량 한도
- **라우팅 문제**: basename 설정 확인

---

**🎯 목표**: GitHub Pages + Supabase로 완전 무료 AI 교육 플랫폼 구축
**✨ 특징**: 11개 Git Checkpoint를 통한 체계적 개발 진행



