# AI 교육 챗봇 앱 개발 계획서

## 🎯 프로젝트 개요
STRUCTURE.md 기반 AI 교육 플랫폼을 PostgreSQL + Node.js + React 스택으로 구축하여 Hostinger VPS에서 완전 자체 호스팅

## 🏗️ 기술 스택

### 프론트엔드
- **React 18.3.1** + **TypeScript**
- **Vite** (빌드 도구)
- **Tailwind CSS** + **shadcn/ui**
- **React Router DOM 6.26.2**
- **TanStack React Query 5.56.2**
- **Socket.io-client** (실시간 통신)

### 백엔드
- **Node.js** + **Express.js**
- **TypeScript**
- **Socket.io** (실시간 기능)
- **JWT** (인증)
- **Multer** (파일 업로드)
- **Prisma ORM** (데이터베이스 ORM)

### 데이터베이스
- **PostgreSQL 15+**
- **pgvector extension** (Vector 검색)
- **Redis** (세션 저장소)

### AI 통합
- **OpenAI API** (GPT 모델)
- **Anthropic Claude API**
- **pdf-parse** (PDF 처리)
- **@xenova/transformers** (임베딩)

### 배포 환경
- **Hostinger VPS** (Ubuntu 22.04)
- **Nginx** (리버스 프록시)
- **PM2** (프로세스 관리)
- **SSL/TLS** (Let's Encrypt)

## 📅 개발 일정 (총 12-16일)

### Phase 1: 환경 설정 및 기초 구조 (2-3일)
**Day 1-2: 프로젝트 초기화**
- React + Vite + TypeScript 프로젝트 생성
- 폴더 구조 설정 (STRUCTURE.md 기반)
- TailwindCSS, shadcn/ui 설치 및 설정
- 기본 라우팅 구조 구축

**Day 2-3: 백엔드 설정**
- Node.js + Express + TypeScript 프로젝트 생성
- PostgreSQL 데이터베이스 설치 및 설정
- Prisma ORM 설정 및 스키마 정의
- 기본 API 구조 및 미들웨어 설정

### Phase 2: 데이터베이스 및 인증 시스템 (3-4일)
**Day 4-5: 데이터베이스 구축**
- STRUCTURE.md의 36개 테이블 마이그레이션
- pgvector extension 설치 및 설정
- 데이터베이스 시드 데이터 생성
- 기본 CRUD API 엔드포인트 구축

**Day 6-7: 인증 시스템**
- JWT 기반 인증 시스템 구현
- 사용자 등록/로그인 API
- 역할 기반 접근 제어 (RBAC)
- 프론트엔드 인증 컴포넌트 및 라우트 가드

### Phase 3: 핵심 기능 개발 (4-5일)
**Day 8-9: AI 채팅 시스템**
- OpenAI/Claude API 통합
- 실시간 채팅 (Socket.io)
- 메시지 저장 및 히스토리
- 파일 업로드 기능

**Day 10-11: 관리자 대시보드**
- 학생 관리 인터페이스
- 활동 생성/편집 기능
- 실시간 모니터링 대시보드
- 클래스 관리 시스템

**Day 11-12: 학생 인터페이스**
- 활동 참여 화면
- 논증/토론 기능
- 체크리스트 진행상황
- 동료평가 시스템

### Phase 4: 고급 기능 (2-3일)
**Day 13-14: RAG 시스템**
- PDF 업로드 및 텍스트 추출
- 문서 청킹 및 임베딩 생성
- Vector 검색 API
- 문서 기반 AI 답변

**Day 14-15: 실시간 기능 완성**
- Socket.io 실시간 업데이트
- 학생 온라인 상태 추적
- 실시간 알림 시스템
- 세션 관리 최적화

### Phase 5: VPS 배포 및 최적화 (1-2일)
**Day 15-16: 배포**
- Hostinger VPS 서버 설정
- PostgreSQL, Redis, Nginx 설치
- PM2로 Node.js 앱 배포
- SSL 인증서 설정 및 도메인 연결
- 성능 최적화 및 모니터링 설정

## 🏛️ 시스템 아키텍처

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React App     │    │   Node.js API    │    │  PostgreSQL     │
│   (Frontend)    │────│   (Backend)      │────│   Database      │
│                 │    │                  │    │                 │
│ • 학생 인터페이스 │    │ • REST API       │    │ • 36개 테이블    │
│ • 관리자 대시보드 │    │ • Socket.io      │    │ • pgvector      │
│ • 실시간 채팅    │    │ • JWT 인증       │    │ • 인덱싱        │
└─────────────────┘    │ • 파일 업로드    │    └─────────────────┘
                       └──────────────────┘
                                │
                       ┌──────────────────┐
                       │     Redis        │
                       │  (Session Store) │
                       └──────────────────┘
```

## 📁 프로젝트 구조

```
ai-education-platform/
├── frontend/                    # React 프론트엔드
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/          # 관리자 컴포넌트
│   │   │   ├── student/        # 학생 컴포넌트
│   │   │   ├── auth/           # 인증 컴포넌트
│   │   │   └── ui/             # 공통 UI 컴포넌트
│   │   ├── pages/              # 페이지 컴포넌트
│   │   ├── hooks/              # 커스텀 훅
│   │   ├── types/              # TypeScript 타입
│   │   ├── utils/              # 유틸리티 함수
│   │   └── lib/                # 라이브러리 설정
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                     # Node.js 백엔드
│   ├── src/
│   │   ├── controllers/        # API 컨트롤러
│   │   ├── middleware/         # 미들웨어
│   │   ├── routes/             # API 라우트
│   │   ├── services/           # 비즈니스 로직
│   │   ├── utils/              # 유틸리티
│   │   ├── types/              # TypeScript 타입
│   │   └── socket/             # Socket.io 핸들러
│   ├── prisma/
│   │   ├── schema.prisma       # 데이터베이스 스키마
│   │   └── migrations/         # 마이그레이션 파일
│   ├── package.json
│   └── tsconfig.json
│
├── docs/                        # 문서
│   ├── api.md                  # API 문서
│   ├── deployment.md           # 배포 가이드
│   └── database.md             # 데이터베이스 스키마
│
├── scripts/                     # 배포 스크립트
│   ├── deploy.sh               # 배포 스크립트
│   ├── backup.sh               # 백업 스크립트
│   └── setup-vps.sh            # VPS 초기 설정
│
├── docker-compose.yml           # 로컬 개발용
├── .env.example                # 환경 변수 예제
└── README.md
```

## 🔧 주요 기능 구현 방식

### 1. 실시간 채팅 시스템
```typescript
// Socket.io를 활용한 실시간 메시징
- 사용자별 Room 관리
- 메시지 전송/수신 이벤트
- 온라인 상태 추적
- 채팅 히스토리 자동 저장
```

### 2. AI 통합
```typescript
// OpenAI/Claude API 래퍼
- 스트리밍 응답 지원
- RAG 기반 문서 검색
- 프롬프트 템플릿 관리
- 사용량 모니터링
```

### 3. Vector 검색 (RAG)
```sql
-- pgvector를 활용한 유사도 검색
- 문서 임베딩 저장
- 코사인 유사도 검색
- 하이브리드 검색 (키워드 + 벡터)
```

### 4. 파일 업로드 시스템
```typescript
// Multer + 로컬 스토리지
- PDF 파일 텍스트 추출
- 이미지 파일 처리
- 파일 크기/타입 검증
- 안전한 파일 저장
```

## 🚀 배포 환경 설정

### Hostinger VPS 사양 권장
- **CPU**: 2 vCPU 이상
- **RAM**: 4GB 이상
- **Storage**: 50GB SSD 이상
- **OS**: Ubuntu 22.04 LTS

### 필수 소프트웨어 설치
```bash
# Node.js 18+
# PostgreSQL 15+
# Redis 7+
# Nginx
# PM2
# Let's Encrypt (Certbot)
```

### 보안 설정
- **방화벽**: UFW 설정
- **SSL/TLS**: Let's Encrypt 자동 갱신
- **JWT**: 안전한 시크릿 키 관리
- **CORS**: 적절한 도메인 제한
- **Rate Limiting**: API 호출 제한

## 📊 성능 최적화 계획

### 프론트엔드 최적화
- React Query 캐싱 전략
- 코드 스플리팅 (React.lazy)
- 이미지 최적화
- 번들 크기 최소화

### 백엔드 최적화
- 데이터베이스 인덱싱
- API 응답 캐싱 (Redis)
- 쿼리 최적화
- 커넥션 풀링

### 데이터베이스 최적화
- 적절한 인덱스 설정
- 쿼리 성능 모니터링
- 정기적인 VACUUM
- 백업 자동화

## 💰 예상 비용 (월간)

- **Hostinger VPS**: $7.99 (4GB RAM)
- **도메인**: $1.25 (연간 $15)
- **OpenAI API**: $20-50 (사용량 기반)
- **Claude API**: $10-30 (사용량 기반)

**총 월간 비용**: $39-89

## 🎯 성공 지표

### 기술적 목표
- **응답 시간**: API 응답 < 200ms
- **동시 접속**: 100명 이상 지원
- **가용성**: 99.5% 업타임
- **보안**: 취약점 Zero

### 교육적 목표
- **학생 참여도**: 실시간 모니터링
- **AI 상호작용**: 자연스러운 대화
- **학습 효과**: 논증 능력 향상
- **사용자 만족도**: 긍정적 피드백

---

이 계획서는 STRUCTURE.md의 모든 기능을 포함하면서도 완전한 자체 호스팅이 가능한 현실적인 로드맵을 제시합니다.