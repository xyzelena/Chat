import { useTranslation } from 'react-i18next';

import Channels from '../../components/Channels/Channels.jsx';
import Messages from '../../components/Messages/Messages.jsx';

const Chat = () => {
  const { t } = useTranslation();

  return (
    <div className="container h-100 my-4 rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 px-0 flex-column h-100 d-flex">
          <Channels />
        </div>

        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100 border-start border-light border-2">
            <Messages />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
