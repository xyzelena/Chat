import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import useSocket from '../../hooks/useSocket.js';

import {
  useGetMessagesQuery,
  useAddMessageMutation,
} from '../../api/messagesApi.js';

import { setMessages } from '../../slices/messagesSlice.js';

import HeaderListMessages from './HeaderListMessages.jsx';
import ListMessages from './ListMessages.jsx';
import NewMessageForm from '../Forms/NewMessageForm.jsx';

const Messages = () => {
  const dispatch = useDispatch();

  const socket = useSocket();

  const { t } = useTranslation();

  const {
    data,
    error: getMessageError,
    isLoading: isGettingMessage,
    refetch,
  } = useGetMessagesQuery();
  //data => { id: '1', body: 'text message', channelId: '1', username: 'admin }

  const [addMessage, { error: addMessageError, isLoading: isAddingMessage }] =
    useAddMessageMutation();

  const { messages } = useSelector((state) => state.messages);

  const { channels, currentChannelId } = useSelector((state) => state.channels);

  const username = useSelector((state) => state.auth.username);

  useEffect(() => {
    if (data) {
      dispatch(setMessages(data));
    }
  }, [data]);

  useEffect(() => {
    if (addMessageError) {
      toast.error(t('errorsToast.messageSendError'));
    }
  }, [addMessageError]);

  const currentChannel = channels.find(
    (channel) => channel.id === currentChannelId,
  );

  const currentChannelMessages = messages.filter(
    (message) => message.channelId === currentChannelId,
  );

  const countCurrentChannelMessages = currentChannelMessages.length;

  const addMessageHandler = async (messageData) => {
    try {
      const response = await addMessage(messageData);

      socket.emit('newMessage', response.data, (acknowledgment) => {
        if (acknowledgment.error) {
          toast.error(t('errorsToast.messageSendError'));
        } else {
          console.log(acknowledgment.status);
        }
      });

      refetch();
    } catch (err) {
      console.error('Error sending message:', err);
      toast.error(t('errorsToast.messageSendError'));
    }
  };

  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <HeaderListMessages
          nameCurrentChannel={currentChannel?.name ?? ''}
          countCurrentChannelMessages={countCurrentChannelMessages}
        />
      </div>

      <div id="messages-box" className="chat-messages overflow-auto px-5">
        {countCurrentChannelMessages > 0 && (
          <ListMessages
            currentChannelMessages={currentChannelMessages}
            isLoading={isGettingMessage}
          />
        )}
      </div>

      <div className="mt-auto px-5 py-3">
        <NewMessageForm
          username={username}
          channelId={currentChannelId}
          addMessageHandler={addMessageHandler}
        />
      </div>
    </>
  );
};

export default Messages;
