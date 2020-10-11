import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const MessageContext = createContext(null);

const MessageProvider = ({ children }) => {
  const [message, displayMessage] = useState('');
  return <MessageContext.Provider value={{ message, displayMessage }}>{children}</MessageContext.Provider>;
};

MessageProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MessageProvider;
