import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';

import { useFormik } from 'formik';

import postAuth from '../../api/authApi.js';

import { setCredentials } from '../../slices/authSlice.js';
import useAuth from '../../hooks/useAuth.jsx';
import apiRoutes from '../../utils/apiRoutes.js';

import { setItemStorage } from '../../utils/authLocalStorage.js';

const LoginForma = () => {
  // Возвращает метод store.dispatch() текущего хранилища
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const authHandle = useAuth();
  // {loggedIn: false, logIn: ƒ, logOut: ƒ}

  const { t } = useTranslation();

  const [validAuth, setValidAuth] = useState(null);

  const refUsername = useRef();
  const refPassword = useRef();
  const refFeedback = useRef();

  useEffect(() => {
    refUsername.current.focus();
  }, []);

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

      navigate('/');
    }
  }, [validAuth]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (valuesForm) => {
      try {
        const response = await postAuth(apiRoutes.loginPath, valuesForm);
        dispatch(setCredentials(response.data));
        setItemStorage(response.data);
        authHandle.logIn();
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
