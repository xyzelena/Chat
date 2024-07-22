import { useEffect } from 'react';
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

import AddChannelModal from '../Modals/AddChannelModal.jsx';

import ChannelContext from '../../contexts/ChannelContext.js';

import ChannelModalContext from '../../contexts/ChannelModalContext.js';

import TYPES_MODAL from '../../utils/typesModal.js';

const Channels = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { channels, currentChannelId } = useSelector((state) => state.channels);

  const handleCurrentChannelId = (idChannel) => {
    dispatch(setCurrentChannelId(idChannel));
  };

  const {
    data,
    error: getChannelsError,
    isLoading: isGettingChannels,
    refetch,
  } = useGetChannelsQuery();
  // console.log(data);
  // {id: '1', name: 'general', removable: false}

  useEffect(() => {
    if (data) {
      dispatch(setChannels(data));

      if (currentChannelId === null) handleCurrentChannelId(data[0].id);
    }
  }, [data]);

  useEffect(() => {
    if (getChannelsError) {
      toast.error(t('errorsToast.networkError'));
    }
  }, [getChannelsError]);

  const showAddChannelModal = () => {
    dispatch(
      setModalVisibility({
        isVisible: true,
        type: TYPES_MODAL.ADD_CHANNEL(),
        extraData: {},
      }),
    );
  };

  const handleCloseCurrentModal = () => dispatch(resetModalState());

  return (
    <>
      <HeaderListChannels t={t} showAddChannelModal={showAddChannelModal} />

      <ChannelContext.Provider
        value={{
          channels,
          currentChannelId,
          handleCurrentChannelId,
          t,
        }}
      >
        <ListChannels />
      </ChannelContext.Provider>

      <ChannelModalContext.Provider
        value={{
          handleCloseCurrentModal,
          t,
          refetch,
          handleCurrentChannelId,
          channels,
        }}
      >
        <AddChannelModal />
      </ChannelModalContext.Provider>
    </>
  );
};

export default Channels;
