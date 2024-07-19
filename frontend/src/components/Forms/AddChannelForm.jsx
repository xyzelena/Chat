import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';

import useChannelModal from '../../hooks/useChannelModal.js';

import useSocket from '../../hooks/useSocket.js';

import { useAddChannelMutation } from '../../api/channelsApi.js';

const AddChannelForm = () => {
  const { handleCloseCurrentModal, t, refetch, handleCurrentChannelId } =
    useChannelModal();

  const [addChannel, { error: addChannelError, isLoading: isAddingChannel }] =
    useAddChannelMutation();

  const socket = useSocket();

  const navigate = useNavigate();

  const [validNameChannel, setValidNameChannel] = useState(null);

  const [error, setError] = useState('');

  const refInputName = useRef();
  const refFeedback = useRef();

  useEffect(() => {
    refInputName.current.focus();
  }, []);

  useEffect(() => {
    if (isAddingChannel) {
      toast.info(t('infoToast.channelAdding'));
    }
  }, [isAddingChannel]);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: async (valuesForm) => {
      setError('');

      try {
        const response = await addChannel(valuesForm);

        socket.emit('newChannel', response.data, (acknowledgment) => {
          if (acknowledgment.error) {
            toast.error(t('errorsToast.channelAddError'));
          } else {
            console.log(acknowledgment.status);
          }
        });

        refetch();

        handleCloseCurrentModal();
        handleCurrentChannelId(response.data.id);
      } catch (err) {
        console.error('Error adding channel:', err);
        toast.error(t('errorsToast.channelAddError'));
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <label htmlFor="name" className="visually-hidden">
        {t('addChannelModal.label')}
      </label>

      <input
        name="name"
        id="name"
        type="text"
        className="mb-2 form-control"
        required
        onChange={formik.handleChange}
        value={formik.values.name}
        ref={refInputName}
      />

      <div className="invalid-feedback" ref={refFeedback}>
        {error}
      </div>

      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="me-2 btn btn-secondary"
          onClick={handleCloseCurrentModal}
        >
          {t('addChannelModal.btnСancel')}
        </button>

        <button type="submit" className="btn btn-primary">
          {t('addChannelModal.btnSend')}
        </button>
      </div>
    </Form>
  );
};

export default AddChannelForm;
