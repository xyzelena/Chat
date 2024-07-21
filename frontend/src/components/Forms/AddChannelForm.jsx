import { useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { useFormik } from 'formik';

import cn from 'classnames';

import schemaValidationYup from '../../utils/schemaValidationYup.js';

import useChannelModal from '../../hooks/useChannelModal.js';

import useSocket from '../../hooks/useSocket.js';

import { useAddChannelMutation } from '../../api/channelsApi.js';

const AddChannelForm = () => {
  const {
    handleCloseCurrentModal,
    t,
    refetch,
    handleCurrentChannelId,
    channels,
  } = useChannelModal();

  const socket = useSocket();

  const refInputName = useRef();

  const namesChannels = channels.map((channel) => channel.name);

  const schema = schemaValidationYup(namesChannels, t);

  const [addChannel, { error: addChannelError, isLoading: isAddingChannel }] =
    useAddChannelMutation();

  useEffect(() => {
    refInputName.current.focus();
  }, []);

  useEffect(() => {
    if (isAddingChannel) {
      toast.info(t('infoToast.channelAdding'));
    }
  }, [isAddingChannel, t]);

  const formik = useFormik({
    initialValues: {
      name: '',
    },

    validationSchema: schema,

    onSubmit: async (valuesForm) => {
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

export default AddChannelForm;
