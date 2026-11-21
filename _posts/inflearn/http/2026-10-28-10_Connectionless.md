---
layout: post
title: 비연결성(Connectionless)
date: 2026-10-28 09:00 +09:00
categories: [inflearn, http]
tags: [inflearn]
---

## 비연결성

- HTTP는 기본이 연결을 유지하지 않는 모델
- 일반적으로 초 단위 이하의 빠른 속도로 응답
- 1시간 동안 수천명이 서비스를 사용해도 실제 서버에서 동시에 처리하는 요청은 수십 개 이하로 매우 적음
  - 예) 웹 브라우저에서 계속 연속해서 검색 버튼을 누르지 않음
- 서버 자원을 매우 효율적으로 사용할 수 있음

## 한계와 극복

- TCP/IP 연결을 새로 맺어야 함 - 3 way handshake 시간 추가
- 웹 브라우저로 사이트를 요청하면 HTML 뿐만 아니라 자바스크립트, css, 추가 이미지 등 수 많은 자원이 함께 다운로드
- 지금은 HTTP 지속 연결(Persistent Connections)로 문제 해결
- HTTP/2, HTTP/3에서 더 많은 최적화