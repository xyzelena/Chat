import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useGetMessagesQuery } from '../../api/messagesApi.js';

import { setCountCurrentMessages } from '../../slices/currentChannelSlice.js';

const ListMessages = () => {
  const { data, error, isLoading, refetch } = useGetMessagesQuery();
  // console.log(data);
  //{ id: '1', body: 'text message', channelId: '1', username: 'admin }

  const dispatch = useDispatch();

  const currentChannel = useSelector(
    (state) => state.currentChannel.currentChannelData,
  );

  const currentChannelMessages = data?.filter(
    (message) => message.channelId === currentChannel?.id,
  );

  useEffect(() => {
    dispatch(setCountCurrentMessages(currentChannelMessages?.length));
  });

  return (
    <div>
      {currentChannelMessages?.map((message) => (
        <div className="text-break mb-2" key={message.id}>
          <b>{message.username}</b>: {message.body}
        </div>
      ))}
    </div>
  );
};

export default ListMessages;

// <div className="text-break mb-2">
// <b>admin</b>: msg 1
// </div>
