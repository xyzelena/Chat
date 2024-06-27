import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';

import { useFormik } from 'formik';

import axiosApi from '../../api/axiosApi.js';
import routes from '../../utils/routes.js';

import useAuth from '../../hooks/useAuth.js';

const LoginForma = () => {
  const navigate = useNavigate();

  const { logIn } = useAuth();

  const { t } = useTranslation();

  const [validAuth, setValidAuth] = useState(null);

  const refUsername = useRef();
  const refPassword = useRef();
  const refFeedback = useRef();

  useEffect(() => {
    refUsername.current.focus();
  }, [validAuth]);

  useEffect(() => {
    if (validAuth === false) {
      refUsername.current.focus();
      refUsername.current.classList.add('is-invalid');
      refPassword.current.classList.add('is-invalid');
      refFeedback.current.style.display = 'block';
    }

    if (validAuth === true) {
      refUsername.current.classList.remove('is-invalid');
      refPassword.current.classList.remove('is-invalid');

      refUsername.current.classList.add('is-valid');
      refPassword.current.classList.add('is-valid');

      refFeedback.current.style.display = 'none';
    }
  }, [validAuth]);

  useEffect(() => {
    if (validAuth) navigate('/');
  }, [validAuth, navigate]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (valuesForm) => {
      try {
        const response = await axiosApi.post(routes.login, valuesForm);
        //console.log(response.data); // => { token: ..., username: 'admin' }

        logIn(response.data);
        setValidAuth(true);
      } catch (error) {
        setValidAuth(false);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <input
          name="username"
          id="username"
          autoComplete="username"
          required
          placeholder={t('loginForma.login')}
          type="text"
          className="form-control"
          onChange={formik.handleChange}
          value={formik.values.username}
          ref={refUsername}
        />
      </div>

      <div className="form-group">
        <input
          name="password"
          id="password"
          autoComplete="current-password"
          required
          placeholder={t('loginForma.password')}
          type="password"
          className="form-control"
          onChange={formik.handleChange}
          value={formik.values.password}
          ref={refPassword}
        />

        <div className="invalid-feedback" ref={refFeedback}>
          {t('loginForma.error')}
        </div>
      </div>

      <button type="submit">{t('loginForma.btnSubmit')}</button>
    </Form>
  );
};

export default LoginForma;
