# Input (TextField) — React Aria 調査メモ

## コンポーネント概要

`TextField` はテキスト入力フィールドのコンテナ。内部に `Label`・`Input`（または `TextArea`）・`Text`・`FieldError` を配置する複合コンポーネント。

## アナトミー

```tsx
<TextField>
  <Label />
  <Input />            {/* または <TextArea /> */}
  <Text slot="description" />
  <FieldError />
</TextField>
```

## 必須の import

```tsx
import {
  TextField,
  Label,
  Input,
  TextArea,       // 複数行の場合
  Text,
  FieldError,
  type TextFieldProps,
} from 'react-aria-components';
```

## 主要 props（TextField）

| prop | 型 | デフォルト | 説明 |
|------|----|-----------|------|
| `value` | `string` | — | 現在の値（制御） |
| `defaultValue` | `string` | — | 初期値（非制御） |
| `onChange` | `(value: string) => void` | — | 値変更ハンドラ |
| `type` | `'text' \| 'search' \| 'tel' \| 'url' \| 'email' \| 'password'` | `'text'` | input の type |
| `isDisabled` | `boolean` | — | 無効化 |
| `isReadOnly` | `boolean` | — | 読み取り専用 |
| `isRequired` | `boolean` | — | 必須 |
| `isInvalid` | `boolean` | — | バリデーションエラー状態 |
| `name` | `string` | — | フォーム送信時の名前 |
| `minLength` | `number` | — | 最小文字数 |
| `maxLength` | `number` | — | 最大文字数 |
| `pattern` | `string` | — | バリデーション正規表現 |
| `autoComplete` | `string` | — | オートコンプリート |
| `inputMode` | `'text' \| 'none' \| 'search' \| 'tel' \| 'url' \| 'email' \| 'numeric' \| 'decimal'` | — | 仮想キーボードのヒント |
| `validate` | `(value: string) => ValidationError \| null` | — | カスタムバリデーション |
| `validationBehavior` | `'native' \| 'aria'` | `'native'` | バリデーション方式 |
| `onFocus` / `onBlur` | — | — | フォーカスイベント |
| `onFocusChange` | `(isFocused: boolean) => void` | — | フォーカス変化 |
| `onKeyDown` / `onKeyUp` | — | — | キーイベント |

## 状態セレクタ（tailwindcss-react-aria-components）

`Input` / `TextArea` 要素に適用されるデータ属性：

| セレクタ | 条件 | 用途例 |
|---------|------|-------|
| `[data-focused]` | フォーカス中 | フォーカスリング表示 |
| `[data-hovered]` または `hovered:` | ホバー中 | ボーダー色変化 |
| `[data-disabled]` または `disabled:` | 無効状態 | 不透明度低下 |
| `[data-invalid]` または `invalid:` | バリデーションエラー | ボーダーを danger 色に |
| `[data-required]` | 必須フィールド | アスタリスク表示 |
| `[data-read-only]` | 読み取り専用 | 背景色変更 |

`TextField` ルート要素には上記の状態が `data-*` 属性で付与される。
`focus-visible:` は Input 要素のフォーカスリングに使用する。

## kz-shared-ui 実装方針メモ

### ラッパーの構成方針

- `TextField`（RAC）をラップし、`Label`・`Input`・説明文・エラーメッセージをセットで提供する
- CLAUDE.md の方針通り、`Label` と `Text` は RAC のものを内部で使う（単体コンポーネントは作らない）
- エラーメッセージは `FieldError`（RAC）で表示

### tv() でのスタイル設計

```tsx
// Input 要素のスタイル
const inputStyles = tv({
  base: [
    'w-full rounded-md border border-input bg-input',
    'px-3 py-2 text-base text-body',
    'placeholder:text-input-placeholder',
    'outline-none',
    'focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-0',
    'focus-visible:border-input-focus',
    'disabled:bg-disabled disabled:text-disabled disabled:border-disabled disabled:cursor-not-allowed',
    'invalid:border-danger',
    'transition-colors duration-150',
  ],
});
```

### Props 型設計

```tsx
export type TextFieldProps = AriaTextFieldProps & {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
  className?: string;
};
```

### 注意点

- `focus-visible:ring-focus-ring` を使う（`ring-[--color-focus-ring]` ではない）
- `hovered:` セレクタは `tailwindcss-react-aria-components` プラグイン由来
- `isInvalid` はリアルタイムバリデーションに、`validate` はフォーム送信時に使い分ける
- `TextArea` バリアントは別途 `multiline` prop で切り替えるか、別コンポーネントにする

## Stories で確認すべきバリエーション

- デフォルト（label + Input）
- placeholder あり
- description テキストあり
- エラー状態（`isInvalid` + `errorMessage`）
- 無効状態（`isDisabled`）
- 読み取り専用（`isReadOnly`）
- type: `password`
- type: `email` / `url`
- TextArea（複数行）
- 必須フィールド（`isRequired`）
- フォームバリデーション連携
- カスタムクラスの上書き確認
