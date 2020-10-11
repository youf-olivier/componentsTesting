import React from 'react';
import { render, screen } from '@testing-library/react';
import Component from '../form';

describe('Form test suite', () => {
  const users = [
    {
      id: 1,
      login: 'login1',
      avatar_url: 'http://avatar1.jpg',
      html_url: 'http://comptegithub.com',
    },
    {
      id: 2,
      login: 'login2',
      avatar_url: 'http://avatar2.jpg',
      html_url: 'http://comptegithub.com',
    },
    {
      id: 3,
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
      <Component
        users={users}
        inputs={inputs}
        onChange={() => {}}
        onClick={() => {}}
        hasSubmitOnce={false}
        isLoading={false}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
    screen.getByRole('textbox', { name: /Compte github/ });
    screen.getByRole('textbox', { name: /Nom d'utilisateur/ });
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    screen.getByRole(/list/, { name: 'liste comptes' });
  });

  it('should render loading message when loading', () => {
    render(
      <Component users={[]} inputs={inputs} onChange={() => {}} onClick={() => {}} hasSubmitOnce={false} isLoading />,
    );
    screen.getByRole('textbox', { name: /Compte github/ });
    screen.getByRole('textbox', { name: /Nom d'utilisateur/ });
    screen.getByRole('alert');
    expect(screen.queryByRole(/list/, { name: 'liste comptes' })).not.toBeInTheDocument();
  });

  it('should shows messages when form has submitted once', () => {
    render(
      <Component
        users={users}
        inputs={inputs}
        onChange={() => {}}
        onClick={() => {}}
        hasSubmitOnce
        isLoading={false}
      />,
    );
    expect(screen.getByRole('alert', { name: /githubAccountAlert/ })).toBeInTheDocument();
    expect(screen.getByRole('alert', { name: /errorUsername/ })).toBeInTheDocument();
  });
});
