## 지원되는 모델

1. Amazon Nova
2. 클로드
3. DeepSeek
4. 키미
5. MiniMax
6. OpenAI

## 단계

1. AWS 계정
2. API 키
3. SDK 가져오기
4. 환경변수 설정
   1. Messages API
      1. API_KEY="<provide your Bedrock API key>"
      2. BASE_URL="https://bedrock-mantle.<your-region>.api.aws/anthropic"
   2. Response/Char Completions API
      1. API_KEY="<provide your Bedrock API key>"
      2. BASE_URL="https://bedrock-mantle.<your-region>.api.aws/v1"
   3. Invoke/Converse API
      1. AWS_BEARER_TOKEN_BEDROCK="<provide your Bedrock API key>"



## WAS 환경변수에 추가
AWS_REGION=ap-northeast-2
AWS_ACCESS_KEY_ID=발급받은_ACCESS_KEY
AWS_SECRET_ACCESS_KEY=발급받은_SECRET_KEY

## 확인해야 할 부분

1. System Prompt 설정
   1. 어떤 챗봇인지 뭘로 답변할지 등등
2. 차단 기준
3. aws account
4. 답변 기준
   1. 키워드?

## 물어볼 내용

- 개발 서버에서 테스트해봐야 할 것 같은데 aws 계정이 어떻게 되는지
- 애플리케이션 서버에서 사용할 인증 방식은 ACCESS TOKEN이 있는데 이걸로 진행해도 되는지
- Bedrock의 모델은 어떤 것을 사용할 건지(예: OpenAI, Anthropic)
- 답변 품질 기준은 무엇인지
- 사용량
  - 사용자 또는 하루, 월 호출량에 대해서 제한을 둘지
- 챗봇 답변 범위
- Bedrock에 전송해도 되는 데이터 범위
- 대화 관련된 이력을 남기는 것이 필요한지

1. 개발 서버에서 테스트를 위한 AWS 계정
2. 사용할 Bedrock 모델(예: OpenAI, Anthropic)
3. 인증 방식은 ACCESS TOKEN을 사용할 예정인데 이대로 진행해도 될까요?
4. Bedrock에 로그인 사용자 정보를 보내도 되는지
5. 업무 외 질문 차단 정책
6. 월 비용 한도와 호출 제한 여부

---

## 준비

1. AWS 쪽 준비
- 업무 가이드 PDF를 S3에 업로드
- Bedrock Knowledge Base 생성
- S3 data source 연결
- Sync 실행
- 
- 생성된 knowledgeBaseId 확인
- 답변 생성에 사용할 modelArn 확인
- IAM에 권한 부여
  - bedrock:Retrieve
  - bedrock:RetrieveAndGenerate
  - bedrock:InvokeModel

2. FCMS properties 설정

3. WAS 서버 환경변수 등록
- AWS Console -> IAM -> Users -> IAM User 생성 -> Security Credential -> Create access key
   - AWS_ACCESS_KEY_ID
   - AWS_SECRET_ACCESS_KEY

#### 임시 자격 증명
보안에 유리한데
EC2 IAM Role 방식으로 Bedrock 권한을 붙일 수 있어여 함

#### 추가
사용자 질문 로그 관련 추가??