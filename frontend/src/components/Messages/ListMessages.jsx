import { useRef, useEffect } from 'react';

const ListMessages = (props) => {
  const { currentChannelMessages } = props;

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentChannelMessages]);

  return (
    <div>
      {currentChannelMessages?.map((message) => (
        <div className="text-break mb-2" key={message.id}>
          <b>{message.username}</b>: {message.body}
        </div>
      ))}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default ListMessages;
