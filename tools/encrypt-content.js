#!/usr/bin/env node

/**
 * 사용법: node encrypt-content.js --file secretfolder/example.md --password "mypassword"
 *
 * secretfolder의 MD 파일을 암호화하고, Jekyll Front Matter에 필요한 정보를 추가합니다.
 */

const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

// CryptoJS는 브라우저용이므로, Node.js에서는 내장 crypto를 사용합니다.
// 실제로는 cryptojs npm 패키지를 설치하거나, Python 스크립트를 사용할 수 있습니다.

function md5(str) {
  return crypto.createHash('md5').update(str).digest('hex');
}

function encryptAES(text, password) {
  // 간단한 AES 구현 (실제로는 crypto-js와 동일하게 작동해야 함)
  // 더 나은 방법: crypto-js npm 패키지 사용
  const cipher = crypto.createCipher('aes-256-cbc', password);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function main() {
  const args = process.argv.slice(2);
  let filePath = '';
  let password = '';

  // 인자 파싱
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--file') {
      filePath = args[i + 1];
      i++;
    } else if (args[i] === '--password') {
      password = args[i + 1];
      i++;
    }
  }

  if (!filePath || !password) {
    console.error(
      '사용법: node encrypt-content.js --file <파일경로> --password <비밀번호>'
    );
    process.exit(1);
  }

  try {
    // 파일 읽기
    const content = fs.readFileSync(filePath, 'utf8');

    // Front Matter와 콘텐츠 분리
    const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!match) {
      console.error(
        'Front Matter가 없습니다. --- 로 감싸진 YAML Front Matter가 필요합니다.'
      );
      process.exit(1);
    }

    const frontMatter = match[1];
    const bodyContent = match[2];

    // 암호화
    const passwordHash = md5(password);
    const encryptedContent = encryptAES(bodyContent, password);

    // 수정된 Front Matter
    const updatedFrontMatter =
      frontMatter
        .replace(/^layout:.*$/m, 'layout: password-protected')
        .replace(/^password_hash:.*$/m, `password_hash: "${passwordHash}"`) ||
      `layout: password-protected\npassword_hash: "${passwordHash}"`;

    // 결과
    console.log('✅ 암호화 완료!');
    console.log('\n📋 Front Matter에 다음을 추가하세요:');
    console.log(`password_protected: true`);
    console.log(`password_hash: "${passwordHash}"`);
    console.log(`encrypted_content: "${encryptedContent}"`);
    console.log('\n📝 대체 방법: 파일을 직접 수정하세요:');
    console.log(`---`);
    console.log(`layout: password-protected`);
    console.log(`password_protected: true`);
    console.log(`password_hash: "${passwordHash}"`);
    console.log(`encrypted_content: "${encryptedContent}"`);
    console.log(`---`);
  } catch (error) {
    console.error('❌ 오류:', error.message);
    process.exit(1);
  }
}

main();
