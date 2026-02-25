import { twMerge } from 'tailwind-merge';
import { type VariantProps, createTV } from 'tailwind-variants';

export const tv = createTV({
  twMerge: true,
});

export function composeProps<T>(
  className: string | ((v: T) => string) | undefined,
  tw: string | ((v: T) => string)
): (v: T) => string {
  return (renderProps) => {
    const twClass = typeof tw === 'function' ? tw(renderProps) : tw;
    const cls =
      typeof className === 'function' ? className(renderProps) : className;
    return twMerge(twClass, cls);
  };
}

// sampleコピペをそのまま使えるようにaliasを用意
export const composeTailwindRenderProps = composeProps;

export type { VariantProps };
