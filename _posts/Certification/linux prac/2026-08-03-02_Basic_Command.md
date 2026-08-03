---
layout: post
title: 02. 리눅스 기본 명령어
date: 2026-08-03 09:00 +09:00
categories: [Linux prac, linux]
tags: [linux]
---
## 리눅스 기본 명령어

#### 명령어 which

- 명령어의 경로를 확인하는 명령어

```bash
> which ls
> /usr/bin/ls
```

<br>

#### 명령어 alias

- 자주 사용하는 명령어를 특정 문자로 사용할 수 있게 하는 명령어

```bash
> alias ll='ls -al'
```

<br>

#### 명령어 unalias

- alias로 등록한 문자를 해제하는 명령어

<br>

#### 환경변수 PATH

- 명령어의 실행 파일들의 위치를 저장해 놓은 환경변수

<br>

#### 명령어 echo

- 화면에 무언가를 출력하라는 명령어

```bash
> echo $PS1
> \$
> echo $PATH
> /sbin:/usr/sbin:/bin:/usr/bin 
```

<br>

## 리눅스 도움말

#### 명령어 man

- 리눅스에서 사용하는 명령어들의 매뉴얼을 제공

<br>

#### 명령어 info

- 리눅스 명령어의 사용 방법, 옵션 등을 제공

<br>

#### 명령어 whatis

- 명령어에 대한 기능을 간략하게 나타낸다
