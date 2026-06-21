---
layout: post
title: 048. SQL-DDL
date: 2026-06-21 09:00 +09:00
categories: [IEIP, final]
tags: [IEIP]
---

## DDL(Data Define Language)

- DDL은 DB 구조, 데이터 형식, 접근 방식 등 **DB를 구축하거나 수정할 목적으로 사용하는 언어**
- 번역한 결과가 데이터 사전이라는 특별한 파일에 여러 개의 테이블로 저장
- DDL의 3가지 유형

| 명령어 | 기능 |
|-|-|
| CREATE | SCHEMA, DOMAIN, TABLE, VIEW, INDEX를 정의 |
| ALTER | TABLE에 대한 정의를 변경하는 데 사용 |
| DROP | SCHEMA, DOMAIN, TABLE, VIEW, INDEX를 삭제 |

---

## CREATE SCHEMA

- **스키마를 정의하는 명령문**
- 표기 형식

```sql
CREATE SCHEMA 스키마명 AUTHORIZATION 사용자_id;
```
