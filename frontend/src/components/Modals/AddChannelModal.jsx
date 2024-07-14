import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Modal from 'react-bootstrap/Modal';

import { resetModalState } from '../../slices/modalsSlice.js';

import AddChannelForm from '../Forms/AddChannelForm.jsx';

import typesChannelModal from '../../utils/typesChannelModal.js';

const AddChannelModal = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const modalStateVisible = useSelector((state) => state.modals.isVisible);

  const modalStateType = useSelector((state) => state.modals.type);

  const isCurrentModalVisible =
    modalStateType === typesChannelModal.ADD_CHANNEL() && modalStateVisible;

  const handleCloseCurrentModal = () => dispatch(resetModalState());

  return (
    <Modal
      show={isCurrentModalVisible}
      size="md"
      centered
      onHide={handleCloseCurrentModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('addChannelModal.title')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <AddChannelForm handleCloseCurrentModal={handleCloseCurrentModal} />
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;

/* 
  import Button from 'react-bootstrap/Button';

  <Modal.Footer>
<Button variant="secondary" onClick={handleClose}>
  {t('addChannelModal.btnСancel')}
</Button>
<Button variant="primary" onClick={handleClose}>
  {t('addChannelModal.btnSend')}
</Button>
</Modal.Footer> */
