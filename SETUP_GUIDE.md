# 비밀번호 보호 secretfolder 설정 가이드

## 📋 개요

이 기능을 사용하면 Jekyll 블로그의 특정 MD 파일을 비밀번호로 보호할 수 있습니다. 클라이언트 사이드 JavaScript와 AES 암호화를 사용하여 구현되었습니다.

---

## 🚀 설정 방법

### 1단계: secretfolder 폴더 생성

```bash
# 프로젝트 루트에서
mkdir secretfolder
```

### 2단계: 비밀번호 보호할 MD 파일 작성

`secretfolder/example.md` 예제:

```markdown
---
layout: password-protected
title: 비밀 문서
password_protected: true
password_hash: "e5fa44f2b31c1fb553b6021e7aab6b74"
encrypted_content: "U2FsdGVkX1..."
---

# 비밀 문서

이것은 비밀번호로 보호된 문서입니다.
```

### 3단계: _config.yml에서 secretfolder 제외 (선택사항)

```yaml
exclude:
  - secretfolder
```

---

## 🔐 암호화 방법

### 방법 1: Python을 사용한 암호화 (권장)

Python 스크립트를 작성하여 콘텐츠를 암호화합니다:

```python
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
import hashlib
import base64

def encrypt_content(text, password):
    # 비밀번호를 SHA256으로 해시하여 키 생성
    password_hash = hashlib.sha256(password.encode()).digest()[:32]
    
    # 초기화 벡터 생성
    iv = get_random_bytes(16)
    
    # AES 암호화
    cipher = AES.new(password_hash, AES.MODE_CBC, iv)
    
    # 패딩
    padding_length = 16 - (len(text) % 16)
    text = text + chr(padding_length) * padding_length
    
    # 암호화
    encrypted = cipher.encrypt(text.encode())
    
    # Base64 인코딩
    result = base64.b64encode(iv + encrypted).decode()
    return result

# 사용 예제
password = "mypassword"
content = "# 비밀 문서\n\n이 내용은 암호화되어 있습니다."
md5_hash = hashlib.md5(password.encode()).hexdigest()
encrypted = encrypt_content(content, password)

print(f"password_hash: {md5_hash}")
print(f"encrypted_content: {encrypted}")
```

### 방법 2: Online AES Encryption 도구 사용

1. [AES Encryption Tool](https://www.browserling.com/tools/aes-encrypt) 방문
2. 콘텐츠 입력
3. 비밀번호 입력
4. "Encrypt" 클릭
5. 생성된 값을 Front Matter에 복사

---

## 📝 사용 예제

### 예제 1: 간단한 보호된 페이지

**파일: secretfolder/secret.md**

```yaml
---
layout: password-protected
title: 내 비밀 일기
password_protected: true
password_hash: "e5fa44f2b31c1fb553b6021e7aab6b74"  # MD5("diary123")
encrypted_content: "U2FsdGVkX1Y4GQ9K..."
---
```

**비밀번호:** diary123

### 예제 2: 여러 파일 보호

secretfolder 내에 여러 MD 파일을 만들고 각각 다른 비밀번호 사용 가능:

```
secretfolder/
├── secret1.md (비밀번호: password1)
├── secret2.md (비밀번호: password2)
└── secret3.md (비밀번호: password3)
```

---

## 🎯 작동 원리

```
┌─────────────────────────────────────────┐
│ 사용자가 secretfolder 링크 클릭        │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│ password-protected.html 로드            │
│ → 콘텐츠가 암호화된 상태로 표시        │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│ 비밀번호 입력 폼 표시 (🔒)             │
└──────────────┬──────────────────────────┘
               │
     ┌─────────┴──────────┐
     │                    │
     ▼                    ▼
  입력함            로컬스토리지 확인
     │                    │
     └─────────┬──────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│ JavaScript에서 AES 복호화              │
│ (CryptoJS 라이브러리 사용)             │
└──────────────┬──────────────────────────┘
               │
      ┌────────┴────────┐
      │                 │
      ▼                 ▼
  성공 ✅            실패 ❌
      │                 │
      ▼                 ▼
 콘텐츠 표시      오류 메시지
```

---

## 🔧 기술 스택

- **암호화 알고리즘:** AES-256
- **라이브러리:** CryptoJS (CDN 로드)
- **저장소:** localStorage (사용자 브라우저)
- **렌더링:** Jekyll + Liquid

---

## 🛡️ 보안 고려사항

⚠️ **주의:** 이 방식은 클라이언트 사이드 암호화이므로 완전한 보안을 보장하지 않습니다.

- 비밀번호는 소스 코드에 MD5 해시로 저장됨
- 암호화된 콘텐츠는 HTML 소스에서 볼 수 있음
- 진정한 보안이 필요한 경우, 서버 사이드 인증 사용 권장

**권장:**
- 민감한 정보는 다른 방법으로 보호
- 정기적으로 비밀번호 변경
- 사용자에게 강력한 비밀번호 선택 권고

---

## ❓ FAQ

**Q: 비밀번호를 잊었어요**
- A: 파일의 encrypted_content를 다시 생성해야 합니다. 위의 암호화 방법을 참고하세요.

**Q: 여러 사용자가 다른 비밀번호 사용 가능한가요?**
- A: 예, 각 MD 파일마다 다른 비밀번호와 해시를 설정할 수 있습니다.

**Q: localStorage에 저장된 비밀번호는 안전한가요?**
- A: 같은 도메인의 모든 페이지에서 접근 가능합니다. 프라이빗 브라우징 사용 권장.

**Q: 오프라인에서도 작동하나요?**
- A: 예, 모든 처리가 클라이언트 사이드에서 이루어집니다.

---

## 📚 추가 자료

- [CryptoJS 문서](https://cryptojs.gitbook.io/docs)
- [AES 암호화 설명](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard)
- [Jekyll Front Matter](https://jekyllrb.com/docs/front-matter/)
