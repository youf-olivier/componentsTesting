import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import Component from '../form';

describe('Form test suite', () => {
  const users = [
    {
      id: '1',
      login: 'login1',
      avatar_url: 'http://avatar1.jpg',
      html_url: 'http://comptegithub.com',
    },
    {
      id: '2',
      login: 'login2',
      avatar_url: 'http://avatar2.jpg',
      html_url: 'http://comptegithub.com',
    },
    {
      id: '3',
      login: 'login3',
      avatar_url: 'http://avatar3.jpg',
      html_url: 'http://comptegithub.com',
    },
  ];

  const inputs = {
    githubAccount: {
      label: 'Compte github',
      value: 'test',
      id: 'githubAccount',
      message: 'erreur de saisie',
    },
    userName: {
      label: "Nom d'utilisateur",
      value: 'Jean',
      id: 'username',
      message: 'erreur de saisie',
    },
  };
  it('Should render all components correctly', async () => {
    const { asFragment } = render(
      <Component users={users} inputs={inputs} onChange={() => {}} onClick={() => {}} hasSubmitOnce={false} />,
    );
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByRole('textbox', { name: /Compte github/ })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Nom d'utilisateur/ })).toBeInTheDocument();
    // Loading should be shown
    expect(screen.getByRole('alert', { name: /loader/ })).toBeInTheDocument();

    // We waiting about userList
    const list = await waitFor(() => screen.getByRole(/list/, { name: 'userlist' }));
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
    expect(list).toBeInTheDocument();
  });

  it('should shows messages when form has submitted once', () => {
    render(<Component users={users} inputs={inputs} onChange={() => {}} onClick={() => {}} hasSubmitOnce />);
    expect(screen.getByRole('alert', { name: /githubAccountAlert/ })).toBeInTheDocument();
    expect(screen.getByRole('alert', { name: /errorUsername/ })).toBeInTheDocument();
  });
});
