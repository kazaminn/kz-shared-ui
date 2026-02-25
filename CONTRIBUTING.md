# Contributing

## 基本方針

- 変更は小さく、目的は明確に
- main は常に動く状態を保つ

---

## ブランチ運用

- main：常に安定（直接pushしない）
- 作業ブランチ：`<type>/<short description>`
  - AIが作業するブランチはprefixを付ける
    - claude code: `claude/<type>/<short description>`、
    - codex: `codex/<type>/<short description>`
  - ブランチ名の例:
    - feat/issue-1-add-card-share
    - fix/issue-2-null-pointer-on-preview
    - claude/feat/issue-123-button

---

## コミットメッセージ

フォーマット：

<emoji> <type>(<scope>): <subject>

例：

✨ feat(ui): add font preset selector  
🛠️ fix(api): handle empty prompt safely  
🧹 chore(ci): bump node to 20

### type（絵文字付き）

- 🎉 init - 初期セットアップ
- ✨ feat - 新機能追加
- 🛠️ fix - バグ修正
- ♻️ refactor - リファクタリング
- 🚀 perf - パフォーマンス改善
- 🧪 test - テスト追加・修正
- 💄 style - フォーマットのみ変更
- 📝 docs - ドキュメント更新
- 🧹 chore - 設定変更、依存更新など
- 🚧 wip - 作業途中

### subject

- 英語で統一（動詞は、現在形 or 命令形）

### body

- 原則、英語で書く。
- 人間のために日本語も許容する。

### コミット粒度

- 1コミット = 1意図
- フォーマット変更は分離
- WIPは許可（後で整理する）

---

## PRルール

- CIがGreen
- 差分が大きい場合は分割（目安 ±300行）
