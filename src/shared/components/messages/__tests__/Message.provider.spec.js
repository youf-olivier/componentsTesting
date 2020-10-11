import React from 'react';
import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import MessageProvider, { MessageContext } from '../Message.provider';

const TestingApp = () => {
  const { message, displayMessage } = React.useContext(MessageContext);
  return (
    <>
      <span data-testid="message">{message}</span>
      <button
        onClick={() => {
          displayMessage('message displayed');
        }}
        type="button"
      >
        Display error
      </button>
    </>
  );
};

const wrapper = ({ children }) => <MessageProvider>{children}</MessageProvider>;

describe('Message provider tests suite', () => {
  it('should be initialized with empty message', () => {
    render(<TestingApp />, { wrapper });
    expect(screen.getByTestId('message')).toHaveTextContent('');
  });

  it('should be changed when call displayMessage', async () => {
    render(<TestingApp />, { wrapper });
    const button = screen.getByText(/Display error/);
    expect(screen.getByTestId('message')).toHaveTextContent('');
    await UserEvent.click(button);
    expect(screen.getByTestId('message')).toHaveTextContent('message displayed');
  });
});
