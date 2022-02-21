import { screen, render } from '@testing-library/react';

import Input from '~/components/forms/Input';

describe('Input component', () => {
  it('should render correctly', () => {
    render(<Input id="input" placeholder="Type here..." />);

    const input = screen.getByPlaceholderText('Type here...');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'input');
  });

  it('should support having a label', () => {
    render(<Input label="Username" />);

    const input = screen.getByLabelText('Username');
    expect(input).toBeInTheDocument();
  });

  it('should support having an icon', () => {
    render(<Input label="Username" renderIcon={(props) => <svg data-testid="input-icon" {...props} />} />);

    expect(screen.getByTestId('input-icon')).toBeInTheDocument();
  });
});
