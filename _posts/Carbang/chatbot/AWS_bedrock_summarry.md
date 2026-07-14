---
layout: post
title: AWS bedrock
date: 2026-07-10 09:00 +09:00
categories: [Carbang, AWS bedrock]
tags: [bedrock]
---

## 생성형 AI와 머신러닝과 다른점

![alt text](../../../assets/img/chatbot/AI_ML.png)

- 머신러닝: 인간을 모방한 문제 해결 능력을 갖춘 학습된 모델
- 머신러닝의 모델 생성 과정: 데이터 준비 / 모델 훈련 / 모델 평가 / 배포 및 관리
- 생성형 AI: 방대한 데이터 뭉치들에 대해 사전 학습된 대규모 모델을 기반으로 하며, 일반적으로 Foundation Models(FM)이라고 함

---

## RAG(검색 증강 생성)

#### RAG 사용 이유

- 도메인 특화 지식 부족
- 지식 단절
- 환각
- 즉, 특정 작업의 성능 향상을 위해 커스터마이징이 필요

<br>

#### 커스터마이징 방법

1. 사전에 훈련된 모델로 인컨텍스트 학습
2. RAG 사용

