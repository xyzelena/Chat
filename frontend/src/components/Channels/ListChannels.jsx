import Channel from './Channel.jsx';

const ListChannels = (props) => {
  const { channels, currentChannelId, handleCurrentChannelId } = props;

  return (
    <ul
      id="channels-box"
      className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
    >
      {channels?.map((channel) => (
        <Channel
          key={channel.id}
          currentChannelId={currentChannelId}
          channel={channel}
          onSelect={() => handleCurrentChannelId(channel.id)}
        />
      ))}
    </ul>
  );
};

export default ListChannels;

/* <li className="nav-item w-100">
  <div role="group" className="d-flex dropdown btn-group">
    <button
      type="button"
      className="w-100 rounded-0 text-start text-truncate btn"
    >
      <span className="me-1">#</span>12345
    </button>
    <button
      type="button"
      id="react-aria5629665839-:r1:"
      aria-expanded="false"
      className="flex-grow-0 dropdown-toggle dropdown-toggle-split btn"
    >
      <span className="visually-hidden">Управление каналом</span>
    </button>
  </div>
</li>; */
