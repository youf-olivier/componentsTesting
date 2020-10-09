import React from 'react';
import PropTypes, { shape } from 'prop-types';

import './user.scss';

export const userType = {
  html_url: PropTypes.string.isRequired,
  avatar_url: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
};

const propTypes = {
  user: shape(userType).isRequired,
};

const UserCard = ({ user }) => (
  <div className="user-card" role="listitem" aria-label="usercard">
    <a href={user.html_url} className="user-card__link">
      <img src={user.avatar_url} className="user-card__avatar" alt={`${user.login}`} />
      <span className="user-card__login">{user.login}</span>
    </a>
  </div>
);

UserCard.propTypes = propTypes;

export default UserCard;
