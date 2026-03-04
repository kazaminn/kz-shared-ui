import { type CSSProperties } from 'react';
import { XIcon } from 'lucide-react';
import {
  Button,
  Text,
  UNSTABLE_Toast as Toast,
  UNSTABLE_ToastContent as ToastContent,
  type ToastProps,
  UNSTABLE_ToastRegion as ToastRegion,
} from 'react-aria-components';
import { composeProps } from '@/lib/tv';
import './Toast.css';
import { type ToastContent as MyToastContent, toastQueue } from './ToastQueue';

export function MyToastRegion() {
  return (
    // The ToastRegion should be rendered at the root of your app.
    <ToastRegion
      queue={toastQueue}
      className="fixed right-4 bottom-4 flex flex-col-reverse gap-2 rounded-lg outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring focus-visible:outline-solid"
    >
      {({ toast }) => (
        <MyToast toast={toast}>
          <ToastContent className="flex min-w-0 flex-1 flex-col">
            <Text slot="title" className="text-sm font-semibold text-white">
              {toast.content.title}
            </Text>
            {toast.content.description && (
              <Text slot="description" className="text-xs text-white">
                {toast.content.description}
              </Text>
            )}
          </ToastContent>
          <Button
            slot="close"
            aria-label="Close"
            className="flex h-8 w-8 flex-none appearance-none items-center justify-center rounded-sm border-none bg-transparent p-0 text-white outline-none [-webkit-tap-highlight-color:transparent] hover:bg-base/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white focus-visible:outline-solid pressed:bg-base/15"
          >
            <XIcon className="h-4 w-4" />
          </Button>
        </MyToast>
      )}
    </ToastRegion>
  );
}

export function MyToast(props: ToastProps<MyToastContent>) {
  return (
    <Toast
      {...props}
      style={{ viewTransitionName: props.toast.key } as CSSProperties}
      className={composeProps(
        props.className,
        'flex w-57.5 items-center gap-4 rounded-lg bg-primary px-4 py-3 font-sans outline-none [view-transition-class:toast] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring focus-visible:outline-solid forced-colors:outline'
      )}
    />
  );
}
