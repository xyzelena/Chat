import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';

import { useFormik } from 'formik';

import axios from 'axios';

import { setCredentials } from '../../slices/authSlice.js';
import useAuth from '../../hooks/useAuth.jsx';
import apiRoutes from '../../utils/apiRoutes.js';

const LoginForma = () => {
  // Вытаскиваем данные из хранилища
  // {username: null, token: null
  // const authState = useSelector((state) => state.auth);

  // Возвращает метод store.dispatch() текущего хранилища
  const dispatch = useDispatch();

  const location = useLocation();

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
    onSubmit: ({ username, password }) => {
      axios
        .post(apiRoutes.loginPath, {
          username,
          password,
        })
        .then((response) => {
          //response.data {token:"eyJh...",username:"admin"}
          dispatch(setCredentials(response.data));

          const data = JSON.stringify(response.data);

          localStorage.setItem('userId', data);

          authHandle.logIn();

          setValidAuth(true);
        })
        .catch(() => {
          setValidAuth(false);
        });
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
