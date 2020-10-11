import React from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { MessageContext } from 'shared/components/messages';
import FormContainer from '../form.container';

const displayMessageMock = jest.fn();

const getWrapper = (message = '', displayMessage = displayMessageMock) => ({ children }) => (
  <MessageContext.Provider value={{ message, displayMessage }}>{children}</MessageContext.Provider>
);

const listUsers = [
  {
    id: 1,
    html_url: 'http://urluser1',
    avatar_url: 'http://urlimageuser1',
    login: 'johnpapa',
  },
  {
    id: 2,
    html_url: 'http://urluser2',
    avatar_url: 'http://urlimageuser2',
    login: 'gaearon',
  },
  {
    id: 3,
    html_url: 'http://urluser3',
    avatar_url: 'http://urlimageuser3',
    login: 'kentcdodds',
  },
];

const singleUser = [
  {
    id: 42,
    html_url: 'http://urluser42',
    avatar_url: 'http://urlimageuser42',
    login: 'oyouf',
  },
];

describe('Form container tests suite', () => {
  const mock = new MockAdapter(axios);
  beforeEach(() => {
    mock
      .onGet('https://api.github.com/search/users?q=followers:%3E40000&order=desc&sort=followers')
      .reply(200, { items: listUsers });
    mock.onGet('https://api.github.com/search/users?q=user:oyouf').reply(200, { items: singleUser });
  });

  it('should return correct render before request return', async () => {
    render(<FormContainer />, {
      wrapper: getWrapper(),
    });
    const userCards = await screen.findAllByRole('listitem', { name: /carte utilisateur/ });
    expect(userCards.length).toBe(3); // or not to be
  });

  it('should render a single user when search him in the form', async () => {
    render(<FormContainer />, {
      wrapper: getWrapper(),
    });

    // First Load

    const userCards = await screen.findAllByRole('listitem', { name: /carte utilisateur/ });
    expect(userCards.length).toBe(3); // or not to be

    // Search oyouf
    const input = screen.getByLabelText(/Compte Github/i);
    const button = screen.getByRole('button', { name: /Rechercher/ });
    await userEvent.type(input, 'oyouf');
    await userEvent.click(button);

    // Result Expected
    // Affichage du loader
    screen.getByRole('alert', { name: 'loader' });

    // On attend que le loader s'en aille
    // await waitFor(() => expect(screen.queryByRole('alert', { name: 'loader' })).not.toBeInTheDocument());
    // ou aussi
    await waitForElementToBeRemoved(screen.queryByRole('alert', { name: 'loader' }));
    const userCardsAfterSearch = screen.getAllByRole('listitem', { name: /carte utilisateur/ });
    expect(userCardsAfterSearch.length).toBe(1);
  });

  it('should show message when input empty', async () => {
    render(<FormContainer />, {
      wrapper: getWrapper(),
    });

    // Search empty
    const button = screen.getByRole('button', { name: /rechercher/i });

    userEvent.click(button);

    // Result Expected
    const userCards = await screen.findAllByRole('listitem', { name: /carte utilisateur/ });

    expect(userCards.length).toBe(3);
    expect(screen.getByRole('alert', { name: /errorUsername/ })).toBeVisible();
    expect(screen.getByRole('alert', { name: /githubAccountAlert/ })).toBeVisible();

    expect(displayMessageMock).toBeCalledWith('Le formulaire contient des erreurs');
  });
});
