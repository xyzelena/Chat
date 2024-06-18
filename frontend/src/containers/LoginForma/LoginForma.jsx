import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';
import { useFormik } from 'formik';

import axios from 'axios';

import useAuth from '../../hooks/useAuth.jsx';

import apiRoutes from '../../utils/apiRoutes.js';

const LoginForma = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const auth = useAuth();
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
      refFeedback.current.style.display = 'block';
    }

    if (validAuth === true) {
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
          const data = JSON.stringify(response.data);
          localStorage.setItem('userId', data);

          auth.logIn();
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
          Неверные имя пользователя или пароль
        </div>
      </div>

      <button type="submit">{t('loginForma.btnSubmit')}</button>
    </Form>
  );
};

export default LoginForma;
