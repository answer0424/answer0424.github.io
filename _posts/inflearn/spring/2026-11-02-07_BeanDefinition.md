---
layout: post
title: BeanDefinition
date: 2026-11-02 09:00 +09:00
categories: [inflearn, http]
tags: [inflearn]
---

## BeanDefinition

- 스프링은 `BeanDefinition`이라는 추상화를 통해서 이런 다양한 설정 형식을 지원함
- **역할과 구현을 개념적으로 나눈 것**
  - XML을 읽어서 BeanDefinition을 만들면됨
  - 자바 코드를 읽어서 BeanDefinition을 만들면 됨
  - 스프링 컨테이너는 자바 코드인지, XML인지 몰라도 됨 오직 BeanDefinition만 알면 됨
- `BeanDefinition`을 빈 설정 메타 정보라고 함
  - `@Bean`, `<bean>` 당 각각 하나씩 메타 정보가 생성
- 스프링 컨테이너는 이 메타 정보를 기반으로 스프링 빈을 생성