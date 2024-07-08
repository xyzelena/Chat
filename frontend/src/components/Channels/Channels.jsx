import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { useGetChannelsQuery } from '../../api/channelsApi.js';

import {
  setChannels,
  setCurrentChannelId,
} from '../../slices/channelsSlice.js';

import ListChannels from './ListChannels.jsx';

const Channels = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { data, error, isLoading, refetch } = useGetChannelsQuery();
  // console.log(data);
  // {id: '1', name: 'general', removable: false}

  useEffect(() => {
    if (data) {
      dispatch(setChannels(data));
    }
  }, [data, dispatch]);

  const handleCurrentChannelId = (idChannel) => {
    dispatch(setCurrentChannelId(idChannel));
  };

  const { channels, currentChannelId } = useSelector((state) => state.channels);

  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels.header')}</b>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
        >
          +
        </button>
      </div>

      <ListChannels
        channels={channels}
        currentChannelId={currentChannelId}
        handleCurrentChannelId={handleCurrentChannelId}
      />
    </>
  );
};

export default Channels;
