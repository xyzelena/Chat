import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useGetChannelsQuery } from '../../api/channelsApi.js';

import { setCurrentChannel } from '../../slices/currentChannelSlice.js';

import Channel from '../../components/Channels/Channel.jsx';

const ListChannels = () => {
  const dispatch = useDispatch();

  const { currentChannelData } = useSelector((state) => state.currentChannel);

  const { data, error, isLoading, refetch } = useGetChannelsQuery();
  // console.log(data);
  // {id: '1', name: 'general', removable: false}

  // useEffect(() => {
  //   if (!isLoading && error) refetch();
  // });

  useEffect(() => {
    if (data) dispatch(setCurrentChannel(data[0]));
  }, [data]);

  return (
    <ul
      id="channels-box"
      className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
    >
      {data?.map((channel) => (
        <Channel
          key={channel.id}
          currentChannelId={currentChannelData.id ?? 0}
          channel={channel}
          onSelect={() => dispatch(setCurrentChannel(channel))}
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
