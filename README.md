# AI 교육 챗봇 플랫폼

> GitHub Pages + Supabase를 활용한 무료 AI 교육 플랫폼

## 🎯 프로젝트 개요

이 프로젝트는 교육용 AI 챗봇 플랫폼으로, 다음과 같은 핵심 기능을 제공합니다:

- 🤖 **AI 채팅 시스템**: OpenAI API를 활용한 실시간 AI 대화
- 👥 **역할 기반 접근**: 관리자와 학생을 위한 각기 다른 인터페이스
- 📚 **RAG 시스템**: PDF 문서 기반 질의응답
- 📊 **학습 관리**: 활동 관리 및 진행상황 추적
- 🔐 **보안 인증**: Supabase Auth를 활용한 안전한 사용자 관리

## 🏗️ 기술 스택

### 프론트엔드 & 배포
- **React 18** + **TypeScript**
- **Vite** (빌드 도구)
- **Tailwind CSS** + **shadcn/ui**
- **React Router DOM**
- **TanStack React Query**
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
- **Vector Embeddings** (Supabase Vector)

## 🚀 빠른 시작

### 1. Repository 클론
```bash
git clone https://github.com/YOUR_USERNAME/ai-education-platform.git
cd ai-education-platform
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경변수 설정
`.env.local` 파일을 생성하고 다음 변수들을 설정하세요:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. 개발 서버 실행
```bash
npm run dev
```

## 📁 프로젝트 구조

```
src/
├── components/
│   ├── admin/              # 관리자 컴포넌트
│   ├── student/            # 학생 컴포넌트  
│   ├── auth/               # 인증 컴포넌트
│   └── ui/                 # 공통 UI 컴포넌트
├── pages/                  # 페이지 컴포넌트
├── hooks/                  # 커스텀 훅
├── types/                  # TypeScript 타입
├── utils/                  # 유틸리티 함수
└── lib/                    # 라이브러리 설정
    ├── supabase.ts         # Supabase 클라이언트
    └── auth.ts             # 인증 헬퍼
```

## 🔧 개발 스크립트

```bash
npm run dev          # 개발 서버 실행
npm run build        # 프로덕션 빌드
npm run preview      # 빌드 결과 미리보기
npm run lint         # 코드 린팅
```

## 🌐 배포

이 프로젝트는 GitHub Actions를 통해 자동으로 GitHub Pages에 배포됩니다.

1. GitHub Repository에 코드 푸시
2. GitHub Actions가 자동으로 빌드 및 배포
3. `https://YOUR_USERNAME.github.io/ai-education-platform`에서 접근 가능

## 📊 개발 진행 상황

현재 개발 단계: **Phase 1 - 환경 설정**

- [x] Git 저장소 초기화
- [ ] React 프로젝트 생성
- [ ] Supabase 연동
- [ ] 기본 UI 구조
- [ ] 인증 시스템
- [ ] AI 채팅 기능
- [ ] RAG 시스템
- [ ] 배포 및 최적화

## 💰 비용

**개발 단계**: 완전 무료
- GitHub Pages: 무료
- Supabase: 무료 티어 (500MB DB, 50만 API 요청/월)
- OpenAI API: $5 무료 크레딧

**확장 시**: 월 $25-45 (사용량에 따라)

## 📄 라이선스

MIT License

## 🤝 기여

이슈 리포트나 풀 리퀘스트는 언제든 환영합니다!

---

**🎯 목표**: GitHub Pages + Supabase로 완전 무료 AI 교육 플랫폼 구축  
**✨ 특징**: 11개 Git Checkpoint를 통한 체계적 개발 진행