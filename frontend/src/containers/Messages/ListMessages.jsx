import { useGetMessagesQuery } from '../../api/messagesApi.js';

const ListMessages = () => {
  const { data, error, isLoading, refetch } = useGetMessagesQuery();
  // console.log(data);
  //{ id: '1', body: 'text message', channelId: '1', username: 'admin }

  return (
    <div>
      {data?.map((message) => (
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
