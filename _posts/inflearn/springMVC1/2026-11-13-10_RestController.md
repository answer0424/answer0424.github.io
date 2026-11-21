---
layout: post
title: RestController
date: 2026-11-13 09:00 +09:00
categories: [inflearn, mvc]
tags: [inflearn]
---

## @RestController

- `@Controller`는 반환 값이 `String`이면 뷰 이름으로 인식됨 그래서 **뷰를 찾고 뷰가 렌더링**됨
- `@RestController`는 반환 값으로 뷰를 찾는 것이 아니라 **Http 메시지 바디에 바로 입력** 따라서 실행 결과로 ok 메시지를 받을 수 있음
  - `@ResponseBody`와 관련이 있음