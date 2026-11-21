---
layout: post
title: @Autowired, @Qualifier, @Primary
date: 2026-11-02 09:00 +09:00
categories: [inflearn, http]
tags: [inflearn]
---

## @Autowired 필드명 매칭

- `@Autowired`는 타입 매칭을 시도하고, 이때 여러 빈이 있으면 필드 이름으로 빈 이름을 추가 매칭
- 1. 타입 매칭
- 2. 타입 매칭의 결과가 2개 이상일 때 필드 명, 파라미터 명으로 빈 이름 매칭


## @Qualifier

- 추가 구분자를 붙여주는 방법
- 주입 시 추가적인 방법을 제공하는 것이지 빈 이름을 변경하는 것은 아님
- 1. @Qualifier끼리 매칭
- 2. 빈 이름 매칭
- `NoSuchBeanDefinitionException` 예외 발생

## @Primary

- 우선순위를 정하는 방법
- @Autowired 시에 여러 빈이 매칭되면 `@Primary`가 우선권을 가짐