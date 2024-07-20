import { useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { useFormik, ErrorMessage } from 'formik';

import * as Yup from 'yup';

import cn from 'classnames';

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

  const namesChannels = channels.map((channel) => channel.name);

  const [addChannel, { error: addChannelError, isLoading: isAddingChannel }] =
    useAddChannelMutation();

  const socket = useSocket();

  const refInputName = useRef();

  useEffect(() => {
    refInputName.current.focus();
  }, []);

  useEffect(() => {
    if (isAddingChannel) {
      toast.info(t('infoToast.channelAdding'));
    }
  }, [isAddingChannel, t]);

  const schema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Required')
      .notOneOf(namesChannels, 'name must be uniq'),
  });

  Yup.setLocale({
    mixed: {
      name: 'name',
      min: 'min',
      max: 'max',
      required: 'required',
      notOneOf: 'notOneOf',
      default: 'name',
    },
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },

    validationSchema: schema,

    onSubmit: async (valuesForm) => {
      // setError('');

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
