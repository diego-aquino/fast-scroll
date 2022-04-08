import { screen, render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import config from '~/config/config';

import PopUpPage from '../PopUpPage';

describe('PopUpPage component', () => {
  it('should load the saved scroll speed multiplier on startup', async () => {
    const savedMultiplier = 5;
    config.scrollSpeedMultiplier = jest.fn().mockReturnValue(savedMultiplier);

    render(<PopUpPage />);

    const multiplierInput = await screen.findByLabelText(/scroll speed multiplier/i);

    const expectedMultiplier = `${savedMultiplier}x`;
    expect(multiplierInput).toHaveProperty('value', expectedMultiplier);
  });

  it('should save a custom scroll speed multiplier after typing', async () => {
    const setScrollSpeedMultiplierMock = jest.fn();
    config.setScrollSpeedMultiplier = setScrollSpeedMultiplierMock;

    render(<PopUpPage />);

    const multiplierInput = await screen.findByLabelText(/scroll speed multiplier/i);

    const customMultiplier = 15;

    act(() => {
      userEvent.type(multiplierInput, `${customMultiplier}`);
    });

    const expectedMultiplier = `${customMultiplier}x`;
    expect(multiplierInput).toHaveProperty('value', expectedMultiplier);

    expect(setScrollSpeedMultiplierMock).toHaveBeenCalledWith(customMultiplier);
  });
});
