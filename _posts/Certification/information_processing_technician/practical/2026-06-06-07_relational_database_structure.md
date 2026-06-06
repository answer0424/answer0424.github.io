---
layout: post
title: 7. 관계형 데이터베이스의 구조 / 관계형 데이터 모델
date: 2026-06-06 09:00 +09:00
categories: [IEIP, Practical Exam]
tags: [IEIP]
---

## 관계형 데이터베이스

- 2차원적인 표(Table)를 이용해서 데이터 상호 관계를 정의하는 데이터베이스
- 1970년 IBM에 근무하던 코드에 의해 처음 제안되었음
- 개체(Entity)와 관계(Relationship)를 모두 릴레이션(Relation)이라는 표(Table)로 표현하기 때문에 개체를 릴레이션과 관계 릴레이션이 존재
- 장점: 간결하고 보기 편리하며, 다른 데이터베이스로의 변환이 용이
- 단점: 성능이 다소 떨어짐

---

## 관계형 데이터베이스의 릴레이션 구조

![alt text](../../../../assets/img/certification/information_processing_technician/practical/relational_database_structure_01.png)

- 튜플 = 카디널리티 = 대응수 = 레코드 = 기수

<br>

#### 튜플

- 릴레이션을 구성하는 각각의 행
- 튜플은 속성의 모임으로 구성
- 파일 구조에서 레코드와 같은 의미
- 튜플의 수를 카디널리티 또는 기수, 대응수라고 함