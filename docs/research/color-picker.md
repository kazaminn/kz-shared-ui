# ColorPicker — React Aria 調査メモ

## コンポーネント概要

`ColorPicker` は複数の RAC カラーコンポーネント間でカラー値を同期するコンテキストプロバイダー。
UI そのものは持たず、内部に配置した `ColorArea`・`ColorSlider`・`ColorField`・`ColorSwatch` 等が自動でカラー値を共有する。

## アナトミー

```tsx
<ColorPicker value={color} onChange={setColor}>
  {/* 以下の子コンポーネントが値を共有 */}
  <ColorArea colorSpace="hsb" xChannel="saturation" yChannel="brightness" />
  <ColorSlider colorSpace="hsb" channel="hue" />
  <ColorField label="Hex" />
  <ColorSwatch />
</ColorPicker>
```

典型的な使い方として、`DialogTrigger` + `Button`（ColorSwatch 内包）+ `Popover` を組み合わせてカラーピッカーポップオーバーを作る。

## 必須の import

```tsx
import {
  type Color,
  ColorArea,
  ColorField,
  ColorPicker,
  type ColorPickerProps,
  ColorSlider,
  type ColorSpace,
  ColorSwatch,
  ColorSwatchPicker,
  ColorSwatchPickerItem,
  ColorWheel,
  getColorChannels,
  parseColor,
} from 'react-aria-components';
```

## 主要 props（ColorPicker）

| prop           | 型                                        | デフォルト | 説明                                              |
| -------------- | ----------------------------------------- | ---------- | ------------------------------------------------- |
| `value`        | `string \| Color`                         | —          | 現在のカラー値（制御）                            |
| `defaultValue` | `string \| Color`                         | —          | 初期カラー値（非制御）                            |
| `onChange`     | `(value: Color) => void`                  | —          | 値変更ハンドラ（常に `Color` オブジェクトで返る） |
| `children`     | `ReactNode \| (renderProps) => ReactNode` | —          | 子コンポーネント群                                |
| `slot`         | `string \| null`                          | —          | スロット名                                        |

**注意**: 値の文字列入力（`"#ff0000"` 等）は自動で `Color` オブジェクトに変換される。`onChange` は常に `Color` オブジェクトを返す。

## 関連コンポーネントの概要

### ColorArea

2次元のグラデーション上でSaturation/Brightnessを調整する2Dエリア。

```tsx
<ColorArea colorSpace="hsb" xChannel="saturation" yChannel="brightness" />
```

### ColorSlider

単一チャンネルをスライダーで調整。

```tsx
<ColorSlider colorSpace="hsb" channel="hue" />
<ColorSlider channel="alpha" />  // アルファチャンネル
```

### ColorField

テキスト入力でカラー値（16進数 or チャンネル値）を編集。

```tsx
<ColorField label="Hex" />
<ColorField colorSpace="rgb" channel="red" label="R" />
```

### ColorSwatchPicker

プリセットカラーのスウォッチ一覧から選択。

```tsx
<ColorSwatchPicker>
  <ColorSwatchPickerItem color="#A00" />
  <ColorSwatchPickerItem color="#080" />
</ColorSwatchPicker>
```

### ColorWheel

HSL/HSB の Hue を円形トラックで調整。

```tsx
<ColorWheel />
```

## ユーティリティ

| 関数                               | 用途                                   |
| ---------------------------------- | -------------------------------------- |
| `parseColor('hsl(50, 100%, 50%)')` | 文字列 → `Color` オブジェクト変換      |
| `getColorChannels('rgb')`          | カラースペースのチャンネル名配列を取得 |

## kz-shared-ui 実装方針メモ

### 設計方針

ColorPicker は MyYomuMoji の「よむもじ」カラー選択機能に対応するため実装する。
複雑な複合コンポーネントのため、**ラッパーで完全にカプセル化するのではなく、コンポーザブルな形で提供する**ことも選択肢。

#### オプション A: 完全ラッパー（シンプルな UI 固定）

```tsx
<ColorPicker label="文字色" defaultValue="#000000" onChange={setColor} />
```

内部に ColorArea + ColorSlider（Hue） + ColorField（Hex）を固定配置。

#### オプション B: コンポーザブル（柔軟な UI）

```tsx
<ColorPicker value={color} onChange={setColor}>
  <ColorPickerTrigger label="文字色" />
  <ColorPickerPopover>
    <ColorArea />
    <ColorSlider channel="hue" />
    <ColorField label="Hex" />
    <ColorSwatchPicker>{/* プリセット */}</ColorSwatchPicker>
  </ColorPickerPopover>
</ColorPicker>
```

MyYomuMoji のニーズを確認してから選択する。

### トリガーパターン

```tsx
// DialogTrigger + Button(ColorSwatch) + Popover パターン
<ColorPicker defaultValue="#345">
  <DialogTrigger>
    <Button aria-label="カラーを選択" className={triggerStyles}>
      <ColorSwatch />
      <span>カラーを選択</span>
    </Button>
    <Popover placement="bottom start">
      <ColorArea colorSpace="hsb" xChannel="saturation" yChannel="brightness" />
      <ColorSlider colorSpace="hsb" channel="hue" />
      <ColorField label="Hex" />
    </Popover>
  </DialogTrigger>
</ColorPicker>
```

### カラースペース切り替えパターン

```tsx
const [space, setSpace] = useState<ColorSpace>('rgb');

<Select
  selectedKey={space}
  onSelectionChange={(s) => setSpace(s as ColorSpace)}
>
  <SelectItem id="rgb">RGB</SelectItem>
  <SelectItem id="hsl">HSL</SelectItem>
</Select>;
{
  getColorChannels(space).map((channel) => (
    <ColorSlider key={channel} colorSpace={space} channel={channel} />
  ));
}
```

### 注意点

- `ColorPicker` は純粋なコンテキストプロバイダーのため、独自のDOM要素を持たない
- 子コンポーネントが `slot` prop で ColorPicker のコンテキストに自動接続される
- `parseColor()` を使うと型安全に初期値を設定できる（文字列だと `Color | string` 型になる）
- `onChange` のコールバックは常に `Color` オブジェクト。文字列で使いたい場合は `color.toString('hex')` 等で変換

## Stories で確認すべきバリエーション

- 基本（ColorArea + HueSlider + HexField）
- ColorWheel + ColorArea の組み合わせ
- カラースペース切り替え（RGB / HSL / HSB）
- アルファチャンネルスライダー付き
- ColorSwatchPicker（プリセット）付き
- 全チャンネルの数値入力フィールド付き
- 制御モード（`value` + `onChange`）
- `parseColor` で初期値設定
- Popover のトリガーボタンパターン
- キーボード操作確認（ColorArea の矢印キー・TabでSliderへ移動等）
