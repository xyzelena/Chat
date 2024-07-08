import cn from 'classnames';

const Channel = (props) => {
  const { channel, onSelect, currentChannelId } = props;

  const btnClass = cn('w-100', 'rounded-0', 'text-start', 'btn', {
    'btn-primary': currentChannelId === channel.id,
  });

  return (
    <li className="nav-item w-100">
      <button type="button" className={btnClass} onClick={onSelect}>
        <span className="me-1">#</span>
        {channel.name}
      </button>
    </li>
  );
};

export default Channel;
