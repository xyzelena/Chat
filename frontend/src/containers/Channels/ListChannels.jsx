import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useGetChannelsQuery } from '../../api/channelsApi.js';

import { setCurrentChannel } from '../../slices/currentChannelSlice.js';

const ListChannels = () => {
  const dispatch = useDispatch();

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
        <li className="nav-item w-100" key={channel.id}>
          <button
            type="button"
            className="w-100 rounded-0 text-start btn"
            onClick={() => dispatch(setCurrentChannel(channel))}
          >
            <span className="me-1">#</span>
            {channel.name}
          </button>
        </li>
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
