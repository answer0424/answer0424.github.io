---
layout: post
title: BindingResult
date: 2026-11-17 09:00 +09:00
categories: [inflearn, mvc]
tags: [inflearn]
---

## BindingResult

- 스프링이 제공하는 검증 오류를 보관하는 객체
- 검증 오류가 발생하면 여기에 보관하면 됨
- `BindingResult`가 있으면 `@ModelAttribute`에 데이터 바인딩 시 오류가 발생해도 컨트롤러가 호출됨

## 검증 오류를 적용하는 3가지 방법

- `@ModelAttribute`의 객체에 타입 오류 등으로 바인딩이 실패하는 경우 스프링이 `FieldError` 생성해서 `BindingResult`에 넣어줌
- `Validator` 사용

## 주의

- `BindingResult`는 검증할 대상 바로 다음에 와야 함
- `BindingResult`는 Model에 자동으로 포함