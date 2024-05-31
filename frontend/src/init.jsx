import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import resources from './locales/index.js';
import App from './components/App/App.jsx';


const init = async () => {
    const defaultLanguage = 'ru';

    const i18n = i18next.createInstance();

    await i18n
        .use(initReactI18next)
        .init({
            lng: defaultLanguage,
            debug: false,
            resources,
        });

    return (
        <I18nextProvider i18n={i18n}>
            <App />
        </I18nextProvider>
    );
};

export default init;