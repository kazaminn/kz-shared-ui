# ListBox

A listbox displays a list of options and allows a user to select one or more of them.

## Tailwind example

```tsx
import { ListBox, ListBoxItem } from 'tailwind-starter/ListBox';

<ListBox aria-label="Favorite animal">
  <ListBoxItem>Aardvark</ListBoxItem>
  <ListBoxItem>Cat</ListBoxItem>
  <ListBoxItem>Dog</ListBoxItem>
  <ListBoxItem>Kangaroo</ListBoxItem>
  <ListBoxItem>Panda</ListBoxItem>
  <ListBoxItem>Snake</ListBoxItem>
</ListBox>;
```

### ListBox.tsx

```tsx
'use client';
import React from 'react';
import { Check } from 'lucide-react';
import {
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  ListBoxProps as AriaListBoxProps,
  Collection,
  Header,
  ListBoxItemProps,
  ListBoxSection,
  SectionProps,
  composeRenderProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { composeTailwindRenderProps, focusRing } from './utils';

interface ListBoxProps<T> extends Omit<
  AriaListBoxProps<T>,
  'layout' | 'orientation'
> {}

export function ListBox<T extends object>({
  children,
  ...props
}: ListBoxProps<T>) {
  return (
    <AriaListBox
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        'w-50 rounded-lg border border-neutral-300 bg-white p-1 font-sans outline-0 dark:border-neutral-700 dark:bg-neutral-900'
      )}
    >
      {children}
    </AriaListBox>
  );
}

export const itemStyles = tv({
  extend: focusRing,
  base: 'group relative flex cursor-default items-center gap-8 rounded-md px-2.5 py-1.5 text-sm will-change-transform forced-color-adjust-none select-none',
  variants: {
    isSelected: {
      false:
        'text-neutral-700 -outline-offset-2 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800 pressed:bg-neutral-100 dark:pressed:bg-neutral-800',
      true: 'bg-blue-600 text-white -outline-offset-4 outline-white dark:outline-white forced-colors:bg-[Highlight] forced-colors:text-[HighlightText] forced-colors:outline-[HighlightText] [&+[data-selected]]:rounded-t-none [&:has(+[data-selected])]:rounded-b-none',
    },
    isDisabled: {
      true: 'text-neutral-300 dark:text-neutral-600 forced-colors:text-[GrayText]',
    },
  },
});

export function ListBoxItem(props: ListBoxItemProps) {
  let textValue =
    props.textValue ||
    (typeof props.children === 'string' ? props.children : undefined);
  return (
    <AriaListBoxItem {...props} textValue={textValue} className={itemStyles}>
      {composeRenderProps(props.children, (children) => (
        <>
          {children}
          <div className="absolute right-4 bottom-0 left-4 hidden h-px bg-white/20 forced-colors:bg-[HighlightText] [.group[data-selected]:has(+[data-selected])_&]:block" />
        </>
      ))}
    </AriaListBoxItem>
  );
}

export const dropdownItemStyles = tv({
  base: 'group flex cursor-default items-center gap-4 rounded-lg py-2 pr-3 pl-3 text-sm no-underline outline outline-0 forced-color-adjust-none select-none [-webkit-tap-highlight-color:transparent] selected:pr-1 [&[href]]:cursor-pointer',
  variants: {
    isDisabled: {
      false: 'text-neutral-900 dark:text-neutral-100',
      true: 'text-neutral-300 dark:text-neutral-600 forced-colors:text-[GrayText]',
    },
    isPressed: {
      true: 'bg-neutral-100 dark:bg-neutral-800',
    },
    isFocused: {
      true: 'bg-blue-600 text-white dark:bg-blue-600 forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]',
    },
  },
  compoundVariants: [
    {
      isFocused: false,
      isOpen: true,
      className: 'bg-neutral-100 dark:bg-neutral-700/60',
    },
  ],
});

export function DropdownItem(props: ListBoxItemProps) {
  let textValue =
    props.textValue ||
    (typeof props.children === 'string' ? props.children : undefined);
  return (
    <AriaListBoxItem
      {...props}
      textValue={textValue}
      className={dropdownItemStyles}
    >
      {composeRenderProps(props.children, (children, { isSelected }) => (
        <>
          <span className="flex flex-1 items-center gap-2 truncate font-normal group-selected:font-semibold">
            {children}
          </span>
          <span className="flex w-5 items-center">
            {isSelected && <Check className="h-4 w-4" />}
          </span>
        </>
      ))}
    </AriaListBoxItem>
  );
}

export interface DropdownSectionProps<T> extends SectionProps<T> {
  title?: string;
  items?: any;
}

export function DropdownSection<T extends object>(
  props: DropdownSectionProps<T>
) {
  return (
    <ListBoxSection className="after:block after:h-1.25 after:content-[''] first:-mt-1.25 last:after:hidden">
      <Header className="sticky -top-1.25 z-10 -mx-1 -mt-px truncate border-y border-y-neutral-200 bg-neutral-100/60 px-4 py-1 text-sm font-semibold text-neutral-500 backdrop-blur-md supports-[-moz-appearance:none]:bg-neutral-100 dark:border-y-neutral-700 dark:bg-neutral-700/60 dark:text-neutral-300 [&+*]:mt-1">
        {props.title}
      </Header>
      <Collection items={props.items}>{props.children}</Collection>
    </ListBoxSection>
  );
}
```

## Content

`ListBox` follows the [Collection Components API](collections.md?component=ListBox), accepting both static and dynamic collections. This example shows a dynamic collection, passing a list of objects to the `items` prop, and a function to render the children.

```tsx
import { ListBox, ListBoxItem } from 'react-aria-components';

function Example() {
  let options = [
    { id: 1, name: 'Aardvark' },
    { id: 2, name: 'Cat' },
    { id: 3, name: 'Dog' },
    { id: 4, name: 'Kangaroo' },
    { id: 5, name: 'Koala' },
    { id: 6, name: 'Penguin' },
    { id: 7, name: 'Snake' },
    { id: 8, name: 'Turtle' },
    { id: 9, name: 'Wombat' },
  ];

  return (
    /*- begin highlight -*/
    <ListBox aria-label="Animals" items={options} selectionMode="single">
      {(item) => <ListBoxItem>{item.name}</ListBoxItem>}
    </ListBox>
    /*- end highlight -*/
  );
}
```

### Text slots

Use the `"label"` and `"description"` slots to separate primary and secondary content within a `<ListBoxItem>`. This improves screen reader announcements and can also be used for styling purposes.

```tsx
import { ListBox, ListBoxItem, Text } from 'react-aria-components';

<ListBox aria-label="Permissions" selectionMode="single">
  <ListBoxItem textValue="Read">
    {/*- begin highlight -*/}
    <Text slot="label">Read</Text>
    <Text slot="description">Read only</Text>
    {/*- end highlight -*/}
  </ListBoxItem>
  <ListBoxItem textValue="Write">
    <Text slot="label">Write</Text>
    <Text slot="description">Read and write only</Text>
  </ListBoxItem>
  <ListBoxItem textValue="Admin">
    <Text slot="label">Admin</Text>
    <Text slot="description">Full access</Text>
  </ListBoxItem>
</ListBox>;
```

<InlineAlert variant="notice">
  <Heading>Accessibility warning</Heading>
  <Content>Interactive elements (e.g. buttons) within listbox items are not allowed. This will break keyboard and screen reader navigation. Only add textual or decorative graphics (e.g. icons or images) as children. Use [GridList](GridList.md) if interactive children are needed.</Content>
</InlineAlert>

### Sections

Use the `<ListBoxSection>` component to group options. A `<Header>` element may also be included to label the section. Sections without a header must have an `aria-label`.

```tsx
import {
  Header,
  ListBox,
  ListBoxItem,
  ListBoxSection,
} from 'react-aria-components';

<ListBox aria-label="Sandwich contents" selectionMode="multiple">
  {/*- begin highlight -*/}
  <ListBoxSection>
    <Header>Veggies</Header>
    {/*- end highlight -*/}
    <ListBoxItem id="lettuce">Lettuce</ListBoxItem>
    <ListBoxItem id="tomato">Tomato</ListBoxItem>
    <ListBoxItem id="onion">Onion</ListBoxItem>
  </ListBoxSection>
  <ListBoxSection>
    <Header>Protein</Header>
    <ListBoxItem id="ham">Ham</ListBoxItem>
    <ListBoxItem id="tuna">Tuna</ListBoxItem>
    <ListBoxItem id="tofu">Tofu</ListBoxItem>
  </ListBoxSection>
  <ListBoxSection>
    <Header>Condiments</Header>
    <ListBoxItem id="mayo">Mayonaise</ListBoxItem>
    <ListBoxItem id="mustard">Mustard</ListBoxItem>
    <ListBoxItem id="ranch">Ranch</ListBoxItem>
  </ListBoxSection>
</ListBox>;
```

### Asynchronous loading

Use [renderEmptyState](#empty-state) to display a spinner during initial load. To enable infinite scrolling, render a `<ListBoxLoadMoreItem>` at the end of the list or section. Use whatever data fetching library you prefer – this example uses `useAsyncList` from `react-stately`.

```tsx
import { Collection, useAsyncList } from 'react-aria-components';
import {
  ListBox,
  ListBoxItem,
  ListBoxLoadMoreItem,
} from 'vanilla-starter/ListBox';
import { ProgressCircle } from 'vanilla-starter/ProgressCircle';

interface Character {
  name: string;
}

function AsyncLoadingExample() {
  let list = useAsyncList<Character>({
    async load({ signal, cursor }) {
      let res = await fetch(cursor || `https://pokeapi.co/api/v2/pokemon`, {
        signal,
      });
      let json = await res.json();

      return {
        items: json.results,
        cursor: json.next,
      };
    },
  });

  return (
    <ListBox
      aria-label="Pick a Pokemon"
      selectionMode="single"
      renderEmptyState={() => (
        <ProgressCircle isIndeterminate aria-label="Loading..." />
      )}
    >
      <Collection items={list.items}>
        {(item) => <ListBoxItem id={item.name}>{item.name}</ListBoxItem>}
      </Collection>
      {/*- begin highlight -*/}
      <ListBoxLoadMoreItem
        onLoadMore={list.loadMore}
        isLoading={list.loadingState === 'loadingMore'}
      />
      {/*- end highlight -*/}
    </ListBox>
  );
}
```

### Links

Use the `href` prop on a `<ListBoxItem>` to create a link.

By default, link items in a ListBox are not selectable, and only perform navigation when the user interacts with them. However, with `selectionBehavior="replace"`, items will be selected when single clicking or pressing the <Keyboard>Space</Keyboard> key, and navigate to the link when double clicking or pressing the <Keyboard>Enter</Keyboard> key.

```tsx
import { ListBox, ListBoxItem } from 'react-aria-components';

<ListBox aria-label="Links" selectionMode="multiple">
  {/*- begin highlight -*/}
  <ListBoxItem href="https://adobe.com/" target="_blank">
    Adobe
  </ListBoxItem>
  {/*- end highlight -*/}
  <ListBoxItem href="https://apple.com/" target="_blank">
    Apple
  </ListBoxItem>
  <ListBoxItem href="https://google.com/" target="_blank">
    Google
  </ListBoxItem>
  <ListBoxItem href="https://microsoft.com/" target="_blank">
    Microsoft
  </ListBoxItem>
</ListBox>;
```

By default, links are rendered as an `<a>` element. Use the `render` prop to integrate your framework's link component. An `href` should still be passed to `ListBoxItem` so React Aria knows it is a link.

```tsx
<ListBoxItem
  {...props}
  render={(domProps) =>
    'href' in domProps ? <RouterLink {...domProps} /> : <div {...domProps} />
  }
/>
```

### Empty state

```tsx
import { ListBox } from 'react-aria-components';

<ListBox
  aria-label="Search results"
  renderEmptyState={() => 'No results found.'}
>
  {[]}
</ListBox>;
```

## Selection

Use the `selectionMode` prop to enable single or multiple selection. The selected items can be controlled via the `selectedKeys` prop, matching the `id` prop of the items. Items can be disabled with the `isDisabled` prop. See the [selection guide](selection.md?component=ListBox) for more details.

```tsx
import { useState } from 'react';
import type { Selection } from 'react-aria-components';
import { ListBox, ListBoxItem } from 'react-aria-components';

function Example(props) {
  let [selected, setSelected] = useState<Selection>(new Set(['cheese']));

  return (
    <div>
      <ListBox
        {...props}
        aria-label="Sandwich contents"
        selectedKeys={selected}
        onSelectionChange={setSelected}
      >
        <ListBoxItem id="lettuce">Lettuce</ListBoxItem>
        <ListBoxItem id="tomato">Tomato</ListBoxItem>
        <ListBoxItem id="cheese">Cheese</ListBoxItem>
        <ListBoxItem id="tuna" isDisabled>
          Tuna Salad
        </ListBoxItem>
        <ListBoxItem id="egg">Egg Salad</ListBoxItem>
        <ListBoxItem id="ham">Ham</ListBoxItem>
      </ListBox>
      <p>
        Current selection:{' '}
        {selected === 'all' ? 'all' : [...selected].join(', ')}
      </p>
    </div>
  );
}
```

## Layouts

Use the `layout` and `orientation` props to create horizontal and vertical stacks and grids. This affects keyboard navigation and drag and drop behavior.

```tsx
import { ListBox, ListBoxItem, Text } from 'react-aria-components';

let planets = [
  {
    id: 1,
    title: 'Mercury',
    description: 'A year lasts 88 days',
  },
  {
    id: 2,
    title: 'Venus',
    description: 'Spins backwards!',
  },
  {
    id: 3,
    title: 'Earth',
    description: 'Only planet with life',
  },
  {
    id: 4,
    title: 'Mars',
    description: 'Has the tallest volcano',
  },
  {
    id: 5,
    title: 'Jupiter',
    description: 'Can fit 1,300 Earths',
  },
  {
    id: 6,
    title: 'Saturn',
    description: 'Rings made of ice',
  },
  {
    id: 7,
    title: 'Uranus',
    description: 'Rolls on its side',
  },
  {
    id: 8,
    title: 'Neptune',
    description: 'Fastest winds in space',
  },
];

<ListBox
  aria-label="Planets"
  /*- begin highlight -*/

  /*- end highlight -*/
  items={planets}
  selectionMode="multiple"
>
  {(item) => (
    <ListBoxItem textValue={item.title}>
      <Text slot="label">{item.title}</Text>
      <Text slot="description">{item.description}</Text>
    </ListBoxItem>
  )}
</ListBox>;
```

## Drag and drop

ListBox supports drag and drop interactions when the `dragAndDropHooks` prop is provided using the `useDragAndDrop` hook. Users can drop data on the list as a whole, on individual items, insert new items between existing ones, or reorder items. React Aria supports drag and drop via mouse, touch, keyboard, and screen reader interactions. See the [drag and drop guide](dnd.md?component=ListBox) to learn more.

```tsx
import {
  ListBox,
  ListBoxItem,
  useDragAndDrop,
  useListData,
} from 'react-aria-components';

function Example() {
  let list = useListData({
    initialItems: [
      { id: 1, name: 'Adobe Photoshop' },
      { id: 2, name: 'Adobe XD' },
      { id: 3, name: 'Adobe Dreamweaver' },
      { id: 4, name: 'Adobe InDesign' },
      { id: 5, name: 'Adobe Connect' },
    ],
  });

  let { dragAndDropHooks } = useDragAndDrop({
    getItems: (keys, items: typeof list.items) =>
      items.map((item) => ({ 'text/plain': item.name })),
    onReorder(e) {
      if (e.target.dropPosition === 'before') {
        list.moveBefore(e.target.key, e.keys);
      } else if (e.target.dropPosition === 'after') {
        list.moveAfter(e.target.key, e.keys);
      }
    },
  });

  return (
    <ListBox
      aria-label="Reorderable list"
      selectionMode="multiple"
      items={list.items}
      dragAndDropHooks={dragAndDropHooks}
    >
      {(item) => <ListBoxItem>{item.name}</ListBoxItem>}
    </ListBox>
  );
}
```

## Examples

<ExampleList
  tag="listbox"
  pages={props.pages}
/>

## API

```tsx
<ListBox>
  <ListBoxItem>
    <Text slot="label" />
    <Text slot="description" />
    <SelectionIndicator />
  </ListBoxItem>
  <ListBoxSection>
    <Header />
    <ListBoxItem />
  </ListBoxSection>
  <ListBoxLoadMoreItem />
</ListBox>
```

<!-- prettier-ignore-start -->
### ListBox

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `aria-describedby` | `string | undefined` | — | Identifies the element (or elements) that describes the object. |
| `aria-details` | `string | undefined` | — | Identifies the element (or elements) that provide a detailed, extended description for the object. |
| `aria-label` | `string | undefined` | — | Defines a string value that labels the current element. |
| `aria-labelledby` | `string | undefined` | — | Identifies the element (or elements) that labels the current element. |
| `autoFocus` | `boolean | FocusStrategy | undefined` | — | Whether to auto focus the listbox or an option. |
| `children` | `React.ReactNode | ((item: T) => ReactNode)` | — | The contents of the collection. |
| `className` | `ClassNameOrFunction<ListBoxRenderProps> | undefined` | 'react-aria-ListBox' | The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state. |
| `defaultSelectedKeys` | `Iterable<Key> | "all" | undefined` | — | The initial selected keys in the collection (uncontrolled). |
| `dependencies` | `readonly any[] | undefined` | — | Values that should invalidate the item cache when using dynamic collections. |
| `dir` | `string | undefined` | — |  |
| `disabledKeys` | `Iterable<Key> | undefined` | — | The item keys that are disabled. These items cannot be selected, focused, or otherwise interacted with. |
| `disallowEmptySelection` | `boolean | undefined` | — | Whether the collection allows empty selection. |
| `dragAndDropHooks` | `DragAndDropHooks<NoInfer<T>> | undefined` | — | The drag and drop hooks returned by `useDragAndDrop` used to enable drag and drop behavior for the ListBox. |
| `escapeKeyBehavior` | `"none" | "clearSelection" | undefined` | 'clearSelection' | Whether pressing the escape key should clear selection in the listbox or not. Most experiences should not modify this option as it eliminates a keyboard user's ability to easily clear selection. Only use if the escape key is being handled externally or should not trigger selection clearing contextually. |
| `hidden` | `boolean | undefined` | — |  |
| `id` | `string | undefined` | — | The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). |
| `inert` | `boolean | undefined` | — |  |
| `items` | `Iterable<T> | undefined` | — | Item objects in the collection. |
| `lang` | `string | undefined` | — |  |
| `layout` | `"stack" | "grid" | undefined` | 'stack' | Whether the items are arranged in a stack or grid. |
| `onAction` | `((key: Key) => void) | undefined` | — | Handler that is called when a user performs an action on an item. The exact user event depends on the collection's `selectionBehavior` prop and the interaction modality. |
| `onAnimationEnd` | `React.AnimationEventHandler<HTMLDivElement> | undefined` | — |  |
| `onAnimationEndCapture` | `React.AnimationEventHandler<HTMLDivElement> | undefined` | — |  |
| `onAnimationIteration` | `React.AnimationEventHandler<HTMLDivElement> | undefined` | — |  |
| `onAnimationIterationCapture` | `React.AnimationEventHandler<HTMLDivElement> | undefined` | — |  |
| `onAnimationStart` | `React.AnimationEventHandler<HTMLDivElement> | undefined` | — |  |
| `onAnimationStartCapture` | `React.AnimationEventHandler<HTMLDivElement> | undefined` | — |  |
| `onAuxClick` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onAuxClickCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onBlur` | `((e: React.FocusEvent<Element>) => void) | undefined` | — | Handler that is called when the element loses focus. |
| `onClick` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onClickCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onContextMenu` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onContextMenuCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onDoubleClick` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onDoubleClickCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onFocus` | `((e: React.FocusEvent<Element>) => void) | undefined` | — | Handler that is called when the element receives focus. |
| `onFocusChange` | `((isFocused: boolean) => void) | undefined` | — | Handler that is called when the element's focus status changes. |
| `onGotPointerCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onGotPointerCaptureCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onLostPointerCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onLostPointerCaptureCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseDown` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseDownCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseEnter` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseLeave` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseMove` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseMoveCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseOut` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseOutCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseOver` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseOverCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseUp` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseUpCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerCancel` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerCancelCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerDown` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerDownCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerEnter` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerLeave` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerMove` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerMoveCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerOut` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerOutCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerOver` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerOverCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerUp` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerUpCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onScroll` | `React.UIEventHandler<HTMLDivElement> | undefined` | — |  |
| `onScrollCapture` | `React.UIEventHandler<HTMLDivElement> | undefined` | — |  |
| `onSelectionChange` | `((keys: Selection) => void) | undefined` | — | Handler that is called when the selection changes. |
| `onTouchCancel` | `React.TouchEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTouchCancelCapture` | `React.TouchEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTouchEnd` | `React.TouchEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTouchEndCapture` | `React.TouchEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTouchMove` | `React.TouchEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTouchMoveCapture` | `React.TouchEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTouchStart` | `React.TouchEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTouchStartCapture` | `React.TouchEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTransitionCancel` | `React.TransitionEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTransitionCancelCapture` | `React.TransitionEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTransitionEnd` | `React.TransitionEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTransitionEndCapture` | `React.TransitionEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTransitionRun` | `React.TransitionEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTransitionRunCapture` | `React.TransitionEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTransitionStart` | `React.TransitionEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTransitionStartCapture` | `React.TransitionEventHandler<HTMLDivElement> | undefined` | — |  |
| `onWheel` | `React.WheelEventHandler<HTMLDivElement> | undefined` | — |  |
| `onWheelCapture` | `React.WheelEventHandler<HTMLDivElement> | undefined` | — |  |
| `orientation` | `Orientation | undefined` | 'vertical' | The primary orientation of the items. Usually this is the direction that the collection scrolls. |
| `render` | `DOMRenderFunction<"div", ListBoxRenderProps> | undefined` | — | Overrides the default DOM element with a custom render function. This allows rendering existing components with built-in styles and behaviors such as router links, animation libraries, and pre-styled components. Requirements: \* You must render the expected element type (e.g. if `<button>` is expected, you cannot render an `<a>`). \* Only a single root DOM element can be rendered (no fragments). \* You must pass through props and ref to the underlying DOM element, merging with your own prop as appropriate. |
| `renderEmptyState` | `((props: ListBoxRenderProps) => ReactNode) | undefined` | — | Provides content to display when there are no items in the list. |
| `selectedKeys` | `Iterable<Key> | "all" | undefined` | — | The currently selected keys in the collection (controlled). |
| `selectionBehavior` | `SelectionBehavior | undefined` | "toggle" | How multiple selection should behave in the collection. |
| `selectionMode` | `SelectionMode | undefined` | — | The type of selection that is allowed in the collection. |
| `shouldFocusOnHover` | `boolean | undefined` | — | Whether options should be focused when the user hovers over them. |
| `shouldFocusWrap` | `boolean | undefined` | — | Whether focus should wrap around when the end/start is reached. |
| `shouldSelectOnPressUp` | `boolean | undefined` | — | Whether selection should occur on press up instead of press down. |
| `slot` | `string | null | undefined` | — | A slot name for the component. Slots allow the component to receive props from a parent component. An explicit `null` value indicates that the local props completely override all props received from a parent. |
| `style` | `(React.CSSProperties | ((values: ListBoxRenderProps & { defaultStyle: React.CSSProperties; }) => React.CSSProperties | undefined)) | undefined` | — | The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state. |
| `translate` | `"yes" | "no" | undefined` | — |  |

### ListBoxItem

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `aria-label` | `string | undefined` | — | An accessibility label for this item. |
| `children` | `ChildrenOrFunction<ListBoxItemRenderProps>` | — | The children of the component. A function may be provided to alter the children based on component state. |
| `className` | `ClassNameOrFunction<ListBoxItemRenderProps> | undefined` | 'react-aria-ListBoxItem' | The CSS [className](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) for the element. A function may be provided to compute the class based on component state. |
| `dir` | `string | undefined` | — |  |
| `download` | `string | boolean | undefined` | — | Causes the browser to download the linked URL. A string may be provided to suggest a file name. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#download). |
| `hidden` | `boolean | undefined` | — |  |
| `href` | `string | undefined` | — | A URL to link to. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#href). |
| `hrefLang` | `string | undefined` | — | Hints at the human language of the linked URL. See[MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#hreflang). |
| `id` | `Key | undefined` | — | The unique id of the item. |
| `inert` | `boolean | undefined` | — |  |
| `isDisabled` | `boolean | undefined` | — | Whether the item is disabled. |
| `lang` | `string | undefined` | — |  |
| `onAction` | `(() => void) | undefined` | — | Handler that is called when a user performs an action on the item. The exact user event depends on the collection's `selectionBehavior` prop and the interaction modality. |
| `onAnimationEnd` | `React.AnimationEventHandler<HTMLDivElement> | undefined` | — |  |
| `onAnimationEndCapture` | `React.AnimationEventHandler<HTMLDivElement> | undefined` | — |  |
| `onAnimationIteration` | `React.AnimationEventHandler<HTMLDivElement> | undefined` | — |  |
| `onAnimationIterationCapture` | `React.AnimationEventHandler<HTMLDivElement> | undefined` | — |  |
| `onAnimationStart` | `React.AnimationEventHandler<HTMLDivElement> | undefined` | — |  |
| `onAnimationStartCapture` | `React.AnimationEventHandler<HTMLDivElement> | undefined` | — |  |
| `onAuxClick` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onAuxClickCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onBlur` | `((e: React.FocusEvent<HTMLDivElement, Element>) => void) | undefined` | — | Handler that is called when the element loses focus. |
| `onClick` | `((e: React.MouseEvent<FocusableElement>) => void) | undefined` | — | **Not recommended – use `onPress` instead.** `onClick` is an alias for `onPress` provided for compatibility with other libraries. `onPress` provides  additional event details for non-mouse interactions. |
| `onClickCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onContextMenu` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onContextMenuCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onDoubleClick` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onDoubleClickCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onFocus` | `((e: React.FocusEvent<HTMLDivElement, Element>) => void) | undefined` | — | Handler that is called when the element receives focus. |
| `onFocusChange` | `((isFocused: boolean) => void) | undefined` | — | Handler that is called when the element's focus status changes. |
| `onGotPointerCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onGotPointerCaptureCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onHoverChange` | `((isHovering: boolean) => void) | undefined` | — | Handler that is called when the hover state changes. |
| `onHoverEnd` | `((e: HoverEvent) => void) | undefined` | — | Handler that is called when a hover interaction ends. |
| `onHoverStart` | `((e: HoverEvent) => void) | undefined` | — | Handler that is called when a hover interaction starts. |
| `onLostPointerCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onLostPointerCaptureCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseDown` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseDownCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseEnter` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseLeave` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseMove` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseMoveCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseOut` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseOutCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseOver` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseOverCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseUp` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onMouseUpCapture` | `React.MouseEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerCancel` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerCancelCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerDown` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerDownCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerEnter` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerLeave` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerMove` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerMoveCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerOut` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerOutCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerOver` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerOverCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerUp` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPointerUpCapture` | `React.PointerEventHandler<HTMLDivElement> | undefined` | — |  |
| `onPress` | `((e: PressEvent) => void) | undefined` | — | Handler that is called when the press is released over the target. |
| `onPressChange` | `((isPressed: boolean) => void) | undefined` | — | Handler that is called when the press state changes. |
| `onPressEnd` | `((e: PressEvent) => void) | undefined` | — | Handler that is called when a press interaction ends, either over the target or when the pointer leaves the target. |
| `onPressStart` | `((e: PressEvent) => void) | undefined` | — | Handler that is called when a press interaction starts. |
| `onPressUp` | `((e: PressEvent) => void) | undefined` | — | Handler that is called when a press is released over the target, regardless of whether it started on the target or not. |
| `onScroll` | `React.UIEventHandler<HTMLDivElement> | undefined` | — |  |
| `onScrollCapture` | `React.UIEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTouchCancel` | `React.TouchEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTouchCancelCapture` | `React.TouchEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTouchEnd` | `React.TouchEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTouchEndCapture` | `React.TouchEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTouchMove` | `React.TouchEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTouchMoveCapture` | `React.TouchEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTouchStart` | `React.TouchEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTouchStartCapture` | `React.TouchEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTransitionCancel` | `React.TransitionEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTransitionCancelCapture` | `React.TransitionEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTransitionEnd` | `React.TransitionEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTransitionEndCapture` | `React.TransitionEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTransitionRun` | `React.TransitionEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTransitionRunCapture` | `React.TransitionEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTransitionStart` | `React.TransitionEventHandler<HTMLDivElement> | undefined` | — |  |
| `onTransitionStartCapture` | `React.TransitionEventHandler<HTMLDivElement> | undefined` | — |  |
| `onWheel` | `React.WheelEventHandler<HTMLDivElement> | undefined` | — |  |
| `onWheelCapture` | `React.WheelEventHandler<HTMLDivElement> | undefined` | — |  |
| `ping` | `string | undefined` | — | A space-separated list of URLs to ping when the link is followed. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#ping). |
| `referrerPolicy` | `React.HTMLAttributeReferrerPolicy | undefined` | — | How much of the referrer to send when following the link. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#referrerpolicy). |
| `rel` | `string | undefined` | — | The relationship between the linked resource and the current page. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel). |
| `render` | `((props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> | React.DetailedHTMLProps<Required<Pick<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">> & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">, HTMLAnchorElement>, renderProps: ListBoxItemRenderProps) => React.ReactElement) | undefined` | — | Overrides the default DOM element with a custom render function. This allows rendering existing components with built-in styles and behaviors such as router links, animation libraries, and pre-styled components. Note: You can check if `'href' in props` in order to tell whether to render an `<a>` element. Requirements: \* You must render the expected element type (e.g. if `<a>` is expected, you cannot render a `<button>`). \* Only a single root DOM element can be rendered (no fragments). \* You must pass through props and ref to the underlying DOM element, merging with your own prop as appropriate. |
| `routerOptions` | `undefined` | — | Options for the configured client side router. |
| `style` | `(React.CSSProperties | ((values: ListBoxItemRenderProps & { defaultStyle: React.CSSProperties; }) => React.CSSProperties | undefined)) | undefined` | — | The inline [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) for the element. A function may be provided to compute the style based on component state. |
| `target` | `React.HTMLAttributeAnchorTarget | undefined` | — | The target window for the link. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#target). |
| `textValue` | `string | undefined` | — | A string representation of the item's contents, used for features like typeahead. |
| `translate` | `"yes" | "no" | undefined` | — |  |
| `value` | `T | undefined` | — | The object value that this item represents. When using dynamic collections, this is set automatically. |
<!-- prettier-ignore-end -->
