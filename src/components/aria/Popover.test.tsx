import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import { describe, expect, it } from 'vitest';
import { Button, DialogTrigger } from 'react-aria-components';
import { Popover } from './Popover';

function PopoverExample({ showArrow = false }: { showArrow?: boolean }) {
  return (
    <DialogTrigger>
      <Button>Open popover</Button>
      <Popover showArrow={showArrow}>
        <div>Popover content</div>
      </Popover>
    </DialogTrigger>
  );
}

describe('Popover', () => {
  it('shows and hides popover content when trigger is clicked', async () => {
    const user = userEvent.setup();

    render(<PopoverExample />);

    expect(screen.queryByText('Popover content')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Open popover' }));

    expect(screen.getByText('Popover content')).toBeInTheDocument();

    await user.keyboard('{Escape}');

    expect(screen.queryByText('Popover content')).not.toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const user = userEvent.setup();
    const { container } = render(<PopoverExample showArrow />);

    await user.click(screen.getByRole('button', { name: 'Open popover' }));

    const results = await axe.run(container);

    expect(results.violations).toHaveLength(0);
  });
});
