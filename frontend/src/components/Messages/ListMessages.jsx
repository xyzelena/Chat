const ListMessages = (props) => {
  const { currentChannelMessages } = props;

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
