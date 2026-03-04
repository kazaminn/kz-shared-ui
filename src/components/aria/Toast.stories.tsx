import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
import { MyToastRegion } from './Toast';
import { toastQueue } from './ToastQueue';

const meta = {
  component: MyToastRegion,
} satisfies Meta<typeof MyToastRegion>;

export default meta;
type Story = StoryObj<typeof meta>;

function ToastDemo({ withDescription = false }: { withDescription?: boolean }) {
  return (
    <div style={{ minHeight: 220 }}>
      <Button
        onPress={() =>
          toastQueue.add({
            title: 'Profile saved',
            description: withDescription
              ? 'Your changes are now live.'
              : undefined,
          })
        }
      >
        Show toast
      </Button>
      <MyToastRegion />
    </div>
  );
}

export const Default: Story = {
  render: () => <ToastDemo />,
};

export const WithDescription: Story = {
  render: () => <ToastDemo withDescription />,
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, minHeight: 220 }}>
      <ToastDemo />
      <ToastDemo withDescription />
    </div>
  ),
};
