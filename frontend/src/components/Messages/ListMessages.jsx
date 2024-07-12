import { useRef, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';

const ListMessages = (props) => {
  const { currentChannelMessages, isLoading } = props;

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentChannelMessages]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

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
