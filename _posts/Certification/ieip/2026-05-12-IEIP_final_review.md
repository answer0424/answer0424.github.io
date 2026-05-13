---
layout: post
title: 파이널 리뷰
date: 2026-05-12 09:00 +09:00
categories: [IEIP, review]
tags: [IEIP]
---

## 스케줄링

- 비선점 스케줄링: FCFS, SJF, HRN
- 선점 스케줄링: RR, SRTF

---

## OSI 참조 모델

#### 응용 계층(Application Layer)

- HTTPS, HTTP, FTP, SMTP, DNS, Telnet, SNMP 등과 같은 프로토콜이 존재하며, 사용자와 직접 상호작용하는 계층


<br>

#### 표현 계층(Presentation Layer)

- 데이터의 표현 형식을 정의하는 계층으로, 데이터 압축, 암호화, 문자 인코딩 등을 담당
- 응용 계층으로부터 받은 데이터를 세션 계층에 보내기 전에 통신에 적당한 형태로 변환하고 세션 계층에서 받은 데이터는 응용 계층에 맞게 변환하는 기능

<br>

#### 세션 계층(Session Layer)

- 세션의 설정, 유지, 종료를 담당하며, 세션의 동기화와 체크포인트 기능을 제공하여 통신 중에 발생할 수 있는 오류를 복구

<br>

#### 전송 계층(Transport Layer)

- 종단 시스템 간에 투명한 데이터 전송 및 연결 해제 기능을 함
- 주소 설정, 다중화, 오류 제어, 흐름 제어를 수행
- TCP(Transmission Control Protocol): 연결 지향적 프로토콜로, 신뢰성 있는 데이터 전송을 보장
- UDP(User Datagram Protocol): 비연결 지향적 프로토콜로, 빠른 데이터 전송이 필요한 경우에 사용



## UML
## 디자인 패턴
## 모듈
## 데이터베이스 개요
## 데이터베이스 설계