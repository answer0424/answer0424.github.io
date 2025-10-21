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