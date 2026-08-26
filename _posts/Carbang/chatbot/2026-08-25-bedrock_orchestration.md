```
사용자 질문
   │
   ▼
ChatbotService
   │
   ├─ ① ChatbotMemoryService
   │      최근 대화 조회
   │
   ├─ ② QueryAnalyzerService
   │      질문 분석
   │      → QueryAnalysis
   │      → DecisionQuery D1, D2...
   │      → UserCondition
   │
   ├─ ③ KnowledgeRetrievalService
   │      Decision별 KB Retrieve
   │      → RetrievedEvidence
   │      → decisionId / decisionTopic 연결
   │
   ├─ ④ EvidenceResolverService
   │      Evidence 선별
   │      → selectedIndexes
   │      → ResolvedDecision
   │      → conflict 판단
   │
   ├─ ⑤ AnswerGeneratorService
   │      최종 사용자 답변 생성
   │
   ├─ ⑥ AnswerValidatorService
   │      HIGH 질문만 검증
   │
   ├─ ⑦ 출처 추가
   │
   └─ ⑧ ChatbotMemoryService
          질문 + 답변 저장
```