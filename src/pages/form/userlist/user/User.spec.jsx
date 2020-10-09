import React from 'react';
import { render } from '@testing-library/react';
import User from './User';

describe('User card test suite', () => {
  const user = {
    login: '123123',
    avatar_url: 'http://avatar.jpg',
    html_url: 'http://comptegithub.com',
  };

  it('renders correctly', () => {
    const { asFragment } = render(<User user={user} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
