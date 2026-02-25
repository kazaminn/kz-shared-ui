# Select — React Aria 調査メモ

## コンポーネント概要

`Select` はクリックすると Popover でリストが開くドロップダウン。`ListBox` を再利用し、sections・disabled items・動的コレクション等 ListBox の機能をそのまま使える。

## アナトミー

```tsx
<Select>
  <Label />
  <Button>
    <SelectValue />
    {/* chevron アイコン等 */}
  </Button>
  <Text slot="description" />
  <FieldError />
  <Popover>
    <ListBox>
      <ListBoxItem />
    </ListBox>
  </Popover>
</Select>
```

## 必須の import

```tsx
import {
  Button,
  FieldError,
  type Key,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  type SelectProps,
  SelectValue,
  Text,
} from 'react-aria-components';
```

## 主要 props（Select）

| prop                                   | 型                                   | デフォルト                             | 説明                     |
| -------------------------------------- | ------------------------------------ | -------------------------------------- | ------------------------ |
| `selectedKey`                          | `Key \| null`                        | —                                      | 選択中のキー（制御）     |
| `defaultSelectedKey`                   | `Key`                                | —                                      | 初期選択キー（非制御）   |
| `value`                                | `ValueType<M>`                       | —                                      | 現在の値（制御）         |
| `defaultValue`                         | `ValueType<M>`                       | —                                      | 初期値（非制御）         |
| `onChange`                             | `(value: ValueType<M>) => void`      | —                                      | 値変更ハンドラ           |
| `onSelectionChange`                    | `(key: Key \| null) => void`         | —                                      | 選択キー変更ハンドラ     |
| `isOpen`                               | `boolean`                            | —                                      | 開閉状態（制御）         |
| `defaultOpen`                          | `boolean`                            | —                                      | 初期開閉状態（非制御）   |
| `onOpenChange`                         | `(isOpen: boolean) => void`          | —                                      | 開閉変化ハンドラ         |
| `isDisabled`                           | `boolean`                            | —                                      | 無効化                   |
| `isInvalid`                            | `boolean`                            | —                                      | バリデーションエラー状態 |
| `isRequired`                           | `boolean`                            | —                                      | 必須                     |
| `name`                                 | `string`                             | —                                      | フォーム送信時の名前     |
| `placeholder`                          | `string`                             | `'Select an item'`（ローカライズ済み） | 未選択時のプレースホルダ |
| `disabledKeys`                         | `Iterable<Key>`                      | —                                      | 無効にするアイテムのキー |
| `selectionMode`                        | `'single' \| 'multiple'`             | `'single'`                             | 選択モード               |
| `autoComplete`                         | `string`                             | —                                      | オートコンプリート       |
| `validate`                             | `(value) => ValidationError \| null` | —                                      | カスタムバリデーション   |
| `validationBehavior`                   | `'native' \| 'aria'`                 | `'native'`                             | バリデーション方式       |
| `onFocus` / `onBlur` / `onFocusChange` | —                                    | —                                      | フォーカスイベント       |
| `onKeyDown` / `onKeyUp`                | —                                    | —                                      | キーイベント             |

## 状態セレクタ（tailwindcss-react-aria-components）

`Select` ルート・`Button`・`ListBoxItem` に付与されるデータ属性：

### Button（トリガー）

| セレクタ         | 条件                 |
| ---------------- | -------------------- |
| `hovered:`       | ホバー中             |
| `pressed:`       | プレス中             |
| `focus-visible:` | キーボードフォーカス |
| `disabled:`      | 無効状態             |

### Select ルート

| セレクタ    | 条件                                   |
| ----------- | -------------------------------------- |
| `open:`     | Popover が開いている（`data-open`）    |
| `invalid:`  | バリデーションエラー（`data-invalid`） |
| `disabled:` | 無効状態                               |

### ListBoxItem

| セレクタ         | 条件                           |
| ---------------- | ------------------------------ |
| `selected:`      | 選択中（`data-selected`）      |
| `focused:`       | フォーカス中（`data-focused`） |
| `hovered:`       | ホバー中                       |
| `disabled:`      | 無効状態                       |
| `focus-visible:` | キーボードフォーカス           |

## kz-shared-ui 実装方針メモ

### 構造設計方針

Select は複合コンポーネントのため、ラッパーで Button・Popover・ListBox をまとめて提供する。
使用側は `<SelectItem>` だけを書けばよい形にするのが理想。

```tsx
// kz-shared-ui が提供するコンポーネント
<Select label="Animal" placeholder="動物を選択">
  <SelectItem id="cat">猫</SelectItem>
  <SelectItem id="dog">犬</SelectItem>
</Select>
```

### tv() でのスタイル設計

```tsx
// Button（トリガー）のスタイル
const triggerStyles = tv({
  base: [
    'inline-flex w-full items-center justify-between gap-2',
    'h-10 rounded-md px-3 py-2',
    'border border-input bg-input text-body',
    'cursor-default text-base',
    'outline-none',
    'focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2',
    'disabled:border-disabled disabled:bg-disabled disabled:text-disabled',
    'invalid:border-danger',
    'transition-colors duration-150',
  ],
});

// ListBoxItem のスタイル
const itemStyles = tv({
  base: [
    'flex items-center gap-2 px-3 py-2',
    'cursor-default rounded-sm text-base text-body',
    'outline-none',
    'focus-visible:ring-2 focus-visible:ring-focus-ring',
    'focused:bg-surface',
    'selected:font-medium',
    'disabled:text-disabled',
  ],
});
```

### Props 型設計

```tsx
export type SelectProps<T extends object = object> = AriaSelectProps<T> & {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  className?: string;
};
```

### 注意点

- `Popover` は `react-aria-components` の `Popover` を使う（z-index・アニメーション設定が必要）
- `SelectValue` は選択中のアイテムのラベルを表示する。カスタム表示は children render prop で
- `onSelectionChange` は key を返し、`onChange` は value を返す。用途に応じて使い分け
- 複数選択（`selectionMode="multiple"`）は MyYomuMoji では現時点で不要だが将来のために記録

## Stories で確認すべきバリエーション

- デフォルト（未選択）
- 初期値あり（`defaultSelectedKey`）
- 制御モード（`selectedKey` + `onSelectionChange`）
- disabled items あり
- 全体無効（`isDisabled`）
- バリデーションエラー（`isInvalid`）
- 必須（`isRequired`）
- セクション（グループ）付きリスト
- 動的コレクション（`items` prop + render function）
- Popover 開閉アニメーション確認
- キーボード操作（Alt+↓ で開く、Arrow keys で選択、Enter で確定、Escape で閉じる）
