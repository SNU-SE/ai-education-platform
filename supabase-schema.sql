-- AI 교육 플랫폼 데이터베이스 스키마
-- Supabase SQL Editor에서 실행

-- 1. 사용자 역할 관리 테이블
CREATE TABLE user_roles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  role TEXT NOT NULL CHECK (role IN ('admin', 'student')),
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 활동 관리 테이블
CREATE TABLE activities (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  content JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. AI 채팅 로그 테이블
CREATE TABLE chat_logs (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  message TEXT NOT NULL,
  ai_response TEXT,
  activity_id INTEGER REFERENCES activities(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. 파일 관리 테이블
CREATE TABLE files (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  filename TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. 학생 응답 테이블 (논증, 평가 통합)
CREATE TABLE student_responses (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  activity_id INTEGER REFERENCES activities(id),
  response_type TEXT CHECK (response_type IN ('argumentation', 'evaluation')),
  content TEXT NOT NULL,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. RAG용 문서 청크 테이블 (Vector 검색)
CREATE TABLE document_chunks (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  embedding VECTOR(1536), -- OpenAI embeddings
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. RLS (Row Level Security) 정책 설정
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_responses ENABLE ROW LEVEL SECURITY;

-- 사용자는 본인 데이터만 접근
CREATE POLICY "Users can view own user roles" ON user_roles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can view own chat logs" ON chat_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own chat logs" ON chat_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own files" ON files
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own files" ON files
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own responses" ON student_responses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own responses" ON student_responses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 관리자는 모든 데이터 접근
CREATE POLICY "Admins can view all chat logs" ON chat_logs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can view all files" ON files
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can view all responses" ON student_responses
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_roles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 8. Vector 검색 함수 (pgvector extension 필요)
CREATE OR REPLACE FUNCTION match_documents (
  query_embedding VECTOR(1536),
  similarity_threshold FLOAT DEFAULT 0.8,
  match_count INT DEFAULT 5
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

-- 9. 기본 데이터 삽입 (관리자 계정용)
-- 참고: 실제 사용 시에는 회원가입을 통해 생성