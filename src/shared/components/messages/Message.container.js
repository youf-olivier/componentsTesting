import React, { useContext } from 'react';
import Message from './Message';
import { MessageContext } from './Message.provider';

export const MessageContainer = () => {
  const { message, displayMessage } = useContext(MessageContext);
  const onClose = () => displayMessage('');
  return message && <Message message={message} onClose={onClose} />;
};

export default MessageContainer;
