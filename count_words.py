import sys
import os

def count_file(filepath):
    if not os.path.exists(filepath):
        print(f"File {filepath} does not exist.")
        return
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    words = content.split()
    word_count = len(words)
    char_count = len(content)
    print(f"File: {os.path.basename(filepath)}")
    print(f"Words: {word_count}")
    print(f"Characters: {char_count}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        count_file(sys.argv[1])
    else:
        print("Usage: python count_words.py <filepath>")
