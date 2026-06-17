# 🔐 secretfolder - 비밀번호 보호 기능

이 폴더에는 비밀번호로 보호된 Markdown 파일들이 저장되어 있습니다.

## 🚀 빠른 시작

### 파일 접근
`_posts/secretfolder` 내의 모든 파일은 비밀번호 보호됩니다.

### 현재 파일
- **example.md** - 테스트 파일
  - 비밀번호: `secret123`

## 🔒 보안 정보

- ✅ **AES-256-CBC 암호화** - 군사 수준의 암호화
- ✅ **클라이언트 사이드 처리** - 서버에 비밀번호가 전송되지 않음
- ✅ **localStorage 저장** - 브라우저에서 자동으로 기억
- ✅ **MD5 해시 검증** - 비밀번호 일치 확인

## 📝 새로운 파일 추가 방법

### 1단계: 콘텐츠 작성
```markdown
# 제목

콘텐츠...
```

### 2단계: Node.js로 암호화
```bash
node tools/encrypt-simple.js "콘텐츠" "비밀번호"
```

### 3단계: 결과를 파일의 Front Matter에 추가

```yaml
---
layout: password-protected
title: 문서 제목
password_protected: true
password_hash: "[위의 결과에서 복사]"
encrypted_content: "[위의 결과에서 복사]"
---
```

## 🛠️ 암호화 도구

### encrypt-simple.js (Node.js)
```bash
node tools/encrypt-simple.js "암호화할 텍스트" "비밀번호"
```

**장점:**
- Node.js만 필요 (Python 불필요)
- 빠르고 간단함
- 즉시 결과 출력

### encrypt_md.py (Python)
```bash
python3 tools/encrypt_md.py secretfolder/파일.md --password "비밀번호"
```

**장점:**
- MD 파일 자동 처리
- Front Matter 자동 생성
- 파일 백업

## 🎯 작동 원리

```
1. 사용자가 파일 접근
   ↓
2. 비밀번호 입력 폼 표시 (🔒)
   ↓
3. 비밀번호 입력
   ↓
4. JavaScript에서 AES-256-CBC 복호화
   ↓
5. 성공 시 콘텐츠 표시
   실패 시 오류 메시지
```

## 🔑 비밀번호 관리

### 변경 방법
1. 새로운 비밀번호로 다시 암호화
2. Front Matter의 `password_hash`와 `encrypted_content` 업데이트
3. 저장

### 잊어버린 경우
- 원본 파일이 있다면, 새로운 비밀번호로 다시 암호화
- 원본이 없다면 복호화 불가능 (의도적인 보안)

## ⚙️ 기술 스택

| 항목 | 기술 |
|------|------|
| **암호화** | AES-256-CBC |
| **해시** | MD5 (비밀번호), SHA256 (키) |
| **라이브러리** | CryptoJS (CDN) |
| **저장소** | localStorage |
| **라우팅** | Jekyll Layout |

## 📚 참고

- [SETUP_GUIDE.md](../SETUP_GUIDE.md) - 자세한 설정 가이드
- [password-protected.js](../_javascript/modules/password-protected.js) - 핵심 로직
- [password-protected.html](.../_layouts/password-protected.html) - 레이아웃

## ❓ FAQ

**Q: 비밀번호를 어떻게 변경하나요?**
A: 새 비밀번호로 암호화하고 Front Matter를 업데이트하면 됩니다.

**Q: 여러 사람이 다른 비밀번호로 접근 가능한가요?**
A: 아니요, 한 파일은 한 비밀번호만 지원합니다. 여러 파일을 만드는 것이 좋습니다.

**Q: 오프라인에서도 작동하나요?**
A: 예, 모든 처리가 클라이언트 사이드에서 이루어집니다.

**Q: 암호화된 파일을 안전하게 공유할 수 있나요?**
A: 예, 파일과 비밀번호를 따로 전달하면 됩니다.

---

**마지막 업데이트:** 2026-06-17
**비밀번호 암호화:** AES-256-CBC
