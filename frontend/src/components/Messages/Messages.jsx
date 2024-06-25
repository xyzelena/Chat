import HeaderListMessages from '../../containers/Messages/HeaderListMessages.jsx';
import ListMessages from '../../containers/Messages/ListMessages.jsx';
import FormNewMessage from '../../containers/Messages/FormNewMessage.jsx';

const Messages = () => {
  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <HeaderListMessages />
      </div>

      <div id="messages-box" className="chat-messages overflow-auto px-5">
        <ListMessages />
      </div>

      <div className="mt-auto px-5 py-3">
        <FormNewMessage />
      </div>
    </>
  );
};

export default Messages;
