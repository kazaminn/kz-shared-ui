# kz-shared-ui テスト + Stories 一括生成タスク

## 概要

`src/components/aria/` 配下の全コンポーネントに unit test と stories を作成する。

## テストのルール

- `describe` は対象コンポーネント名の1段のみ。ネスト禁止
- `it` の説明文は英語
- `getByRole` を優先
- `userEvent.setup()` は各 `it` ブロック内で呼ぶ（ファイル先頭ではない）
- 視覚的な正しさ（色、コントラスト）はテストしない

### aria wrapper で確認する項目（これだけ）

1. 正しくレンダリングされること（role / accessible name）
2. 指定した variant / size に対応するクラスが適用されていること
3. defaultVariants が機能していること
4. isDisabled などの主要 Props が正しく反映されること

### テストの import パターン

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
```

## Color系コンポーネントのテスト（公式ガイドより抜粋）

**Simulating move event**

Components like ColorArea, ColorSlider, ColorWheel, and Slider each feature a draggable handle that a user can interact with to change the component's value. To simulate a drag event, mock MouseEvent and use fireEvent from @testing-library/react to simulate these drag/move events in your tests. Additionally, the track dimensions for the draggable handle should be mocked so that the move operation calculations can be properly computed.

```js
import { installMouseEvent } from '@react-aria/test-utils';
import { fireEvent } from '@testing-library/react';

installMouseEvent();

beforeAll(() => {
  jest
    .spyOn(window.HTMLElement.prototype, 'getBoundingClientRect')
    .mockImplementation(() => ({ top: 0, left: 0, width: 100, height: 10 }));
});

// In test case
let sliderThumb = getByRole('slider').parentElement;

// With fireEvent, move thumb from 0 to 50
fireEvent.mouseDown(thumb, { clientX: 0, pageX: 0 });
fireEvent.mouseMove(thumb, { pageX: 50 });
fireEvent.mouseUp(thumb, { pageX: 50 });
```

## 対象コンポーネント一覧

以下の各コンポーネントに `*.test.tsx` と `*.stories.tsx` を作成する。
ファイル配置は既存の tsx と同じディレクトリ。

完了: Button, Switch, Slider, TextField, NumberField, RadioGroup, Tabs, Disclosure, Toast, Form, ComboBox, SearchField, Popover, Dialog, ListBox

## 未完了タスク

### 17. ColorField → ColorField.test.tsx + ColorField.stories.tsx

テスト: label 紐付け, Hex 値入力
Stories: default / with label

### 18. ColorPicker → ColorPicker.test.tsx + ColorPicker.stories.tsx

テスト: ポップオーバー展開
Stories: default / with label

### 19. ColorArea → ColorArea.test.tsx + ColorArea.stories.tsx

テスト: レンダリング
Stories: default

### 20. ColorSlider → ColorSlider.test.tsx + ColorSlider.stories.tsx

テスト: role="slider"
Stories: default / hue channel

### 21. ColorSwatch + ColorSwatchPicker → ColorSwatch.test.tsx + ColorSwatchPicker.test.tsx + stories

テスト: レンダリング, 選択
Stories: default / picker with items

### 22. Separator → Separator.test.tsx + Separator.stories.tsx

テスト: role="separator", orientation
Stories: horizontal / vertical

### 23. Field → Field.test.tsx + Field.stories.tsx

テスト: [内容をかんがえて]
Stories: [内容をかんがえて]

### 24. FieldButton → FieldButton.test.tsx + FieldButton.stories.tsx

テスト: [内容をかんがえて]
Stories: [内容をかんがえて]

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
