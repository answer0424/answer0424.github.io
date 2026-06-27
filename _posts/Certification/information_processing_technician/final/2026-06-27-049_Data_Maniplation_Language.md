---
layout: post
title: 049. SQL-DML
date: 2026-06-27 09:00 +09:00
categories: [IEIP, final]
tags: [IEIP]
---

## DML(Data Manipulation Language)

- DML은 데이터베이스 사용자가 **저장된 데이터를 실질적으로 관리하는데 사용되는 언어**
- DML은 데이터베이스 사용자와 데이터베이스 관리 시스템 간의 인터페이스를 제공
- DML의 유형

| 명령문 | 기능 |
|-|-|
| SELECT | 테이블에서 튜플을 검색 |
| INSERT | 테이블에서 새로운 튜플을 삽입 |
| DELETE | 테이블에서 튜플을 삭제 |
| UPDATE | 테이블에서 튜플의 내용을 갱신 |

---

## 삽입문(INSERT INTO ~)

```sql
INSERT INTO 테이블명([속성명1, 속성명2, ...])
VALUES(데이터1, 데이터2, ...);
```

- 대응하는 속성과 데이터의 개수와 데이터 유형은 일치해야 함
- 기본 테이블의 모든 속성을 사용할 때는 속성명을 생략할 수 있음
- SELECT문을 사용하여 다른 테이블의 검색 결과를 삽입할 수 있음

---
