# Toast — React Aria 調査メモ

## ⚠️ 重要：`UNSTABLE_` プレフィックス付きで提供中

`react-aria-components` には Toast が **`UNSTABLE_` プレフィックス付き**で含まれている。
破壊的変更の可能性があるため、採用前にプロジェクトの安定性要件を確認すること。

参照: https://react-aria.adobe.com/Toast

---

## アナトミー

```tsx
// アプリルート（または layout）に配置
<ToastRegion queue={queue} />

// どこからでも呼び出し可能
queue.add({ title: '保存しました' });
queue.add({ title: 'エラー', description: '再試行してください' }, { timeout: 5000 });
```

コンポーネント構成：

```tsx
<ToastRegion queue={queue}>
  {({ toast }) => (
    <Toast toast={toast}>
      <ToastContent>
        <Text slot="title">タイトル</Text>
        <Text slot="description">説明</Text>
        <Button slot="close" aria-label="閉じる">✕</Button>
      </ToastContent>
    </Toast>
  )}
</ToastRegion>
```

## 必須の import

```tsx
import {
  UNSTABLE_ToastRegion as ToastRegion,
  UNSTABLE_Toast as Toast,
  UNSTABLE_ToastQueue as ToastQueue,
  UNSTABLE_ToastContent as ToastContent,
  type ToastProps,
  Button,
  Text,
} from 'react-aria-components';
```

## ToastQueue の作成（グローバルシングルトン）

```tsx
// src/components/aria/Toast/queue.ts
import { UNSTABLE_ToastQueue as ToastQueue, flushSync } from 'react-aria-components';

type ToastContent = {
  title: string;
  description?: string;
};

export const queue = new ToastQueue<ToastContent>({
  // View Transitions でアニメーション（オプション）
  wrapUpdate(fn) {
    if ('startViewTransition' in document) {
      document.startViewTransition(() => {
        flushSync(fn);
      });
    } else {
      fn();
    }
  },
});
```

## ToastQueue API

### `queue.add(content, options?)`

| 引数 | 型 | 説明 |
|-----|----|------|
| `content.title` | `string`（必須） | トーストのタイトル |
| `content.description` | `string` | サブテキスト（省略可） |
| `options.timeout` | `number` | 自動消去までのms（省略で手動閉じのみ） |
| `options.onClose` | `() => void` | 閉じた時のコールバック |

戻り値: `key`（`queue.close(key)` で手動消去可能）

### `queue.close(key)`

特定トーストをプログラムで閉じる。

## 主要 props

### ToastRegion

| prop | 型 | 説明 |
|------|----|------|
| `queue` | `ToastQueue<T>` | グローバルキューインスタンス（必須） |
| `children` | `(renderProps: { toast }) => ReactNode` | 各トーストのレンダリング関数 |

### Toast

| prop | 型 | 説明 |
|------|----|------|
| `toast` | `QueuedToast<T>` | キューから渡されるトーストオブジェクト（必須） |
| `className` | `string \| ClassNameFunction` | クラス名 |

### ToastContent（スロット構成）

| スロット | コンポーネント | 必須 |
|---------|--------------|------|
| `title` | `<Text slot="title">` | ✅ |
| `description` | `<Text slot="description">` | 任意 |
| `close` | `<Button slot="close">` | 任意（手動閉じが必要な場合） |

## 状態セレクタ（tailwindcss-react-aria-components）

### Toast
| セレクタ | 条件 |
|---------|------|
| `hovered:` | ホバー中（`data-hovered`） |
| `focus-visible:` | キーボードフォーカス（`data-focus-visible`） |
| `entering:` | 表示アニメーション中（`data-entering`） |
| `exiting:` | 消去アニメーション中（`data-exiting`） |

### Button (close)
| セレクタ | 条件 |
|---------|------|
| `hovered:` | ホバー中 |
| `pressed:` | プレス中 |
| `focus-visible:` | キーボードフォーカス |

## アクセシビリティ設計

- `ToastRegion` は ARIA ランドマーク領域（`role="region"`）として機能
- F6 / Shift+F6 でランドマーク間ナビゲーション
- Toast 消去後は自動的にフォーカスを前の位置に戻す
- **自動消去タイムアウトの推奨最小値: 5000ms**
- 重要な情報には自動消去を使わない

## kz-shared-ui 実装方針メモ

### 分類

CLAUDE.md の方針通り `components/aria/Toast/` に配置（react-aria-components のラッパー）。

ただし `UNSTABLE_` であることを明示するコメントを付ける。

### ファイル構成

```
src/components/aria/Toast/
├── Toast.tsx       # ToastRegion + Toast + ToastContent のラッパー
├── queue.ts        # ToastQueue のグローバルシングルトン
├── Toast.test.tsx  # テスト
└── Toast.stories.tsx
```

### 実装スケッチ

```tsx
// Toast.tsx
import {
  UNSTABLE_Toast as AriaToast,
  UNSTABLE_ToastContent as AriaToastContent,
  UNSTABLE_ToastRegion as AriaToastRegion,
  Button,
  Text,
} from 'react-aria-components';
import { tv } from '@/lib/tv';
import { queue } from './queue';

const toastStyles = tv({
  base: [
    'flex items-start gap-3 p-4 rounded-lg shadow-lg',
    'bg-surface border border-main',
    'text-body',
    'entering:animate-slide-in exiting:animate-slide-out',
  ],
});

export function ToastRegion() {
  return (
    <AriaToastRegion queue={queue} className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {({ toast }) => (
        <AriaToast toast={toast} className={toastStyles()}>
          <AriaToastContent>
            <Text slot="title" className="font-medium text-sm" />
            <Text slot="description" className="text-sm text-muted" />
          </AriaToastContent>
          <Button
            slot="close"
            aria-label="閉じる"
            className="shrink-0 text-muted hovered:text-body focus-visible:ring-2 focus-visible:ring-focus-ring rounded"
          >
            ✕
          </Button>
        </AriaToast>
      )}
    </AriaToastRegion>
  );
}

// 使用側
export { queue as toast };
```

### 使用側（MyYomuMoji 等）

```tsx
// アプリルートに1回だけ配置
import { ToastRegion } from 'kz-shared-ui';
<ToastRegion />

// 任意の場所で呼び出し
import { toast } from 'kz-shared-ui';
toast.add({ title: 'リンクをコピーしました' }, { timeout: 4000 });
toast.add({ title: 'エラー', description: '後でもう一度お試しください' });
```

### 注意点

- `UNSTABLE_` なので破壊的変更に注意。バージョン固定推奨
- `ToastRegion` はアプリに1つだけ配置（複数配置不可）
- View Transitions は iOS Safari 非対応のためフォールバックが必要
- CLAUDE.md に記載のテスト方針: 「ariaラッパーのテストでロジックの動作確認が必要な場合、簡易的なダミーロジックをテスト内に実装してよい」

## Stories で確認すべきバリエーション

- デフォルト（タイトルのみ）
- タイトル + description
- 自動消去（`timeout: 5000`）
- 手動閉じのみ（timeout なし）
- 複数トーストのスタック表示
- プログラムによる消去（`queue.close(key)`）
- キーボード操作（Tab でトーストにフォーカス、Space/Enter で閉じる）
- light / dark テーマでの見た目確認（Playwright）
- entering / exiting アニメーション確認
