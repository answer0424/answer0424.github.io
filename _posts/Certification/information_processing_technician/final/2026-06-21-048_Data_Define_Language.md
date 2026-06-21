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

---

## CREATE DOMAIN

- **도메인을 정의하는 명령문**
- 표기 형식

```sql
CREATE DOMAIN 도메인명 [AS] 데이터_타입
    [DEFAULT 기본값]
    [CONSTRAINT 제약조건명 CHECK (범위값)];
```

- 데이터 타입: SQL에서 지원하는 데이터타입
- 기본값: 데이터를 입력하지 않았을 때 자동으로 입력되는 값

---

## CREATE TABLE

- **테이블을 정의하는 명령문**
- 표기 형식

```sql
CREATE TABLE 테이블명
    (속성명 데이터_타입 [DEFAULT 기본값] [NOT NULL]
    [, PRIMARY KEY(기본키_속성명, ...)]
    [, UNIQUE(대체키_속성명, ...)]
    [, FOREIGN KEY(외래키_속성명, ...)
        REFERENCES 참조테이블(기본키_속성명, ...)]
        [ON DELETE 옵션]
        [ON UPDATE 옵션]
    [, CONSTATINT 제약조건명] [CHECK (조건식)]);
```

- 기본 테이블에 포함될 모든 속성에 대하여 속성명과 그 속성의 데이터 타입, 기본값, NOT NULL여부를 저장
- PRIMARY KEY: 기본키로 사용할 속성을 지정
- UNIQUE: 대체키로 사용할 속성을 지정, 중복된 값을 가질 수 없음
- FOREIGN KEY ~ REFERNECES ~: 외래키로 사용할 속성을 지정
  - ON DELETE 옵션: 참조 테이블의 튜플이 삭제되었을 때 기본 테이블에 취해야 할 사항을 지정
  - ON UPDATE 옵션: 참조 테이블의 참조 속성 값이 변경되었을 때 기본 테이블이 취해야 할 사항을 지정
- CONSTRAINT: 제약 조건의 이름을 지정
- CHECK: 속성 값에 대한 제약 조건을 정의

---

## CREATE VIEW

- **뷰를 정의하는 명령문**
- 표기 형식

```sql
CREATE VIEW 뷰명[(속성명[, 속성명, ...])]
AS SELECT문;
```

---

## CREATE INDEX

- **인덱스를 정의하는 명령문**
- 표기 형식

```sql
CREATE [UNIQUE] INDEX 인덱스명
ON 테이블명(속성명 [ASC | DESC] [, 속성명 [ASC | DESC]])
[CLUSTER];
```

- UNIQUE
  - 사용된 경우: 중복 값이 없는 속성으로 인덱스를 생성함
  - 생략된 경우: 중복 값을 허용하는 속성으로 인덱스를 생성
- 정렬 여부 지정
  - ASC: 오름차순 정령
  - DESC: 내림차순 정렬
  - 생략된 경우: 오름차순으로 정렬
- CULSTER: 사용하면 인덱스가 클러스터드 인덱스로 설정됨

---