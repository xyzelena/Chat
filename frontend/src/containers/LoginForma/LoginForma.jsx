import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';

const LoginForma = () => {
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      onSubmit={async (values) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field
            name="username"
            id="username"
            autoComplete="username"
            required
            placeholder={t('loginForma.login')}
            type="text"
          />

          <Field
            name="password"
            id="password"
            autoComplete="current-password"
            required
            placeholder={t('loginForma.password')}
            type="password"
          />

          <button type="submit" disabled={isSubmitting}>
            {t('loginForma.btnSubmit')}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForma;
