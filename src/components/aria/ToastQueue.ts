import { UNSTABLE_ToastQueue as ToastQueue } from 'react-aria-components';
import { flushSync } from 'react-dom';

export interface ToastContent {
  title: string;
  description?: string;
}

export const toastQueue = new ToastQueue<ToastContent>({
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
