# Switch — React Aria 調査メモ

## コンポーネント概要

`Switch` はオン/オフを切り替えるトグルスイッチ。`<label>` ベースのコンポーネントで、内部に隠し `<input type="checkbox">` を持つ。

## アナトミー

```tsx
<Switch>
  {/* track + handle + label text を children として構築 */}
  Label text
</Switch>
```

内部構造は children render prop で自分でレンダリングする。

## 必須の import

```tsx
import {
  Switch,
  type SwitchProps,
  type SwitchRenderProps,
} from 'react-aria-components';
```

## 主要 props

| prop | 型 | デフォルト | 説明 |
|------|----|-----------|------|
| `isSelected` | `boolean` | — | 選択状態（制御） |
| `defaultSelected` | `boolean` | — | 初期選択状態（非制御） |
| `onChange` | `(isSelected: boolean) => void` | — | 変更ハンドラ |
| `isDisabled` | `boolean` | — | 無効化 |
| `isReadOnly` | `boolean` | — | 読み取り専用 |
| `name` | `string` | — | フォーム送信時の名前 |
| `value` | `string` | — | フォーム送信時の値 |
| `autoFocus` | `boolean` | — | 自動フォーカス |
| `inputRef` | `RefObject<HTMLInputElement>` | — | input への ref |
| `children` | `ReactNode \| (renderProps) => ReactNode` | — | ラベルテキスト or render prop |
| `onFocus` / `onBlur` | — | — | フォーカスイベント |
| `onFocusChange` | `(isFocused: boolean) => void` | — | フォーカス変化 |
| `onHoverStart` / `onHoverEnd` / `onHoverChange` | — | — | ホバーイベント |
| `onKeyDown` / `onKeyUp` | — | — | キーイベント |

## SwitchRenderProps（children render prop で参照可能）

| プロパティ | 型 | 説明 |
|-----------|-----|------|
| `isSelected` | `boolean` | 選択中か |
| `isDisabled` | `boolean` | 無効か |
| `isReadOnly` | `boolean` | 読み取り専用か |
| `isHovered` | `boolean` | ホバー中か |
| `isFocused` | `boolean` | フォーカス中か |
| `isFocusVisible` | `boolean` | キーボードフォーカスか |
| `isPressed` | `boolean` | プレス中か |

## 状態セレクタ（tailwindcss-react-aria-components）

`Switch` ルート（`<label>`）に付与されるデータ属性：

| セレクタ | 条件 |
|---------|------|
| `selected:` | 選択中（`data-selected`） |
| `disabled:` | 無効状態（`data-disabled`） |
| `focus-visible:` | キーボードフォーカス（`data-focus-visible`） |
| `hovered:` | ホバー中（`data-hovered`） |
| `pressed:` | プレス中（`data-pressed`） |
| `readonly:` | 読み取り専用（`data-readonly`） |

## kz-shared-ui 実装方針メモ

### 構造設計

Switch は外部ラベルテキストとトグル本体（track + handle）を組み合わせる。
children render prop で `isSelected` などを参照してスタイル切り替えを行う。

```tsx
<AriaSwitch {...props} className={switchRoot({ className })}>
  {({ isSelected, isDisabled }) => (
    <>
      <span className={track({ isSelected, isDisabled })}>
        <span className={handle({ isSelected, isDisabled })} />
      </span>
      {children}
    </>
  )}
</AriaSwitch>
```

### tv() でのスタイル設計

```tsx
const track = tv({
  base: [
    'inline-flex items-center shrink-0 cursor-default',
    'h-6 w-11 rounded-full px-0.5',
    'border border-transparent',
    'transition-colors duration-200',
    'focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2',
  ],
  variants: {
    isSelected: {
      false: 'bg-disabled',
      true: 'bg-primary',
    },
    isDisabled: {
      true: 'opacity-50 cursor-not-allowed',
    },
  },
});

const handle = tv({
  base: [
    'block h-5 w-5 rounded-full bg-white shadow-sm',
    'transition-transform duration-200',
  ],
  variants: {
    isSelected: {
      false: 'translate-x-0',
      true: 'translate-x-5',
    },
  },
});
```

### Props 型設計

```tsx
// Switch は children が必須なので Omit して自分で定義
export type SwitchProps = Omit<AriaSwitchProps, 'children'> & {
  children: React.ReactNode;
  className?: string;
};
```

### 注意点

- フォーカスリングは track（トグル本体）に当てる（ルートの label ではなく）
  - ただし `data-focus-visible` は Switch ルートに付与されるため、`group` と `group-data-[focus-visible]:` の組み合わせで track に転写する方法もある
  - 公式 Tailwind 例では track に `focusRing` を extend している
- `selected:` セレクタで track の背景色を切り替える場合、children render prop で `isSelected` を受け取って tv() に渡す方が確実

## Stories で確認すべきバリエーション

- デフォルト（オフ状態）
- 選択済み（`defaultSelected`）
- 制御モード（`isSelected` + `onChange`）
- 無効状態（`isDisabled`）
- 読み取り専用（`isReadOnly`）
- キーボードフォーカス確認（Tab キーでフォーカス → Space で切り替え）
- カスタムラベルテキスト
- フォーム内での使用（`name` + `value`）
