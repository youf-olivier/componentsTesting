import React from 'react';
import PropTypes from 'prop-types';
import User, { userType } from './user';

export const UserListType = PropTypes.arrayOf(PropTypes.shape({ ...userType, id: PropTypes.number }));

const Userlist = ({ users }) => {
  return (
    <div className="user-list" aria-label="userlist" role="list">
      {users.map(({ id, ...user }) => (
        <User user={user} key={id} />
      ))}
    </div>
  );
};

Userlist.propTypes = {
  users: UserListType.isRequired,
};

export default Userlist;
