import { Formik, Form, Field } from 'formik';

const LoginForma = () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    return (
        <Formik 
            initialValues={{
                username: '',
                password: '',
            }}
            onSubmit={async (values) => {
                await sleep(500);
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
                            placeholder="Пароль"
                            type='text'
                        />

                        <Field
                            name="password"
                            id="password"
                            autoComplete="current-password"
                            required
                            placeholder="Ваш ник"
                            type="password"
                        />

                        <button type="submit" disabled={isSubmitting}>
                            Войти
                        </button>
                    </Form>
            )}
        </Formik>
    );
}

export default LoginForma; 