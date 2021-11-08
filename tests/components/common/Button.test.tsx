import { screen, render, within } from '@testing-library/react';

import Button from '~/components/common/Button';

describe('Button component', () => {
  it('should render correctly', () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeInTheDocument();
  });

  it('should support having an icon', () => {
    render(
      <Button
        renderIcon={(props) => <svg data-testid="button-icon" {...props} />}
      >
        Click me
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Click me' });
    expect(within(button).getByTestId('button-icon')).toBeInTheDocument();
  });
});
