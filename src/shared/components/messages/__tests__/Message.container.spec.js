import React from 'react';
import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';

import { MessageContext } from '../Message.provider';
import MessageContainer from '../Message.container';

const getWrapper = (message = '', displayMessage = () => {}) => ({ children }) => (
  <MessageContext.Provider value={{ message, displayMessage }}>{children}</MessageContext.Provider>
);

describe('Message Provider test suite', () => {
  it('should Message Provider show Message', () => {
    render(<MessageContainer />, {
      wrapper: getWrapper(''),
    });
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('should Message Provider show Message', () => {
    render(<MessageContainer />, {
      wrapper: getWrapper('Une erreur est survenue'),
    });
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Une erreur est survenue');
  });

  it('should Hide Message if onClose is called', () => {
    render(<MessageContainer />, {
      wrapper: getWrapper('Une erreur est survenue'),
    });

    // We expect a message
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Une erreur est survenue');

    // We emulate a click event => Closing button
    UserEvent.click(screen.getByRole('button', { name: 'X' }));

    // We expect that the message disappear
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});
