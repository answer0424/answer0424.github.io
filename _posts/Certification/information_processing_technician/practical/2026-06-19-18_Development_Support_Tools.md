---
layout: post
title: 18. 개발 지원 도구
date: 2026-06-19 09:00 +09:00
categories: [IEIP, Practical Exam]
tags: [IEIP]
---

## 통합 개발 환경(IDE: Integrated Development Environment)

- 통합 개발 환경은 **개발에 필요한** 환경, 즉 편집기, 컴파일러, 디버거 등의 **다양한 툴을 하나의 인터페이스로 통합하여 제공하는 환경**
- 통합 개발 환경 도구는 통합 개발 환경을 제공하는 소프트웨어를 의미
- 통합 개발 환겨 도구는 코드를 실행하거나 테스트할 때 오류가 발생한 부분을 시각화하므로 수정이 용이

---

## 통합 개발 환경 도구의 종류

| 프로그램 | 개발사 | 플랫폼 | 운영체제 | 지원 언어 |
|-|-|-|-|-|
| 이클립스 | Eclipse Foundation, IBM | 크로스 플랫폼 | Windows, Linux, MacOS 등 | Java, C, C++, PHP, JSP 등 |
| 비주얼 스튜디오 | Microsoft | Win32, Win64 | Windows | Basic, C, C++, C#, .NET 등 |
| 엑스 코드 | Apple | Mac, iPhone | MacOS, iOS | C, C++, C#, Java, AppleScript 등 |
| 안드로이드 스튜디오 | Google | Android | Windows, Linux, MacOS | Java, C, C++ |
| IDEA | JetBrains | 크로스 플랫폼 | Windows, Linux, MacOS | Java, JSP, XML, Go, Kotlin, PHP 등 |


---

## 빌드도구

- 빌드는 **소스 코드 파일들을 컴퓨터에서 실행할 수 있는 제품 소프트웨어로 변환하는 과정 또는 결과물**
- 빌드 도구는 전처리, 컴파일 등의 작업을 수행

<br>

#### 대표적인 빌드 도구

- Ant(Another Neat Tool)
  - 아파치 소프트웨어 재단에서 개발
  - 자바 프로젝트의 공식적인 표준이 없음
  - 정해진 규칙이나 표준이 없음
- Maven
  - 아파치 소프트웨어 재단에서 Ant의 대안으로 개발
  - 의존성을 설정하여 라이브러리를 관리함
  - 규칙이나 표준이 존재하여 예외 사항만 기록
- Gradle
  - 한스 도커가 Ant와 Maven을 보완하여 개발
  - 안드로이드 스튜디오의 공식 빌드 도구
  - 그루비 기반의 빌드 스크립트를 사용