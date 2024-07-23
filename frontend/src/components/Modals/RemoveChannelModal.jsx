import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

import useChannelModal from '../../hooks/useChannelModal.js';

import useSocket from '../../hooks/useSocket.js';

import { useRemoveChannelMutation } from '../../api/channelsApi.js';

import TYPES_MODAL from '../../utils/typesModal.js';

const RemoveChannelModal = () => {
  const { currentChannelId, handleCloseCurrentModal, refetch, t } =
    useChannelModal();

  const { isVisible, type } = useSelector((state) => state.modals);

  const isCurrentModalVisible =
    type === TYPES_MODAL.REMOVE_CHANNEL() && isVisible;

  const socket = useSocket();

  const [
    removeChannel,
    { error: removeChannelError, isLoading: isRemovingChannel },
  ] = useRemoveChannelMutation();

  useEffect(() => {
    if (isRemovingChannel) {
      toast.info(t('infoToast.channelRemoving'));
    }
  }, [isRemovingChannel]);

  const handleRemoveChannel = async () => {
    try {
      const response = await removeChannel(currentChannelId);

      socket.emit('removeChannel', response.data, (acknowledgment) => {
        if (acknowledgment.error) {
          toast.error(t('errorsToast.channelRemoveError'));
        } else {
          console.log(acknowledgment.status);
        }
      });

      refetch();
      handleCloseCurrentModal();
    } catch (err) {
      console.error('Error removing channel:', err);
      toast.error(t('errorsToast.channelRemoveError'));
    }
  };

  return (
    <Modal
      show={isCurrentModalVisible}
      size="md"
      centered
      onHide={handleCloseCurrentModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('channelModals.titleRemoveChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">{t('channelModals.questionRemoveChannel')}</p>

        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="me-2 btn btn-secondary"
            onClick={handleCloseCurrentModal}
          >
            {t('buttons.btnСancel')}
          </button>

          <button
            type="button"
            className="btn btn-danger"
            onClick={handleRemoveChannel}
          >
            {t('buttons.btnDelete')}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
