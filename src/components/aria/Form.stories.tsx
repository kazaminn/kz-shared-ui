import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
import { Form } from './Form';
import { TextField } from './TextField';

const meta = {
  component: Form,
  render: (args) => (
    <Form {...args} style={{ maxWidth: 320 }}>
      <TextField label="Name" placeholder="Jane Doe" />
      <Button type="submit">Submit</Button>
    </Form>
  ),
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    'aria-label': 'Example form',
  },
};
