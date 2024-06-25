import { Provider } from 'react-redux';

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import 'bootstrap/dist/css/bootstrap.min.css';

import resources from './locales/index.js';

import store from './store/index.js';

import App from './components/App/App.jsx';

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n
    // передаем экземпляр i18n в react-i18next,
    // который сделает его доступным для всех компонентов через context API
    .use(initReactI18next)

    .use(LanguageDetector) // с помощью плагина определяем язык пользователя в браузере

    .init({
      fallbackLng: 'ru', // если переводы на языке пользователя недоступны, то будет использоваться язык, указанный в этом поле
      debug: false,
      resources,
      interpolation: {
        escapeValue: false, // экранирование уже есть в React, поэтому отключаем
      },
    });

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default init;
