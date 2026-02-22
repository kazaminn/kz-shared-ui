# kz-shared-ui プロジェクト引き継ぎドキュメント

## プロジェクト概要

アクセシビリティ完全対応の React コンポーネントライブラリ。
複数プロジェクト（TaskCooker・MyYomuMoji 等）で再利用することを前提とする。

## 技術スタック

- **React 19** + **TypeScript 5.9**
- **Tailwind CSS v4**（セマンティックトークンは CSS カスタムプロパティで定義）
- **react-aria-components v1**（アクセシビリティの基盤）
- **tailwind-variants**（バリアント管理、tailwind-merge を内包）
- **tailwindcss-react-aria-components**（react-aria の状態セレクタをバリアントとして使用）
- **Vite 7** / **Vitest 4**
- **Playwright**（実ブラウザでのスタイル・アクセシビリティ検証）
- **Storybook**（コンポーネントカタログ）

## コードスタイル

- Prettier と ESLint で自動強制
- コミット前に lint-staged が実行される（条件付き、後述）

## ESLint 構成

### `eslint.config.ts` の全体構成

```ts
import path from 'node:path';
import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import a11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import storybook from 'eslint-plugin-storybook';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const gitignorePath = path.resolve('.', '.gitignore');

export default tseslint.config(
  {
    ignores: [
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/node_modules/**',
      '**/*.config.*',
      'eslint.config.js',
      '.storybook/**',
    ],
  },
  includeIgnoreFile(gitignorePath),
  {
    files: ['**/*.{js,mjs,cjs}'],
    extends: [js.configs.recommended],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    plugins: {
      react: reactPlugin,
      'react-hooks': hooksPlugin,
      'jsx-a11y': a11yPlugin,
      'react-refresh': reactRefresh,
    },
    languageOptions: {
      globals: { ...globals.browser },
      parserOptions: {
        projectService: {
          allowDefaultProject: [
            '.storybook/*.{ts,tsx}',
            '*.config.{ts,js}',
            '*.d.ts',
            '*.setup.ts',
          ],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...hooksPlugin.configs.recommended.rules,
      ...a11yPlugin.configs.recommended.rules,

      'arrow-body-style': 'off',
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      'react/button-has-type': 'error',
      'react/no-array-index-key': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      'jsx-a11y/click-events-have-key-events': 'error',
      'jsx-a11y/interactive-supports-focus': 'error',
      'jsx-a11y/no-aria-hidden-on-focusable': 'error',
      'jsx-a11y/prefer-tag-over-role': 'warn',

      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
    },
  },
  storybook.configs['flat/recommended'],
  prettierConfig
);
```

### A11y ルールの方針

`jsx-a11y/click-events-have-key-events` と `jsx-a11y/interactive-supports-focus` は多くのプロジェクトで緩和されるが、アクセシビリティ特化ライブラリであるため緩和しない。

## Prettier 構成

インポートのソートは `@trivago/prettier-plugin-sort-imports` で Prettier 側に一本化する。ESLint の `import/order` 系ルールは無効化する。

## Husky / lint-staged 構成

### 方針

自分で作業するときはエディタの ESLint で十分なため pre-commit をスキップする。AI 生成で作業させるときのみ pre-commit を実行する。commit-msg（commitlint）は常に実行する。

- 環境変数 `$HUSKY_PRE_COMMIT`
  - `0`: `[husky] pre-commit: skipped`
  - `1`: `[husky] pre-commit: running lint-staged`

### AI 生成時のコミット方法

```bash
npm run commit:ai -- -m "メッセージ"
```

`package.json` の `scripts` に追加済み（`cross-env` を使用）:

```json
"commit:ai": "cross-env HUSKY_PRE_COMMIT=1 git commit"
```

## テスト構成

### アクセシビリティテスト

`vitest-axe` はメンテナンス頻度が低いため不使用。`axe-core` を直接使う。

```ts
import axe from 'axe-core';
import { render } from '@testing-library/react';

const { container } = render(<Button>送信</Button>);
const results = await axe.run(container);
expect(results.violations).toHaveLength(0);
```

## ディレクトリ構成

```
kz-shared-ui/
├── src/
│   ├── components/
│   │   ├── aria/                   # react-aria-components wrapper
│   │   │   └── Button/
│   │   │       ├── Button.tsx
│   │   │       ├── Button.test.tsx
│   │   │       └── Button.stories.tsx
│   │   └── ui/                     # 自作コンポーネント
│   ├── lib/
│   │   └── tv.ts                   # tailwind-variants のラッパー
│   ├── styles/
│   │   └── index.css               # テーマ定義
│   ├── test/
│   │   └── vitest.shims.d.ts       # @testing-library/jest-dom 型定義
│   └── index.ts
├── pages/
│   └── HomePage.tsx                # manual確認用
├── .storybook/
├── CLAUDE.md
└── package.json
```

## テーマ設計

### 対応テーマ

- `light`（デフォルト）
- `dark`

`data-theme` 属性で切り替える。

```html
<html data-theme="light">
  <html data-theme="dark"></html>
</html>
```

### トークン命名規則

Tailwind v4 の `@theme` で自動的にユーティリティクラスが生成される命名規則に従う。

| プロパティ       | 命名規則               | 生成されるクラス |
| ---------------- | ---------------------- | ---------------- |
| background-color | `--background-color-*` | `bg-*`           |
| text-color       | `--text-color-*`       | `text-*`         |
| border-color     | `--border-color-*`     | `border-*`       |

**重要:** `--color-*` という命名ではクラスが生成されない。ただし `ring` カラーのみ例外で、`--ring-color-*` のような定義ができないため `--color-focus-ring` として定義し `ring-focus-ring` で参照する。

### 主要トークン

```css
/* Intent colors */
--background-color-primary
--text-color-primary-foreground
--background-color-primary-hover

--background-color-secondary
--text-color-secondary-foreground
--background-color-secondary-hover

--background-color-success
--text-color-success-foreground
--background-color-success-hover
--background-color-success-subtle
--border-color-success

--background-color-warning
--text-color-warning-foreground
--background-color-warning-hover
--background-color-warning-subtle
--border-color-warning

--background-color-danger
--text-color-danger-foreground
--background-color-danger-hover
--background-color-danger-subtle
--border-color-danger

--background-color-info
--text-color-info-foreground
--background-color-info-hover
--background-color-info-subtle
--border-color-info

/* Surfaces */
--background-color-base
--background-color-surface
--border-color-main

/* Text */
--text-color-body
--text-color-muted
--text-color-link
--text-color-link-hover
--text-color-link-active

/* Input */
--background-color-input
--border-color-input
--border-color-input-focus
--text-color-input-placeholder

/* Disabled */
--background-color-disabled
--text-color-disabled
--border-color-disabled

/* Other */
--color-focus-ring /* ring-focus-ring で参照。--ring-color-* 形式が使えないため --color-* を例外的に使用 */
--background-color-backdrop
--background-color-scrollbar-thumb
--background-color-scrollbar-track

/* Border radius */
--radius-sm: 4px
--radius-md: 6px
--radius-lg: 12px
--radius-full: 9999px

/* Shadow */
--shadow-sm
--shadow-md
--shadow-lg
```

## コンポーネント実装方針

### components/aria（react-aria-components wrapper）

**役割:** react-aria-components をラップしてスタイルを適用するだけ

**実装例: Button**

```tsx
import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
} from 'react-aria-components';
import { type VariantProps, tv } from '@/lib/tv';

const buttonVariants = tv({
  base: [
    'inline-flex items-center justify-center gap-2',
    'rounded-md font-medium',
    'transition-colors duration-150',
    'outline-none',
    'cursor-pointer',
    'focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'select-none',
  ],
  variants: {
    variant: {
      primary:
        'bg-primary text-primary-foreground hover:bg-primary-hover pressed:bg-primary-hover',
      secondary:
        'bg-secondary text-secondary-foreground hover:bg-secondary-hover pressed:bg-secondary-hover',
      outline: 'border border-main bg-transparent text-body hover:bg-surface',
      destructive:
        'bg-danger text-danger-foreground hover:bg-danger-hover pressed:bg-danger-hover',
      link: 'bg-transparent text-link underline-offset-4 hover:text-link-hover pressed:text-link-active',
    },
    size: {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-base',
      lg: 'h-12 px-6 text-lg',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

export type ButtonProps = AriaButtonProps &
  VariantProps<typeof buttonVariants> & {
    className?: string;
  };

export const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  className,
  ...props
}: ButtonProps) => {
  return (
    <AriaButton
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  );
};

```

**重要なポイント:**

1. **状態セレクタ:** `tailwindcss-react-aria-components` プラグインを使用しているため、`focus-visible:`、`pressed:`、`disabled:` が使える
   - `hovered:` セレクタは使わない。`hover:`を使う。（公式ドキュメント準拠）
2. **フォーカスリング:** `focus-visible:ring-focus-ring` と書く（`ring-[--color-focus-ring]` ではない）
3. **outline-none:** base に含めてブラウザデフォルトのアウトラインを消す
4. **Props 型:** `AriaButtonProps` + `VariantProps` + `{ className?: string }` の交差型
5. **import:** `@/lib/tv` から import する

**variant の設計思想:**

現状の `variant` は見た目の形（solid / outline / link）と意味・色（intent）が混在した暫定設計。将来的には `variant`（形）と `intent`（色）を別軸に分離する。現状の対応関係は以下の通り:

- `primary` → intent: primary のソリッドボタン
- `secondary` → intent: secondary のソリッドボタン
- `destructive` → intent: danger のソリッドボタン
- `outline` → base カラーを使用したアウトラインボタン（intent は将来対応）
- `link` → リンク風ボタン

### components/ui（自作コンポーネント）

**役割:** ゼロから実装する独自コンポーネント。react-aria-components にないもの、または特殊な UI。

フルテストが必要（インタラクション・アクセシビリティ含む）。

**Card コンポーネントの方針:**

Card はコンテナに徹する。クリッカブルにしたい場合は呼び出し側で Button をラップする責務とし、Card 自体はインタラクションを持たない。

アナトミーは shadcn に準拠:

```tsx
<Card>
  <CardHeader>
    <CardTitle />
    <CardDescription />
  </CardHeader>
  <CardBody />
  <CardFooter />
</Card>
```

### RACのLabel・Text

react-aria-components の `Label` と `Text` をスタイリングして使う。単体の自作コンポーネントは作らず、ariaラッパー内部で使う。

```tsx
import { TextField, Label, Input, Text } from 'react-aria-components';

<TextField>
  <Label>メールアドレス</Label>
  <Input />
  <Text slot="errorMessage">入力してください</Text>
</TextField>
```

## テスト方針

### 基本思想

**視覚的確認に依存しない。** 色・スタイルの正しさは Playwright による実ブラウザテストで検証する。目を信用しない、をプロジェクトの設計思想として織り込む。

### components/aria（wrapper）

`react-aria-components` をラップする薄いレイヤーと位置付ける。
アクセシビリティ挙動は react-aria 側で保証されているため、ラッパーでは再テストしない。

Unit テストでは以下のみを確認する：

- 正しくレンダリングされること（role / accessible name）
- 指定した `variant` / `size` に対応するクラスが適用されていること
- `defaultVariants` が機能していること
- `isDisabled` などの主要 Props が正しく反映されること
- axe-core による violations が 0 であること

`className` のマージやバリアント解決ロジックの詳細は `@/lib/tv` の責務とし、aria wrapper 側では再テストしない。

視覚的な正しさ（色、コントラスト、テーマ差分など）は unit では検証しない。
実ブラウザでの視覚保証は Playwright に委ねる。

テスト構造のルール：

- `describe` は対象コンポーネント名の 1 段のみ
- ネストは禁止
- `it` の説明文は英語
- `getByRole` を優先

aria ラッパー内で最小限のロジックを持つ場合のみ、そのロジック部分を簡易的にテストしてよい。ただし状態管理や複雑な振る舞いは責務外とする。

`userEvent.setup()` はファイル先頭ではなく各 `it` ブロック内で呼ぶこと、

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders as button with accessible name', () => {
    render(<Button>Submit</Button>);
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('applies default variant and size classes', () => {
    render(<Button>Default</Button>);
    const button = screen.getByRole('button');

    // defaultVariants: variant="primary", size="md"
    expect(button).toHaveClass('bg-primary');
    expect(button).toHaveClass('h-10');
  });

  it('applies variant="secondary" classes', () => {
    render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass(
      'bg-secondary',
      'text-secondary-foreground'
    );
  });

  it('applies variant="outline" classes', () => {
    render(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole('button')).toHaveClass(
      'border',
      'border-main',
      'bg-transparent'
    );
  });

  it('applies variant="destructive" classes', () => {
    render(<Button variant="destructive">Destructive</Button>);
    expect(screen.getByRole('button')).toHaveClass(
      'bg-danger',
      'text-danger-foreground'
    );
  });

  it('applies variant="link" classes', () => {
    render(<Button variant="link">Link</Button>);
    expect(screen.getByRole('button')).toHaveClass(
      'text-link',
      'underline-offset-4'
    );
  });

  it('applies size="sm" classes', () => {
    render(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-8', 'px-3', 'text-sm');
  });

  it('applies size="lg" classes', () => {
    render(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-12', 'px-6', 'text-lg');
  });

  it('is disabled when isDisabled is true', () => {
    render(<Button isDisabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('calls onPress when clicked', async () => {
    const onPress = vi.fn();
    render(<Button onPress={onPress}>Submit</Button>);

    await userEvent.click(screen.getByRole('button'));

    expect(onPress).toHaveBeenCalledOnce();
  });

  it('merges custom className without overriding default variant', () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole('button');

    expect(button).toHaveClass('custom-class');
    expect(button).toHaveClass('bg-primary');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Button>Submit</Button>);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
```

### Playwright（実ブラウザ検証）

- 実ブラウザで CSS Custom Properties が解決された色値の確認（`getComputedStyle`）
- テーマ切り替え（light / dark）時の色変化の確認
- フォーカスリングの視認性確認

### components/ui（自作）

react-aria-components に依存しない独自実装のコンポーネント群。これらは kz-shared-ui 側が挙動とアクセシビリティの責任を持つ。

Unit テストでは以下を網羅的に確認する：

- 正しくレンダリングされること
- セマンティックな role / ARIA 属性が適切であること
- バリアントやサイズが正しく反映されること
- インタラクション（click / keyboard）が期待通り動作すること
- disabled / readOnly などの状態が正しく機能すること
- 必要に応じて状態遷移が正しく行われること
- axe-core による violations が 0 であること

※ 複雑な状態管理や UI 遷移を持つ場合は、状態の変化が DOM 上で観測可能であることを検証する。

## Storybook

各コンポーネントに `.stories.tsx` を追加。目視確認・カタログとしての役割。テストとしては使わない。

## アクセシビリティ品質基準

- WCAG 2.1 AA 準拠を必須とする
- すべてのコンポーネントはキーボードのみで操作できること
- フォーカスリングは全テーマで視認できること（コントラスト比 3:1 以上）
- axe-core でテストし、違反がゼロであること
- **視覚的確認に依存しない。色・スタイルの正しさは Playwright による実ブラウザテストで検証する**

## issue → PR → マージ の流れ

```
1. GitHub issue を作成
2. 作業ブランチを作成
3. 実装
4. ユニットテストが通ることを確認
   npm run test
5. PR を作成
   gh pr create --title "feat: XXX" --body "closes #N"
6. レビュー後にマージ
```

## ブランチ命名規則

```
feature/issue-{番号}-{コンポーネント名小文字}
fix/issue-{番号}-{内容}

例:
feature/issue-1-button
feature/issue-5-input
fix/issue-12-focus-ring-dark
```

## コミットルール

Conventional Commits に準拠。**English** で書くこと。

```
# Format:
#   <emoji> <type>(<scope>): <subject>
#
# Example:
#   ✨ feat(auth): add OAuth login
#
# type (絵文字付き):
#   🎉 init       - 初期セットアップ
#   ✨ feat       - 新機能追加
#   🐛 fix        - バグ修正
#   🔁 refactor   - リファクタリング
#   🚀 perf       - パフォーマンス改善
#   🧪 test       - テスト追加・修正
#   💄 style      - 機械的なコードフォーマット
#   📝 docs       - ドキュメント更新
#   🔧 chore      - 設定変更、CI、依存更新など
#   🚧 wip        - Work In Progress
```

## 現在の状態

### 完成しているもの

- global.css（light / dark テーマ定義）
- Button コンポーネント（参考実装）
- CLAUDE.md（作業ガイド）

### 次に作成すべきコンポーネント（優先度順）

MyYomuMoji で必要なものを優先する。

**components/aria（wrapper）**

1. Input（TextField + Label + Text のセット）
2. Switch
3. Select
4. Slider
5. ColorSwatch
6. ColorPicker
7. Tabs
8. Toast

**components/ui（自作）**

1. Card

### SNSシェア機能（MyYomuMoji側で実装）

kz-shared-ui の Button と Toast を使い、MyYomuMoji 側でロジックを実装する。

| アクション   | 方式                                              |
| ------------ | ------------------------------------------------- |
| X            | URLスキーム（テキスト＋URL）                      |
| Facebook     | URLスキーム（OGP依存）                            |
| LINE         | URLスキーム（テキスト＋URL）                      |
| 画像保存     | Canvas等で生成＋ダウンロード（Instagram向け導線） |
| リンクコピー | クリップボードAPI＋Toast                          |

## よくある問題と解決方法

### フォーカスリングが表示されない

`focus-visible:ring-[--color-focus-ring]` ではなく `focus-visible:ring-focus-ring` を使う。

### クラスが生成されない

トークン名が `--color-*` になっていないか確認。`--background-color-*` / `--text-color-*` / `--border-color-*` を使う。ただし `ring` カラーは例外（上記トークン命名規則を参照）。

### `react-hooks/exhaustive-deps` の修正をAIに依頼する場合

意図を明示しないと依存配列に機械的に追加されて無限ループが起きる。以下のように伝える。

- 初回のみ実行したい場合: 「空の依存配列のまま `eslint-disable` コメントを追加して」
- 参照が毎回変わる値の場合: 「`useRef` で解決して」

## 参考資料

- [React Aria Components](https://react-spectrum.adobe.com/react-aria/react-aria-components.html)
- [Tailwind CSS v4 ドキュメント](https://tailwindcss.com/docs)
- [tailwindcss-react-aria-components](https://github.com/zaichaopan/tailwindcss-react-aria-components)
- [tailwind-variants](https://www.tailwind-variants.org/)
