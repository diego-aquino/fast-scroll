import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import MultiplierInput from '~/components/forms/MultiplierInput';

describe('MultiplierInput component', () => {
  it('should render correctly', () => {
    render(<MultiplierInput id="input" placeholder="Type here..." />);

    const input = screen.getByPlaceholderText('Type here...');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'input');
  });

  it('should support having a label', () => {
    render(<MultiplierInput label="Speed multiplier" />);

    const input = screen.getByLabelText('Speed multiplier');
    expect(input).toBeInTheDocument();
  });

  it('should support having an icon', () => {
    render(
      <MultiplierInput
        label="Speed multiplier"
        renderIcon={(props) => <svg data-testid="input-icon" {...props} />}
      />,
    );

    expect(screen.getByTestId('input-icon')).toBeInTheDocument();
  });

  it('should support incrementing and decrementing a multiplier', () => {
    const multiplierIncrement = 0.1;
    const handleMultiplierIncrementMock = jest.fn();

    render(
      <MultiplierInput
        label="Speed multiplier"
        multiplierIncrement={multiplierIncrement}
        onIncrementMultiplier={handleMultiplierIncrementMock}
      />,
    );

    const incrementButton = screen.getByRole('button', { name: 'Increment' });
    const decrementButton = screen.getByRole('button', { name: 'Decrement' });

    userEvent.click(incrementButton);
    expect(handleMultiplierIncrementMock).toHaveBeenCalledWith(
      multiplierIncrement,
    );

    userEvent.click(decrementButton);
    expect(handleMultiplierIncrementMock).toHaveBeenCalledWith(
      -multiplierIncrement,
    );
  });
});
