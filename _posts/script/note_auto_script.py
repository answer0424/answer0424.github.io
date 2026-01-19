import os
import subprocess

total = 60  # 문제 개수
file_path = os.path.join(os.path.expanduser("~"), "Desktop", "answers.txt")

with open(file_path, "w", encoding="utf-8") as f:
    for i in range(1, total + 1):
        f.write(f"{i}. \n")

# 메모장 실행
subprocess.Popen(["notepad.exe", file_path])
