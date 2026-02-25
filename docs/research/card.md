# Card — 独自実装調査メモ

## コンポーネント概要

`Card` はコンテナに徹する独自コンポーネント。react-aria-components を使用しない。
クリッカブルにしたい場合は呼び出し側が Button でラップする責務とし、**Card 自体はインタラクションを持たない**。

分類: `components/ui`（自作コンポーネント）

参考: shadcn/ui の Card 構成に準拠

---

## アナトミー（CLAUDE.md 準拠）

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

各パーツはすべて省略可能。最小構成は `<Card>` のみでも成立する。

---

## import（kz-shared-ui からの export 形式）

```tsx
import {
  Card,
  CardBody,
  type CardBodyProps,
  CardDescription,
  type CardDescriptionProps,
  CardFooter,
  type CardFooterProps,
  CardHeader,
  type CardHeaderProps,
  type CardProps,
  CardTitle,
  type CardTitleProps,
} from 'kz-shared-ui';
```

ライブラリ内部では：

```tsx
// src/components/ui/Card/Card.tsx
// src/components/ui/Card/index.ts
```

---

## 各コンポーネントの役割と HTML 要素

| コンポーネント    | HTML 要素            | 役割                           |
| ----------------- | -------------------- | ------------------------------ |
| `Card`            | `<div>`              | 外枠・シャドウ・背景・ボーダー |
| `CardHeader`      | `<div>`              | タイトル・説明文のまとめ領域   |
| `CardTitle`       | `<h3>`（デフォルト） | カードのタイトル               |
| `CardDescription` | `<p>`                | タイトルの補足説明文           |
| `CardBody`        | `<div>`              | メインコンテンツ領域           |
| `CardFooter`      | `<div>`              | アクションボタン等のフッター   |

---

## 主要 props

### Card

| prop        | 型            | デフォルト | 説明                       |
| ----------- | ------------- | ---------- | -------------------------- |
| `children`  | `ReactNode`   | —          | 子コンポーネント           |
| `className` | `string`      | —          | 追加クラス                 |
| `as`        | `ElementType` | `'div'`    | ルート要素の変更（省略可） |

React の標準 `HTMLAttributes<HTMLDivElement>` を spread できる形にする。

### CardTitle

| prop        | 型                                             | デフォルト | 説明               |
| ----------- | ---------------------------------------------- | ---------- | ------------------ |
| `as`        | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'` | `'h3'`     | 見出しレベルの変更 |
| `className` | `string`                                       | —          | 追加クラス         |

見出しレベルはページの文書構造に応じて呼び出し側が指定できるようにする。

---

## tv() でのスタイル設計

```tsx
// Card ルート
const card = tv({
  base: ['rounded-lg border border-main bg-surface', 'shadow-sm', 'text-body'],
  variants: {
    // 将来の拡張用（例: variant="outlined" / "elevated" 等）
  },
});

// CardHeader
const cardHeader = tv({
  base: 'flex flex-col gap-1.5 p-6',
});

// CardTitle
const cardTitle = tv({
  base: 'text-xl leading-tight font-semibold text-body',
});

// CardDescription
const cardDescription = tv({
  base: 'text-sm text-muted',
});

// CardBody
const cardBody = tv({
  base: 'px-6 pb-6',
});

// CardFooter
const cardFooter = tv({
  base: 'flex items-center gap-3 px-6 pt-0 pb-6',
});
```

---

## 実装スケッチ

```tsx
// Card.tsx
import { tv } from '@/lib/tv';

const cardStyles = tv({
  base: 'rounded-lg border border-main bg-surface text-body shadow-sm',
});
const cardHeaderStyles = tv({ base: 'flex flex-col gap-1.5 p-6' });
const cardTitleStyles = tv({ base: 'text-xl leading-tight font-semibold' });
const cardDescriptionStyles = tv({ base: 'text-sm text-muted' });
const cardBodyStyles = tv({ base: 'px-6 pb-6' });
const cardFooterStyles = tv({ base: 'flex items-center gap-3 px-6 pt-0 pb-6' });

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

export const Card = ({ className, ...props }: CardProps) => (
  <div className={cardStyles({ className })} {...props} />
);

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;

export const CardHeader = ({ className, ...props }: CardHeaderProps) => (
  <div className={cardHeaderStyles({ className })} {...props} />
);

export type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement> & {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

export const CardTitle = ({
  as: Tag = 'h3',
  className,
  ...props
}: CardTitleProps) => (
  <Tag className={cardTitleStyles({ className })} {...props} />
);

export type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

export const CardDescription = ({
  className,
  ...props
}: CardDescriptionProps) => (
  <p className={cardDescriptionStyles({ className })} {...props} />
);

export type CardBodyProps = React.HTMLAttributes<HTMLDivElement>;

export const CardBody = ({ className, ...props }: CardBodyProps) => (
  <div className={cardBodyStyles({ className })} {...props} />
);

export type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

export const CardFooter = ({ className, ...props }: CardFooterProps) => (
  <div className={cardFooterStyles({ className })} {...props} />
);
```

---

## テスト方針（CLAUDE.md: components/ui はフルテスト必要）

`components/ui` に分類されるため、以下のすべてが必要：

### 1. レンダリングテスト

```tsx
it('renders Card with children', () => {
  render(<Card>Content</Card>);
  expect(screen.getByText('Content')).toBeInTheDocument();
});

it('renders all sub-components', () => {
  render(
    <Card>
      <CardHeader>
        <CardTitle>タイトル</CardTitle>
        <CardDescription>説明</CardDescription>
      </CardHeader>
      <CardBody>本文</CardBody>
      <CardFooter>フッター</CardFooter>
    </Card>
  );
  expect(screen.getByText('タイトル')).toBeInTheDocument();
  expect(screen.getByText('説明')).toBeInTheDocument();
  expect(screen.getByText('本文')).toBeInTheDocument();
  expect(screen.getByText('フッター')).toBeInTheDocument();
});
```

### 2. クラス確認テスト

```tsx
it('applies base card classes', () => {
  render(<Card data-testid="card">Content</Card>);
  expect(screen.getByTestId('card')).toHaveClass(
    'rounded-lg',
    'border',
    'bg-surface'
  );
});

it('merges custom className', () => {
  render(
    <Card className="w-full" data-testid="card">
      Content
    </Card>
  );
  expect(screen.getByTestId('card')).toHaveClass('w-full', 'rounded-lg');
});
```

### 3. CardTitle の heading レベルテスト

```tsx
it('renders CardTitle as h3 by default', () => {
  render(<CardTitle>タイトル</CardTitle>);
  expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
    'タイトル'
  );
});

it('renders CardTitle as h2 when specified', () => {
  render(<CardTitle as="h2">タイトル</CardTitle>);
  expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
});
```

### 4. インタラクションなし確認

```tsx
it('Card is not interactive (no button role)', () => {
  render(<Card>Content</Card>);
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});
```

### 5. アクセシビリティテスト（axe-core）

```tsx
it('has no accessibility violations', async () => {
  const { container } = render(
    <Card>
      <CardHeader>
        <CardTitle>タイトル</CardTitle>
        <CardDescription>説明</CardDescription>
      </CardHeader>
      <CardBody>本文</CardBody>
      <CardFooter>
        <Button>アクション</Button>
      </CardFooter>
    </Card>
  );
  const results = await axe(container);
  expect(results.violations).toHaveLength(0);
});
```

### 6. Playwright（実ブラウザ確認）

- light / dark テーマでの背景色・ボーダー色・テキスト色の確認（`getComputedStyle`）
- `shadow-sm` の実際の表示確認

---

## クリッカブルカードのパターン（呼び出し側の責務）

Card 自体はインタラクションを持たない。クリッカブルにしたい場合の実装例：

```tsx
// パターン1: Card 全体を Button でラップ
<Button variant="outline" className="w-full p-0 h-auto">
  <Card>
    <CardHeader>...</CardHeader>
  </Card>
</Button>

// パターン2: CardFooter にのみボタンを配置
<Card>
  <CardHeader>
    <CardTitle>記事タイトル</CardTitle>
  </CardHeader>
  <CardBody>...</CardBody>
  <CardFooter>
    <Button>詳細を見る</Button>
  </CardFooter>
</Card>

// パターン3: CardTitle をリンクにする
<Card>
  <CardHeader>
    <CardTitle as="h2">
      <a href="/article/1">記事タイトル</a>
    </CardTitle>
  </CardHeader>
</Card>
```

---

## Stories で確認すべきバリエーション

- 最小構成（`<Card>` のみ）
- フル構成（Header + Title + Description + Body + Footer）
- CardTitle の heading レベル変更（h2 / h3）
- CardFooter にボタンを配置したパターン
- 長いコンテンツ（スクロール・折り返し）
- カスタム `className` の追加
- light / dark テーマでの見た目確認（Playwright 対象）
- クリッカブルカード（Button でラップするパターン）
- グリッドレイアウトでの複数カード並列表示

---

## 参考: shadcn/ui との対応

| shadcn            | kz-shared-ui      | 変更点                                     |
| ----------------- | ----------------- | ------------------------------------------ |
| `Card`            | `Card`            | 同名                                       |
| `CardHeader`      | `CardHeader`      | 同名                                       |
| `CardTitle`       | `CardTitle`       | `as` prop で見出しレベル変更可能           |
| `CardDescription` | `CardDescription` | 同名                                       |
| `CardContent`     | `CardBody`        | 命名を `CardBody` に変更（CLAUDE.md 準拠） |
| `CardFooter`      | `CardFooter`      | 同名                                       |
