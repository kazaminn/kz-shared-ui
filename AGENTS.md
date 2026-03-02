# kz-shared-ui テスト + Stories 一括生成タスク

## 概要

`src/components/aria/` 配下の全コンポーネントに unit test と stories を作成する。
`src/lib/tv.ts` にも unit test を作成する。

## テストのルール

- `describe` は対象コンポーネント名の1段のみ。ネスト禁止
- `it` の説明文は英語
- `getByRole` を優先
- `userEvent.setup()` は各 `it` ブロック内で呼ぶ（ファイル先頭ではない）
- axe-core を直接使う（vitest-axe は不使用）
- 視覚的な正しさ（色、コントラスト）はテストしない

※ axe-core 呼び出し方, UserEventを扱いたい場合

```tsx
it('calls onPress when clicked', async () => {
  const onPress = vi.fn();
  render(<Button onPress={onPress}>Submit</Button>);

  await userEvent.click(screen.getByRole('button'));

  expect(onPress).toHaveBeenCalledOnce();
});

it('has no accessibility violations', async () => {
  const { container } = render(<Button>Submit</Button>);
  const results = await axe.run(container);
  expect(results.violations).toHaveLength(0);
});
```

### aria wrapper で確認する項目（これだけ）

1. 正しくレンダリングされること（role / accessible name）
2. 指定した variant / size に対応するクラスが適用されていること
3. defaultVariants が機能していること
4. isDisabled などの主要 Props が正しく反映されること
5. axe-core violations が 0 であること

### テストの import パターン

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { describe, expect, it, vi } from 'vitest';
```

## 対象コンポーネント一覧

以下の各コンポーネントに `*.test.tsx` と `*.stories.tsx` を作成する。
ファイル配置は既存の tsx と同じディレクトリ。

### 1. src/lib/tv.ts → src/lib/tv.test.ts

tv.ts は `tv` 関数（tailwind-variants ラッパー）と `composeProps` 関数をエクスポートしている。

テスト項目:

- `composeProps(string, string)` -- 2つの文字列クラスを twMerge で結合
- `composeProps(undefined, string)` -- className が undefined のとき tw のみ返す
- `composeProps(function, string)` -- className が関数のとき、関数版を返す
- `composeProps(string, function)` -- tw が関数のとき、関数版を返す
- `composeProps(function, function)` -- 両方関数のとき、合成関数を返す
- twMerge が競合クラスを正しく解決すること（例: `"p-2"` と `"p-4"` → `"p-4"`）

### 2. Button → Button.test.tsx + Button.stories.tsx

variant: primary / secondary / destructive / outline / quiet
状態: default / isDisabled / isPending
テスト: role="button", variant クラス適用, isDisabled, onPress 呼び出し, isPending 時のスピナー表示, axe

Stories: 各 variant + disabled + pending

### 3. Switch → Switch.test.tsx + Switch.stories.tsx

テスト: role="switch", aria-checked 切り替え, isDisabled, onChange 呼び出し, axe
Stories: default / checked / disabled

### 4. Slider → Slider.test.tsx + Slider.stories.tsx

テスト: role="slider", aria-valuemin/max/now, キー操作で値変更, isDisabled, axe
Stories: default / with label / disabled / range

### 5. TextField → TextField.test.tsx + TextField.stories.tsx

テスト: role="textbox", label 紐付け, placeholder, isDisabled, description 表示, errorMessage 表示, axe
Stories: default / with description / with error / disabled

### 6. NumberField → NumberField.test.tsx + NumberField.stories.tsx

テスト: role="spinbutton" (テキスト入力部分は role="textbox"), label 紐付け, increment/decrement ボタン, isDisabled, axe
Stories: default / with step / disabled

### 7. RadioGroup + Radio → RadioGroup.test.tsx + RadioGroup.stories.tsx

テスト: role="radiogroup" + role="radio", 選択変更, キーボード操作, isDisabled, axe
Stories: default / with description / disabled

### 8. Tabs → Tabs.test.tsx + Tabs.stories.tsx

テスト: role="tablist" + role="tab" + role="tabpanel", タブ切り替え, キーボード矢印, isDisabled, axe
Stories: default / with panels / disabled tab

### 9. Disclosure → Disclosure.test.tsx + Disclosure.stories.tsx

テスト: aria-expanded 切り替え, パネルの表示/非表示, axe
Stories: default / initially expanded

### 10. Toast → Toast.test.tsx + Toast.stories.tsx

テスト: queue.add() で Toast が表示される, role 確認, 閉じるボタン, axe
注意: Toast は queue ベースなので、テスト内で queue.add() を呼んでレンダリングを確認する
Stories: default / with description

### 11. Form → Form.test.tsx + Form.stories.tsx

テスト: form 要素がレンダリングされる, axe
Stories: default (子要素に TextField + Button を配置)

### 12. ComboBox → ComboBox.test.tsx + ComboBox.stories.tsx

テスト: role="combobox", リスト展開, 選択, フィルタリング, isDisabled, axe
Stories: default / with sections / disabled

### 13. SearchField → SearchField.test.tsx + SearchField.stories.tsx

テスト: role="searchbox", 入力, クリアボタン, isDisabled, axe
Stories: default / with placeholder / disabled

### 14. Popover → Popover.test.tsx + Popover.stories.tsx

テスト: トリガーで表示/非表示, axe
注意: DialogTrigger + Button でトリガーする必要がある
Stories: default / with arrow

### 15. Dialog → Dialog.test.tsx + Dialog.stories.tsx

テスト: role="dialog", axe
Stories: default (Modal 内に配置)

### 16. ListBox → ListBox.test.tsx + ListBox.stories.tsx

テスト: role="listbox" + role="option", 選択, キーボード操作, axe
Stories: default / with sections

### 17. ColorField → ColorField.test.tsx + ColorField.stories.tsx

テスト: label 紐付け, Hex 値入力, axe
Stories: default / with label

### 18. ColorPicker → ColorPicker.test.tsx + ColorPicker.stories.tsx

テスト: ポップオーバー展開, axe
Stories: default / with label

### 19. ColorArea → ColorArea.test.tsx + ColorArea.stories.tsx

テスト: レンダリング, axe
Stories: default

### 20. ColorSlider → ColorSlider.test.tsx + ColorSlider.stories.tsx

テスト: role="slider", axe
Stories: default / hue channel

### 21. ColorSwatch + ColorSwatchPicker → ColorSwatch.test.tsx + ColorSwatchPicker.test.tsx + stories

テスト: レンダリング, 選択, axe
Stories: default / picker with items

### 22. Separator → Separator.test.tsx + Separator.stories.tsx

テスト: role="separator", orientation, axe
Stories: horizontal / vertical

## Stories のルール

- CSF3 形式（`satisfies Meta`, `satisfies StoryObj`）
- args で props を制御
- decorators でテーマ切り替え可能にする（必要に応じて）

### 全バリアント網羅の原則

**variant / size / 状態の全組み合わせを目視確認できる Stories を用意すること。**

方針:

1. 各 variant を個別 Story として定義（Primary, Secondary, Destructive...）
2. 各 size を個別 Story として定義（Small, Medium, Large...）
3. 状態バリエーション: Disabled, Pending/Loading 等を個別 Story として定義
4. **AllVariants Story**: 全 variant を一覧表示するまとめ Story を必ず作る。render 関数で全 variant をグリッド配置する
5. コンポーネントに variant/size の両方がある場合、AllVariants は variant x size のマトリクスとして表示する

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  component: Button,
  args: {
    children: 'Button',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- 個別 variant ---
export const Primary: Story = {
  args: { variant: 'primary' },
};

export const Secondary: Story = {
  args: { variant: 'secondary' },
};

export const Destructive: Story = {
  args: { variant: 'destructive' },
};

export const Outline: Story = {
  args: { variant: 'outline' },
};

export const Quiet: Story = {
  args: { variant: 'quiet' },
};

// --- 状態 ---
export const Disabled: Story = {
  args: { isDisabled: true },
};

export const Pending: Story = {
  args: { isPending: true },
};

// --- 全バリアント一覧 ---
const variants = [
  'primary',
  'secondary',
  'destructive',
  'outline',
  'quiet',
] as const;

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* 通常状態 */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        {variants.map((v) => (
          <Button key={v} variant={v}>
            {v}
          </Button>
        ))}
      </div>
      {/* Disabled */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        {variants.map((v) => (
          <Button key={v} variant={v} isDisabled>
            {v} (disabled)
          </Button>
        ))}
      </div>
    </div>
  ),
};
```

### コンポーネント別の Stories 網羅要件

- **Button**: variant x 5, isDisabled, isPending, AllVariants
- **Switch**: default, checked, disabled, AllVariants（default + checked + disabled を並べる）
- **Slider**: default, with label, disabled, with range, AllVariants
- **TextField**: default, with description, with error, disabled, AllVariants
- **NumberField**: default, with min/max/step, disabled, AllVariants
- **RadioGroup**: default, with description, disabled, AllVariants
- **Tabs**: default, with multiple tabs, disabled tab, AllVariants
- **Disclosure**: default (closed), initially expanded, disabled, AllVariants
- **Toast**: default, with description, AllVariants
- **Form**: default（子要素に TextField + Button）
- **ComboBox**: default, with sections, disabled, AllVariants
- **SearchField**: default, with placeholder, disabled, AllVariants
- **Popover**: default, with arrow, AllVariants
- **Dialog**: default
- **ListBox**: default, with selection, with sections, AllVariants
- **ColorField**: default, with label, disabled, AllVariants
- **ColorPicker**: default, with label, AllVariants
- **ColorArea**: default, with different colorSpaces, AllVariants
- **ColorSlider**: default, hue/saturation/brightness channels, AllVariants
- **ColorSwatch**: default, multiple colors, AllVariants
- **ColorSwatchPicker**: default, with selection, AllVariants
- **Separator**: horizontal, vertical, AllVariants

## 実行手順

1. `src/lib/tv.test.ts` を作成
2. `src/components/aria/` 配下の各コンポーネントに `*.test.tsx` と `*.stories.tsx` を作成
3. `npm run test` で全テスト通過を確認
4. Storybook で全 Stories の表示を確認

## 注意

- コンポーネントの実装（tsx）は変更しない
- テストが通らない場合、コンポーネント実装のバグの可能性がある。その場合は報告のみで修正しない
