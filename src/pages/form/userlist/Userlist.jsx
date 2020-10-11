import React from 'react';
import PropTypes from 'prop-types';
import User, { userType } from './user';

export const UserListType = PropTypes.arrayOf(PropTypes.shape({ ...userType, id: PropTypes.number }));

const Userlist = ({ users }) => {
  return users.length > 0 ? (
    <div className="user-list" aria-label="liste comptes" role="list">
      {users.map(({ id, ...user }) => (
        <User user={user} key={id} />
      ))}
    </div>
  ) : (
    <span>
      <span role="img" aria-label="emoji triste">
        😢
      </span>
      Aucun utilisateur trouvé
    </span>
  );
};

Userlist.propTypes = {
  users: UserListType.isRequired,
};

export default Userlist;
