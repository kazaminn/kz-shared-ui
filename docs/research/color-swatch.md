# ColorSwatch — React Aria 調査メモ

## コンポーネント概要

`ColorSwatch` は選択中のカラー値をプレビュー表示する単純なコンポーネント。インタラクション機能は持たず、表示専用。透明度を示す市松模様（checkerboard）パターンと重ねて表示することでアルファ値も視覚化できる。

## アナトミー

```tsx
<ColorSwatch color="#ff0000" />
```

単体 div。`style` render prop に色情報が渡される。

## 必須の import

```tsx
import {
  ColorSwatch,
  type ColorSwatchProps,
  type ColorSwatchRenderProps,
} from 'react-aria-components';
```

## 主要 props

| prop         | 型                                                  | デフォルト                 | 説明                                                 |
| ------------ | --------------------------------------------------- | -------------------------- | ---------------------------------------------------- |
| `color`      | `string \| Color`                                   | —                          | 表示するカラー値（文字列または Color オブジェクト）  |
| `colorName`  | `string`                                            | —                          | スクリーンリーダー用カラー名（デフォルトは自動生成） |
| `aria-label` | `string`                                            | —                          | 追加のアクセシブルラベル（例: "背景色"）             |
| `className`  | `string \| ((renderProps) => string)`               | `'react-aria-ColorSwatch'` | クラス名                                             |
| `style`      | `CSSProperties \| ((renderProps) => CSSProperties)` | —                          | インラインスタイル（色の背景を設定するために必須）   |
| `slot`       | `string \| null`                                    | —                          | 親コンポーネントのスロット名                         |

## ColorSwatchRenderProps（style/className render prop で参照可能）

| プロパティ | 型      | 説明                     |
| ---------- | ------- | ------------------------ |
| `color`    | `Color` | 現在のカラーオブジェクト |

`Color` オブジェクトは `toString('hex')` `toString('rgba')` `toString('hsl')` 等で文字列変換できる。

## 状態セレクタ

ColorSwatch はインタラクション機能を持たないため、RAC 状態セレクタは**ない**。
スタイリングは主にインラインスタイルの `style` render prop で行う。

## kz-shared-ui 実装方針メモ

### 用途と構造設計

ColorSwatch は主に ColorPicker のトリガー内部に埋め込んで使う。
単体でも `<ColorSwatch color={value} aria-label="現在の色" />` として使用可能。

透明度対応のためにチェッカーボード背景との合成が推奨：

```tsx
<AriaColorSwatch
  {...props}
  style={({ color }) => ({
    background: `linear-gradient(${color}, ${color}),
      repeating-conic-gradient(#CCC 0% 25%, white 0% 50%) 50% / 16px 16px`,
  })}
/>
```

### tv() でのスタイル設計

```tsx
const colorSwatchStyles = tv({
  base: [
    'h-8 w-8 rounded-md',
    'border border-black/10', // 暗い色での視認性のため
    'shadow-sm',
  ],
  variants: {
    size: {
      sm: 'h-6 w-6',
      md: 'h-8 w-8',
      lg: 'h-10 w-10',
    },
    shape: {
      square: 'rounded-md',
      circle: 'rounded-full',
    },
  },
  defaultVariants: {
    size: 'md',
    shape: 'square',
  },
});
```

### Props 型設計

```tsx
export type ColorSwatchProps = AriaColorSwatchProps &
  VariantProps<typeof colorSwatchStyles> & {
    className?: string;
  };
```

### アクセシビリティ注意点

- スクリーンリーダーはデフォルトで自動生成カラー名（例: "dark vibrant blue"）を読み上げる
- より具体的な名前がある場合（Pantone カラー等）は `colorName` prop で上書き
- 追加コンテキスト（"背景色"・"文字色"等）は `aria-label` で付与
- スクリーンリーダーは "Fire truck red, Background color" のように読み上げる

```tsx
<ColorSwatch color="#f00" aria-label="背景色" colorName="消防車レッド" />
```

## Stories で確認すべきバリエーション

- 基本表示（16進数カラー文字列）
- RGB・HSL・HSB 各カラー形式
- アルファ値あり（半透明色のチェッカーボード表示）
- 各サイズ（sm / md / lg）
- 円形・角丸（shape バリアント）
- `colorName` と `aria-label` の組み合わせ
- ColorPicker 内でのスロット使用（`slot` prop）
- 暗い色・明るい色での境界線視認性
