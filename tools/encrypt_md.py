#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
비밀번호로 보호된 MD 파일 암호화 유틸리티

사용법:
    python3 encrypt_md.py secretfolder/example.md --password "mypassword"
"""

import os
import sys
import hashlib
import base64
import json
from pathlib import Path

try:
    from Crypto.Cipher import AES
    from Crypto.Random import get_random_bytes
    from Crypto.Util.Padding import pad
except ImportError:
    print("❌ PyCryptodome이 설치되지 않았습니다.")
    print("설치: pip install pycryptodome")
    sys.exit(1)


class ContentEncryptor:
    def __init__(self, password: str):
        self.password = password
        self.password_hash = hashlib.md5(password.encode()).hexdigest()
        # SHA256으로 암호화 키 생성 (32바이트 = 256비트)
        self.key = hashlib.sha256(password.encode()).digest()

    def encrypt(self, plaintext: str) -> str:
        """AES-256-CBC로 텍스트 암호화"""
        # 초기화 벡터 생성
        iv = get_random_bytes(16)

        # AES 객체 생성
        cipher = AES.new(self.key, AES.MODE_CBC, iv)

        # 패딩 적용
        plaintext_bytes = plaintext.encode('utf-8')
        padded_plaintext = pad(plaintext_bytes, AES.block_size)

        # 암호화
        ciphertext = cipher.encrypt(padded_plaintext)

        # IV + 암호화된 데이터를 Base64로 인코딩
        encrypted_data = iv + ciphertext
        encoded = base64.b64encode(encrypted_data).decode('utf-8')

        return encoded

    def get_front_matter(self, title: str = "Secret Content") -> str:
        """Jekyll Front Matter 생성"""
        return f"""---
layout: password-protected
title: {title}
password_protected: true
password_hash: "{self.password_hash}"
---
"""

    def process_file(self, file_path: str, output_path: str = None) -> dict:
        """MD 파일 처리 및 암호화"""
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"파일을 찾을 수 없습니다: {file_path}")

        # 파일 읽기
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Front Matter와 본문 분리
        if content.startswith('---'):
            parts = content.split('---', 2)
            if len(parts) >= 3:
                front_matter_lines = parts[1].strip().split('\n')
                body = parts[2].strip()
            else:
                front_matter_lines = []
                body = content
        else:
            front_matter_lines = []
            body = content

        # 기존 Front Matter 파싱
        title = "Secret Content"
        for line in front_matter_lines:
            if line.startswith('title:'):
                title = line.replace('title:', '').strip().strip('\'"')
                break

        # 본문 암호화
        encrypted_content = self.encrypt(body)

        # 새로운 Front Matter 생성
        new_front_matter = self.get_front_matter(title)

        # 결과 파일 내용
        result_content = f"{new_front_matter}<!-- 콘텐츠가 암호화되어 있습니다 -->\n"

        # 출력 파일 경로 결정
        if output_path is None:
            output_path = file_path

        # 암호화된 파일 저장
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(result_content)

        return {
            'status': '✅ 완료',
            'file': file_path,
            'output': output_path,
            'password_hash': self.password_hash,
            'encrypted_length': len(encrypted_content),
            'encrypted_preview': encrypted_content[:50] + '...' if len(encrypted_content) > 50 else encrypted_content,
            'note': '⚠️  encrypted_content는 파일에 저장되지 않습니다. 아래 정보를 복사해주세요:'
        }


def print_result(result: dict):
    """결과 출력"""
    print("\n" + "="*60)
    print("🔐 암호화 완료!")
    print("="*60)
    print(f"📄 파일: {result['file']}")
    print(f"💾 출력: {result['output']}")
    print(f"🔑 비밀번호 해시: {result['password_hash']}")
    print(f"📏 암호화된 데이터 크기: {result['encrypted_length']} 바이트")
    print("\n" + result['note'])
    print("\n" + "="*60)
    print("⚠️  중요: 파일에 다음을 추가해야 합니다:")
    print("="*60)
    print("""
---
layout: password-protected
title: [제목]
password_protected: true
password_hash: "[위의 비밀번호 해시]"
encrypted_content: "[아래 데이터 붙여넣기]"
---

<!-- 원본 콘텐츠는 여기에 있었습니다 -->
""")


def main():
    if len(sys.argv) < 2:
        print("사용법: python3 encrypt_md.py <파일경로> --password <비밀번호>")
        print("\n예제:")
        print("  python3 encrypt_md.py secretfolder/example.md --password 'mypassword'")
        sys.exit(1)

    file_path = sys.argv[1]
    password = None

    # 인자 파싱
    i = 2
    while i < len(sys.argv):
        if sys.argv[i] == '--password':
            if i + 1 < len(sys.argv):
                password = sys.argv[i + 1]
                i += 2
            else:
                print("❌ --password 옆에 비밀번호를 입력해주세요")
                sys.exit(1)
        else:
            i += 1

    if not password:
        print("❌ 비밀번호가 필요합니다. --password 옵션을 사용해주세요")
        sys.exit(1)

    try:
        encryptor = ContentEncryptor(password)
        result = encryptor.process_file(file_path)
        print_result(result)

        # encrypted_content를 별도로 출력 (복사하기 쉽도록)
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        if content.startswith('---'):
            parts = content.split('---', 2)
            if len(parts) >= 3:
                body = parts[2].strip()
            else:
                body = content
        else:
            body = content

        encrypted = encryptor.encrypt(body)
        print("\n📋 encrypted_content (복사용):")
        print("="*60)
        print(encrypted)
        print("="*60)

    except FileNotFoundError as e:
        print(f"❌ 오류: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"❌ 오류 발생: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)


if __name__ == '__main__':
    main()
