---
layout: post
title: 02. 리눅스 기본 명령어
date: 2026-08-03 09:00 +09:00
categories: [Linux prac, linux]
tags: [linux]
---
## 1. 리눅스 기본 명령어

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

---

## 2. 리눅스 도움말

#### 명령어 man

- 리눅스에서 사용하는 명령어들의 매뉴얼을 제공

```bash
> man ls
```

<br>

#### 명령어 info

- 리눅스 명령어의 사용 방법, 옵션 등을 제공

<br>

#### 명령어 whatis

- 명령어에 대한 기능을 간략하게 나타낸다

<br>

#### 명령어 manpath

- man 페이지의 위치 경로를 검색하여 표시해주는 명령어

<br>

#### 명령어 whereis

- 명령어의 실행 파일 절대 경로와 소스코드, 설정 파일 및 매뉴얼 페이지를 찾아 출력하는 명령어

<br>

#### 명령어 apropos

- 맨 페이지 설명에서 지정한 키워드를 포함하고 있는 명령어

---

## 3. 사용자 생성 명령어

#### 명령어 useradd

- 계정을 생성하는 명령어

<br>

#### 명령어 passwd

- 생성된 계정자의 패스워드를 입력 및 변경하는 명령어

<br>

#### 명령어 su

- switch user의 줄임말로 다른 사용자 계정으로 로그인하는 명령어

---

## 4. 사용자 관련 파일

#### 파일 /etc/default/useradd

- useradd로 사용자 계정을 추가할 때 기본으로 설정되는 정보가 저장된 파일

<br>