import React from 'react';
import { render, screen } from '@testing-library/react';

import UserList from './Userlist';

describe('Userlist tests suite', () => {
  const userList = [
    {
      id: 1,
      login: 'login1',
      avatar_url: 'http://avatar1.jpg',
      html_url: 'http://comptegithub.com/login1',
    },
    {
      id: 2,
      login: 'login2',
      avatar_url: 'http://avatar2.jpg',
      html_url: 'http://comptegithub.com/login2',
    },
    {
      id: 3,
      login: 'login3',
      avatar_url: 'http://avatar3.jpg',
      html_url: 'http://comptegithub.com/login3',
    },
  ];
  it('should render the list with user list full', () => {
    const { asFragment } = render(<UserList users={userList} />);
    expect(asFragment()).toMatchSnapshot(); // Pas forcément utile ici

    expect(screen.getByRole('list', { name: 'liste comptes' })).toBeInTheDocument();
    expect(screen.getAllByRole('listitem', { name: 'carte utilisateur' })).toHaveLength(3);
  });

  it('Should render message without user', () => {
    render(<UserList users={[]} />);
    expect(screen.getByText(/Aucun utilisateur trouvé/)).toBeInTheDocument();
    // ou plus simplement
    screen.getByText(/Aucun utilisateur trouvé/);
  });
});
