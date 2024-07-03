import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

//import socket from '../../socket.js';

import { useSendMessageMutation } from '../../api/messagesApi.js';

const FormNewMessage = () => {
  const { t } = useTranslation();

  const username = useSelector((state) => state.auth.username);
  const channelId = useSelector(
    (state) => state.currentChannel.currentChannelData.id,
  );

  const [
    sendMessage,
    { error: sendMessageError, isLoading: isSendingMessage },
  ] = useSendMessageMutation();

  const sendMessageHandler = (messageData) => sendMessage(messageData);

  const [message, setNewMessage] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newMessage = { body: message, username, channelId };

    sendMessageHandler(newMessage);

    setNewMessage('');
  };

  return (
    <form
      noValidate=""
      className="py-1 border rounded-2"
      onSubmit={handleFormSubmit}
    >
      <div className="input-group has-validation">
        <input
          name="body"
          aria-label={t('formNewMessage.ariaLabel')}
          placeholder={t('formNewMessage.placeholder')}
          className="border-0 p-0 ps-2 form-control"
          value={message}
          onChange={(e) => setNewMessage(e.target.value)}
        />

        <button type="submit" className="btn btn-group-vertical" disabled="">
          {t('formNewMessage.btnSubmit')}
        </button>
      </div>
    </form>
  );
};

export default FormNewMessage;
