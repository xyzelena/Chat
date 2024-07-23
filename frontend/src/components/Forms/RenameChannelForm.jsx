import { useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';

import cn from 'classnames';

import schemaValidationYup from '../../utils/schemaValidationYup.js';

import useChannelModal from '../../hooks/useChannelModal.js';

import useSocket from '../../hooks/useSocket.js';

import { useEditChannelMutation } from '../../api/channelsApi.js';

const RenameChannelForm = () => {
  const { channels, currentChannelId, handleCloseCurrentModal, refetch, t } =
    useChannelModal();

  const socket = useSocket();

  const refInputName = useRef();

  const namesChannels = channels.map((channel) => channel.name);

  const currentChannel = channels.find(
    (channel) => channel.id === currentChannelId,
  );

  const schema = schemaValidationYup(namesChannels, t);

  const [
    editChannel,
    { error: editChannelError, isLoading: isEditingChannel },
  ] = useEditChannelMutation();

  useEffect(() => {
    refInputName.current.focus();
  }, []);

  useEffect(() => {
    if (isEditingChannel) {
      toast.info(t('infoToast.channelEditing'));
    }
  }, [isEditingChannel]);

  const formik = useFormik({
    initialValues: {
      name: currentChannel.name,
    },

    validationSchema: schema,

    onSubmit: async (valuesForm) => {
      try {
        const response = await editChannel({
          id: currentChannelId,
          updateData: valuesForm,
        });

        socket.emit('renameChannel', response.data, (acknowledgment) => {
          if (acknowledgment.error) {
            toast.error(t('errorsToast.channelEditError'));
          } else {
            console.log(acknowledgment.status);
          }
        });

        handleCloseCurrentModal();

        refetch();
      } catch (err) {
        console.error('Error editing channel:', err);
        toast.error(t('errorsToast.channelEditError'));
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <label htmlFor="name" className="visually-hidden">
        {t('channelModals.labelNameChannel')}
      </label>

      <input
        name="name"
        id="name"
        type="text"
        required
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
        ref={refInputName}
        className={cn('mb-2', 'form-control', {
          'is-valid': formik.touched.name && !formik.errors.name,
          'is-invalid': formik.touched.name && formik.errors.name,
        })}
      />

      {formik.touched.name && formik.errors.name ? (
        <div className="invalid-feedback" style={{ display: 'block' }}>
          {formik.errors.name}
        </div>
      ) : null}

      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="me-2 btn btn-secondary"
          onClick={handleCloseCurrentModal}
        >
          {t('buttons.btnСancel')}
        </button>

        <button type="submit" className="btn btn-primary">
          {t('buttons.btnSend')}
        </button>
      </div>
    </Form>
  );
};

export default RenameChannelForm;
