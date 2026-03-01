import { twMerge } from 'tailwind-merge';
import { type VariantProps, createTV } from 'tailwind-variants';

export const tv = createTV({
  twMerge: true,
});

export function composeProps(className: string | undefined, tw: string): string;

export function composeProps<T>(
  className: ((v: T) => string) | string | undefined,
  tw: ((v: T) => string) | string
): (v: T) => string;

export function composeProps<T>(
  className: string | ((v: T) => string) | undefined,
  tw: string | ((v: T) => string)
) {
  if (typeof className === 'function' || typeof tw === 'function') {
    return (renderProps: T) => {
      const twClass = typeof tw === 'function' ? tw(renderProps) : tw;

      const cls =
        typeof className === 'function' ? className(renderProps) : className;

      return twMerge(twClass, cls);
    };
  }

  return twMerge(tw, className);
}

export type { VariantProps };
