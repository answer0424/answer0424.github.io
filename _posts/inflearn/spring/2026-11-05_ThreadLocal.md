---
layout: post
title: ThreadLocal
date: 2026-11-05 09:00 +09:00
categories: [inflearn, http]
tags: [inflearn]
---

## ThreadLocal

- 쓰레드 로컬은 해당 쓰레드만 접근할 수 있는 특별한 저장소를 말함

## 주의사항

- 쓰레드 로컬의 값을 사용 후 제거하지 않고 그냥 두면 WAS처럼 쓰레드 풀을 사용하는 경우에 심각한 문제가 발생할 수 있음