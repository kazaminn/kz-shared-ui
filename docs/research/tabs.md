# Tabs — React Aria 調査メモ

## コンポーネント概要

`Tabs` はコンテンツを複数のセクションに整理し、タブで切り替えるコンポーネント。`TabList`・`Tab`・`TabPanel` の3階層構造。静的・動的コレクションの両方に対応。

## アナトミー

```tsx
<Tabs>
  <TabList aria-label="タブ名">
    <Tab id="tab1">タブ1</Tab>
    <Tab id="tab2">タブ2</Tab>
  </TabList>
  <TabPanel id="tab1">コンテンツ1</TabPanel>
  <TabPanel id="tab2">コンテンツ2</TabPanel>
</Tabs>
```

`Tab` の `id` と `TabPanel` の `id` が対応している必要がある。

## 必須の import

```tsx
import {
  Collection,
  type Key,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  // 動的コレクションの場合
  type TabsProps,
} from 'react-aria-components';
```

## 主要 props

### Tabs

| prop                 | 型                           | デフォルト     | 説明                                       |
| -------------------- | ---------------------------- | -------------- | ------------------------------------------ |
| `selectedKey`        | `Key \| null`                | —              | 選択中のタブキー（制御）                   |
| `defaultSelectedKey` | `Key`                        | —              | 初期選択タブキー（非制御）                 |
| `onSelectionChange`  | `(key: Key) => void`         | —              | 選択変化ハンドラ                           |
| `orientation`        | `'horizontal' \| 'vertical'` | `'horizontal'` | タブの向き                                 |
| `keyboardActivation` | `'automatic' \| 'manual'`    | `'automatic'`  | フォーカスで自動選択 or Enter/Space で選択 |
| `isDisabled`         | `boolean`                    | —              | 全タブ無効化                               |
| `disabledKeys`       | `Iterable<Key>`              | —              | 個別タブを無効にするキー                   |

### Tab

| prop                                            | 型                        | デフォルト | 説明                                             |
| ----------------------------------------------- | ------------------------- | ---------- | ------------------------------------------------ |
| `id`                                            | `Key`                     | —          | タブの一意なID（TabPanelのidと対応）             |
| `isDisabled`                                    | `boolean`                 | —          | このタブを無効化                                 |
| `href`                                          | `string`                  | —          | リンクタブ（クライアントサイドルーティング対応） |
| `onPress`                                       | `(e: PressEvent) => void` | —          | タブ押下ハンドラ                                 |
| `onHoverStart` / `onHoverEnd` / `onHoverChange` | —                         | —          | ホバーイベント                                   |

### TabList

| prop         | 型            | デフォルト | 説明                                 |
| ------------ | ------------- | ---------- | ------------------------------------ |
| `aria-label` | `string`      | —          | TabList のアクセシブルラベル（推奨） |
| `items`      | `Iterable<T>` | —          | 動的コレクション用                   |

### TabPanel

| prop               | 型        | デフォルト | 説明                                               |
| ------------------ | --------- | ---------- | -------------------------------------------------- |
| `id`               | `Key`     | —          | 対応するTabのIDと一致させる                        |
| `shouldForceMount` | `boolean` | `false`    | 非表示でもDOMにマウント（SEO・アニメーション対応） |

## 状態セレクタ（tailwindcss-react-aria-components）

### Tab

| セレクタ         | 条件                                         |
| ---------------- | -------------------------------------------- |
| `selected:`      | 選択中（`data-selected`）                    |
| `hovered:`       | ホバー中（`data-hovered`）                   |
| `pressed:`       | プレス中（`data-pressed`）                   |
| `focus-visible:` | キーボードフォーカス（`data-focus-visible`） |
| `disabled:`      | 無効状態（`data-disabled`）                  |
| `focus-visible:` | キーボードフォーカス                         |

### Tabs ルート

| セレクタ                  | 条件                                        |
| ------------------------- | ------------------------------------------- |
| `orientation-horizontal:` | 水平向き（`data-orientation="horizontal"`） |
| `orientation-vertical:`   | 垂直向き（`data-orientation="vertical"`）   |

## kz-shared-ui 実装方針メモ

### 設計方針

Tabs は TabList + Tab + TabPanel をセットで export する。
選択インジケーター（下線やピル等）は `selected:` セレクタで実装する。

```tsx
// 基本的なタブインジケーターパターン
// アプローチ1: selected: で下線を表示
const tabStyles = tv({
  base: [
    'cursor-default px-4 py-2 text-sm font-medium',
    'outline-none',
    'border-b-2 border-transparent',
    'focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-inset',
    'text-muted',
    'hovered:text-body',
    'disabled:cursor-not-allowed disabled:text-disabled',
    'transition-colors duration-150',
  ],
  variants: {
    isSelected: {
      // tailwind-variants で isSelected を受け取る場合
    },
  },
});
```

`selected:` セレクタを使う場合：

```tsx
// selected: でボーダー色を切り替え
'selected:border-primary selected:text-primary';
```

### tv() でのスタイル設計

```tsx
const tabListStyles = tv({
  base: 'flex border-b border-main',
  variants: {
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col border-r border-b-0',
    },
  },
});

const tabStyles = tv({
  base: [
    'cursor-default px-4 py-2 text-sm font-medium',
    '-mb-px border-b-2 border-transparent outline-none',
    'text-muted transition-colors duration-150',
    'focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-inset',
    'hovered:text-body',
    'selected:text-primary selected:border-primary',
    'disabled:text-disabled',
  ],
});

const tabPanelStyles = tv({
  base: 'pt-4 outline-none focus-visible:ring-2 focus-visible:ring-focus-ring',
});
```

### Props 型設計

```tsx
export type TabsProps = AriaTabsProps & {
  className?: string;
};
```

### キーボード操作

| キー                               | 動作                                                                |
| ---------------------------------- | ------------------------------------------------------------------- |
| `Tab`                              | TabList にフォーカス → TabPanel にフォーカス                        |
| `←` / `→`（水平）`↑` / `↓`（垂直） | タブ間を移動（`automatic` では即選択、`manual` ではフォーカスのみ） |
| `Enter` / `Space`                  | `manual` モードで選択                                               |
| `Home` / `End`                     | 最初・最後のタブへ                                                  |

### 注意点

- `TabList` には `aria-label` または `aria-labelledby` が必要（スクリーンリーダーのナビゲーション用）
- `Tab` の `id` と `TabPanel` の `id` は完全に一致させること
- `shouldForceMount` は SEO やフォームデータ保持が必要な場合に使用（非表示タブは `inert` 属性で操作不可になる）
- `keyboardActivation="manual"` は大きなコンテンツをロードする場合に選択（フォーカスだけではロードしない）

## Stories で確認すべきバリエーション

- 基本（3タブ・水平）
- 初期選択タブ指定（`defaultSelectedKey`）
- 制御モード（`selectedKey` + `onSelectionChange`）
- 個別タブ無効（`isDisabled` on Tab）
- 全タブ無効（`isDisabled` on Tabs）
- 垂直向き（`orientation="vertical"`）
- 動的コレクション（`items` prop + render function）
- タブの追加・削除（動的）
- `keyboardActivation="manual"` モード
- `shouldForceMount` でDOM保持
- リンクタブ（`href` prop）
- アイコン付きタブ
- キーボード操作フロー確認
