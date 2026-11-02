---
layout: post
title: BeanFactory와 ApplicationContext
date: 2026-11-02 09:00 +09:00
categories: [inflearn, http]
tags: [inflearn]
---

## BeanFactory

- 스프링 컨테이너의 최상위 인터페이스
- 스프링 빈을 관리하고 조회하는 역할을 담당
- `getBean()`을 제공

## ApplicationContext

- `BeanFactory` 기능을 모두 상속받아서 제공
- 빈을 관리하고 검색하는 기능을 BeanFactory가 제공
- 애플리케이션을 개발할 때는 빈을 관리하고 조회하는 기능은 물론이고, 수 많은 부가기능이 필요