import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { toast } from 'react-toastify';

import { useGetChannelsQuery } from '../../api/channelsApi.js';

import {
  setChannels,
  setCurrentChannelId,
} from '../../slices/channelsSlice.js';

import {
  setModalVisibility,
  resetModalState,
} from '../../slices/modalsSlice.js';

import HeaderListChannels from './HeaderListChannels.jsx';

import ListChannels from './ListChannels.jsx';

import ChannelModals from '../Modals/ChannelModals.jsx';

import ChannelContext from '../../contexts/ChannelContext.js';

import ChannelModalContext from '../../contexts/ChannelModalContext.js';

const Channels = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const getChannels = (state) => state.channels;
  const { channels, currentChannelId } = useSelector(getChannels);

  const handleCurrentChannelId = (idChannel) => {
    dispatch(setCurrentChannelId(idChannel));
  };

  const { data, error: getChannelsError, refetch } = useGetChannelsQuery();

  useEffect(() => {
    if (data) {
      dispatch(setChannels(data));

      if (!currentChannelId) handleCurrentChannelId(data[0].id);
    }
  }, [data, currentChannelId, dispatch]);

  useEffect(() => {
    if (getChannelsError) {
      toast.error(t('errorsToast.channelGettingError'));
    }
  }, [getChannelsError, t]);

  const showChannelModal = (typeModal) => {
    dispatch(
      setModalVisibility({
        isVisible: true,
        type: typeModal,
      }),
    );
  };

  const handleCloseCurrentModal = () => dispatch(resetModalState());

  const channelContextValue = useMemo(
    () => ({
      channels,
      currentChannelId,
      handleCurrentChannelId,
      showChannelModal,
      t,
    }),
    [channels, currentChannelId, handleCurrentChannelId, showChannelModal, t],
  );

  const channelModalContextValue = useMemo(
    () => ({
      channels,
      currentChannelId,
      handleCurrentChannelId,
      handleCloseCurrentModal,
      refetch,
      t,
    }),
    [
      channels,
      currentChannelId,
      handleCurrentChannelId,
      handleCloseCurrentModal,
      refetch,
      t,
    ],
  );

  return (
    <>
      <HeaderListChannels t={t} showChannelModal={showChannelModal} />

      <ChannelContext.Provider value={channelContextValue}>
        <ListChannels />
      </ChannelContext.Provider>

      <ChannelModalContext.Provider value={channelModalContextValue}>
        <ChannelModals />
      </ChannelModalContext.Provider>
    </>
  );
};

export default Channels;
