import React from 'react';
import PropTypes from 'prop-types';

import './Message.scss';

export const Message = ({ message, onClose }) => (
  <div className="error-message" role="alert">
    <span data-testid="mainMessage">{message}</span>
    <button type="button" className="error-message__close" onClick={onClose}>
      X
    </button>
  </div>
);

Message.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Message;
