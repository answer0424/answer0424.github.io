#!/usr/bin/env node

/**
 * Node.js를 사용한 간단한 AES 암호화 도구
 * 사용: node encrypt-simple.js "콘텐츠" "비밀번호"
 */

const crypto = require('crypto');

function md5(str) {
  return crypto.createHash('md5').update(str).digest('hex');
}

function encryptAES(text, password) {
  // SHA256을 사용하여 256비트 키 생성
  const key = crypto.createHash('sha256').update(password).digest();

  // 초기화 벡터 생성
  const iv = crypto.randomBytes(16);

  // AES-256-CBC 암호화
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  // IV + 암호화된 데이터를 합치고 Base64 인코딩
  const result = Buffer.concat([iv, Buffer.from(encrypted, 'hex')]).toString(
    'base64'
  );
  return result;
}

function main() {
  if (process.argv.length < 4) {
    console.log('사용법: node encrypt-simple.js "콘텐츠" "비밀번호"');
    console.log('예제: node encrypt-simple.js "Hello World" "secret123"');
    process.exit(1);
  }

  const content = process.argv[2];
  const password = process.argv[3];

  const passwordHash = md5(password);
  const encryptedContent = encryptAES(content, password);

  console.log('\n✅ 암호화 완료!\n');
  console.log('📋 Front Matter에 추가할 정보:');
  console.log('---');
  console.log(`password_hash: "${passwordHash}"`);
  console.log(`encrypted_content: "${encryptedContent}"`);
  console.log('---\n');

  console.log('🔑 비밀번호:', password);
  console.log('📏 암호화된 크기:', encryptedContent.length, '자');
}

main();
