/**
 * 비밀번호 보호 콘텐츠 로직
 * AES 암호화/복호화를 사용하여 secretfolder의 MD 파일을 보호합니다.
 */

class PasswordProtectedContent {
  constructor() {
    this.storageKey = 'protected-content-password';
    this.init();
  }

  init() {
    // 페이지 로드 시 비밀번호 보호 상태 확인
    const content = document.getElementById('protected-content');
    if (content && content.dataset.passwordProtected === 'true') {
      this.setupPasswordProtection();
    }
  }

  setupPasswordProtection() {
    const content = document.getElementById('protected-content');
    const encrypted = content.dataset.encrypted; // 암호화된 콘텐츠
    const passwordHash = content.dataset.passwordHash; // 비밀번호 해시
    const storedPassword = localStorage.getItem(this.storageKey);

    if (storedPassword) {
      // 저장된 비밀번호로 복호화 시도
      this.attemptDecrypt(encrypted, storedPassword, passwordHash, content);
    } else {
      // 비밀번호 입력 폼 표시
      this.showPasswordForm(content, encrypted, passwordHash);
    }
  }

  showPasswordForm(container, encrypted, passwordHash) {
    const form = document.createElement('div');
    form.className = 'password-form-container';
    form.innerHTML = `
      <div class="password-form">
        <div class="password-form-icon">🔒</div>
        <h2>비밀번호 보호 콘텐츠</h2>
        <p>이 페이지는 비밀번호로 보호되어 있습니다.</p>
        <form id="password-form">
          <input 
            type="password" 
            id="password-input" 
            placeholder="비밀번호를 입력하세요"
            required
          />
          <button type="submit">입력</button>
        </form>
        <div id="password-error" class="password-error"></div>
      </div>
    `;

    container.innerHTML = '';
    container.appendChild(form);

    document.getElementById('password-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const password = document.getElementById('password-input').value;
      this.attemptDecrypt(encrypted, password, passwordHash, container);
    });
  }

  attemptDecrypt(encrypted, password, passwordHash, container) {
    try {
      // 비밀번호 검증 (MD5 해시 비교)
      const passwordMd5 = this.md5(password);

      if (passwordMd5 !== passwordHash) {
        this.showPasswordError('비밀번호가 틀렸습니다.', container);
        return;
      }

      // CryptoJS 확인
      if (typeof CryptoJS === 'undefined') {
        console.error('CryptoJS 라이브러리가 로드되지 않았습니다.');
        this.showPasswordError('라이브러리 오류가 발생했습니다.', container);
        return;
      }

      // Base64 디코딩
      const encryptedData = atob(encrypted);
      
      // IV 추출 (첫 16바이트)
      const iv = encryptedData.slice(0, 16);
      const ciphertext = encryptedData.slice(16);
      
      // SHA256으로 키 생성
      const keyHex = CryptoJS.SHA256(password).toString();
      const key = CryptoJS.enc.Hex.parse(keyHex);
      const ivBytes = CryptoJS.enc.Latin1.parse(iv);
      const ciphertextBytes = CryptoJS.enc.Latin1.parse(ciphertext);
      
      // AES-256-CBC 복호화
      const decrypted = CryptoJS.AES.decrypt({
        ciphertext: ciphertextBytes,
        salt: ''
      }, key, {
        iv: ivBytes,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      
      const content = decrypted.toString(CryptoJS.enc.Utf8);

      if (!content) {
        this.showPasswordError('복호화에 실패했습니다.', container);
        return;
      }

      // 비밀번호 저장 (localStorage)
      localStorage.setItem(this.storageKey, password);

      // 복호화된 콘텐츠 표시
      container.innerHTML = content;
    } catch (error) {
      console.error('복호화 중 오류:', error);
      this.showPasswordError(
        '오류가 발생했습니다. 다시 시도해주세요.',
        container
      );
    }
  }

  showPasswordError(message, container) {
    const errorEl = document.getElementById('password-error');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.style.display = 'block';
    }
  }

  // 간단한 MD5 해시 함수 (CryptoJS 사용)
  md5(str) {
    if (typeof CryptoJS === 'undefined') {
      console.warn('CryptoJS 라이브러리가 없어 간단한 해시를 사용합니다.');
      return this.simpleHash(str);
    }
    return CryptoJS.MD5(str).toString();
  }

  // 폴백 해시 함수
  simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16);
  }

  // 비밀번호 초기화 (로그아웃)
  clearPassword() {
    localStorage.removeItem(this.storageKey);
    location.reload();
  }
}

// 페이지 로드 완료 후 초기화
document.addEventListener('DOMContentLoaded', () => {
  new PasswordProtectedContent();
});
