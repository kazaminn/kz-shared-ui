# Slider — React Aria 調査メモ

## コンポーネント概要

`Slider` はドラッグまたはキーボードで値を選択するスライダー。単一値・範囲（マルチサム）・水平/垂直向きに対応。内部に `SliderTrack` と `SliderThumb` を配置する複合コンポーネント。

## アナトミー

```tsx
<Slider>
  <Label />
  <SliderOutput /> {/* 現在値の表示 */}
  <SliderTrack>
    {/* render prop 内でトラック・フィル・サムを配置 */}
    <SliderThumb />
    <SliderThumb /> {/* 範囲スライダーの場合は2つ */}
  </SliderTrack>
</Slider>
```

## 必須の import

```tsx
import {
  Label,
  Slider,
  SliderOutput,
  type SliderProps,
  SliderThumb,
  SliderTrack,
} from 'react-aria-components';
```

## 主要 props

### Slider

| prop            | 型                           | デフォルト     | 説明                       |
| --------------- | ---------------------------- | -------------- | -------------------------- |
| `value`         | `number \| number[]`         | —              | 現在の値（制御）           |
| `defaultValue`  | `number \| number[]`         | —              | 初期値（非制御）           |
| `onChange`      | `(value: T) => void`         | —              | ドラッグ中に発火           |
| `onChangeEnd`   | `(value: T) => void`         | —              | ドラッグ終了時に発火       |
| `minValue`      | `number`                     | `0`            | 最小値                     |
| `maxValue`      | `number`                     | `100`          | 最大値                     |
| `step`          | `number`                     | `1`            | ステップ幅                 |
| `orientation`   | `'horizontal' \| 'vertical'` | `'horizontal'` | 向き                       |
| `isDisabled`    | `boolean`                    | —              | 無効化                     |
| `formatOptions` | `Intl.NumberFormatOptions`   | —              | 値ラベルの表示フォーマット |

### SliderThumb

| prop         | 型        | デフォルト | 説明                                                 |
| ------------ | --------- | ---------- | ---------------------------------------------------- |
| `index`      | `number`  | `0`        | 複数サムの場合のインデックス                         |
| `aria-label` | `string`  | —          | スクリーンリーダー用ラベル（範囲スライダーでは必須） |
| `isDisabled` | `boolean` | —          | 個別サムの無効化                                     |
| `name`       | `string`  | —          | フォーム送信時の名前                                 |

## SliderTrackRenderProps・SliderThumbRenderProps

### SliderTrack children render prop

```tsx
<SliderTrack>
  {({ state, isDisabled, isHovered }) => (
    <>
      {/* state.values: 現在の値の配列 */}
      {/* state.getThumbPercent(index): サムの位置（0〜1） */}
      {/* state.getThumbValueLabel(index): 表示用ラベル文字列 */}
    </>
  )}
</SliderTrack>
```

### SliderThumb の状態

| データ属性           | セレクタ         | 条件                 |
| -------------------- | ---------------- | -------------------- |
| `data-dragging`      | `dragging:`      | ドラッグ中           |
| `data-hovered`       | `hovered:`       | ホバー中             |
| `data-focused`       | `focused:`       | フォーカス中         |
| `data-focus-visible` | `focus-visible:` | キーボードフォーカス |
| `data-disabled`      | `disabled:`      | 無効状態             |

### SliderTrack の状態

| データ属性         | セレクタ                                            | 条件     |
| ------------------ | --------------------------------------------------- | -------- |
| `data-hovered`     | `hovered:`                                          | ホバー中 |
| `data-orientation` | `orientation-horizontal:` / `orientation-vertical:` | 向き     |
| `data-disabled`    | `disabled:`                                         | 無効状態 |

### Slider ルートの状態

| データ属性         | セレクタ                                            | 条件     |
| ------------------ | --------------------------------------------------- | -------- |
| `data-orientation` | `orientation-horizontal:` / `orientation-vertical:` | 向き     |
| `data-disabled`    | `disabled:`                                         | 無効状態 |

## kz-shared-ui 実装方針メモ

### 構造設計方針

フィル（塗りつぶし部分）は CSS absolute で独自実装が必要。RAC は視覚的なフィルを提供しないため、`state.getThumbPercent(0)` を使って CSS 変数で幅を指定する。

単一サムのフィル例：

```tsx
<div
  className="absolute h-full rounded-full bg-primary"
  style={{ width: `${state.getThumbPercent(0) * 100}%` }}
/>
```

### tv() でのスタイル設計

```tsx
const thumbStyles = tv({
  base: [
    'h-5 w-5 rounded-full',
    'border-2 border-white bg-primary',
    'cursor-grab shadow-sm',
    'outline-none',
    'focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2',
    'dragging:scale-110 dragging:cursor-grabbing',
    'disabled:cursor-not-allowed disabled:bg-disabled',
    'transition-transform duration-100',
  ],
});

const trackStyles = tv({
  base: 'relative flex items-center',
  variants: {
    orientation: {
      horizontal: 'h-5 w-full',
      vertical: 'h-40 w-5',
    },
  },
});
```

### Props 型設計

```tsx
export type SliderProps<T extends number | number[]> = AriaSliderProps<T> & {
  label?: string;
  thumbLabels?: string[]; // 範囲スライダー用 aria-label
  className?: string;
};
```

### 注意点

- 範囲スライダー（`defaultValue={[min, max]}`）では各サムに `aria-label` が必須
- `onChangeEnd` を使うとパフォーマンス改善（ドラッグ完了後のみ API 呼び出し等）
- `formatOptions` で値表示をフォーマット可能（例: `{ style: 'percent' }`）
- vertical 向きは `orientation-vertical:` セレクタで対応
- フィルの CSS 計算は `state.getThumbPercent()` を使い、render prop 内でインラインスタイルとして渡す

## Stories で確認すべきバリエーション

- デフォルト（水平、単一値）
- 初期値あり（`defaultValue`）
- 制御モード（`value` + `onChange`）
- カスタム範囲（`minValue`・`maxValue`・`step`）
- 範囲スライダー（`defaultValue={[20, 80]}`）
- 無効状態（`isDisabled`）
- 垂直向き（`orientation="vertical"`）
- 値表示フォーマット（`formatOptions`）
- `onChangeEnd` で確定値のみ取得するパターン
- キーボード操作（Arrow keys で値変更、Home/End で min/max）
