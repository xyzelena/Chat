import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { BsFillSendPlusFill } from 'react-icons/bs';

import useFilter from '../../hooks/useFilter.js';

const NewMessageForm = (props) => {
  const { username, channelId, addMessageHandler } = props;

  const { t } = useTranslation();

  const filter = useFilter();

  const refInputNewMessage = useRef();

  const [message, setNewMessage] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const text = filter.clean(message.trim());

    console.log(text);

    const newMessage = { body: text, username, channelId };

    addMessageHandler(newMessage);

    setNewMessage('');
  };

  useEffect(() => {
    refInputNewMessage.current.focus();
  }, [channelId]);

  return (
    <form
      noValidate=""
      className="py-1 border rounded-2"
      onSubmit={handleFormSubmit}
    >
      <div className="input-group has-validation">
        <input
          name="body"
          required
          aria-label={t('newMessageForm.ariaLabel')}
          placeholder={t('newMessageForm.placeholder')}
          className="border-0 p-0 ps-2 form-control"
          value={message}
          onChange={(e) => setNewMessage(e.target.value)}
          ref={refInputNewMessage}
        />

        <button
          type="submit"
          className="btn btn-group-vertical btn-lg"
          disabled=""
        >
          <BsFillSendPlusFill />
          <span className="visually-hidden"> {t('buttons.btnSend')}</span>
        </button>
      </div>
    </form>
  );
};

export default NewMessageForm;
