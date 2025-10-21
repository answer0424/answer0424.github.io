---
layout: post
title: Servlet Container Review
date: 2025-10-21 09:00:00 +09:00
categories: [Spring, Servlet Stack, Web MVC, MVC config]
tags: [spring]
---

## 표준 서블릿

#### DefaultServlet

- 소속: Tomcat 기본 서블릿
- 역할: 정적 리소스 응답 처리
- 시점: `/static`, `/public`, `/resources` 등에서 정적 파일 요청 시

<br>

#### JspServlet

- 소속: Tomcat JSP 엔진
- 역할: `.jsp` 파일을 실행 시 서블릿 코드로 변환 및 실행
- 시점: JSP 기반 뷰 사용할 떄

<br>

#### InvokeServlet

- 소속: 과거 Tomcat에서 사용
- 역할: web.xml 매핑 없이 클래스를 직접 URL로 호출할 수 있게 함
- 시점: 현재는 거의 사용 안함

<br>

#### ErrorReportValue

- 소속: Tomcat 내부
- 역할: 에러 발생 시 HTTP 상태코드별 기본 에러 페이지 출력
- 시점: 404, 500 등 발생 시

<br>

## 스프링 기반 서블릿(Spring MVC / Spring Boot에서 추가 등록)

#### DispatcherServlet

- 소속: Spring MVC
- 역할: Front Controller - 요청을 컨트롤러로 분배하고 뷰 렌더링 관리
- 비고: 모든 Spring MVC 요청의 진입점

<br>

#### FrameworkServlet

- 소속: Spring Framework
- 역할: DispatcherServlet의 부모 - ApplicationContext 초기화 관리
- 비고: 직접 등록하지 않음

<br>

#### ResourceHttpRequestHandler

- 소속: Spring MVC
- 역할: 정적 리소스 제공용 핸들러(DefaultServlet 대체)
- 비고: Spring Boot에서 기본 활성화

<br>

#### HiddenHttpMethodFilter

- 소속: Spring Web
- 역할: `_method` 파라미터를 통해 PUT, DELETE 지원
- 비고: RESTful API 구현 시 유용

<br>

#### HttpServletBean

- 소속: Spring 내부 추상 클래스
- 역할: 서블릿 초기화 파라미터를 Spring Bean 프로퍼티에 자동 주입
- 비고: DispatcherServlet의 상위

<br>

#### DispatcherServletRegistrationBean

- 소속: Spring Boot
- 역할: DispatcherServlet을 ServletContext에 자동 등록
- 비고: Boot 환경에서 필수