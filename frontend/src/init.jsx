import { Provider } from 'react-redux';

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

import 'bootstrap/dist/css/bootstrap.min.css';

import store from './store/index.js';

import { SocketContextProvider } from './contexts/SocketContext.js';

import { BadWordsProvider } from './contexts/FilterBadWordsContext.js';

import App from './components/App/App.jsx';

import resources from './locales/index.js';

const init = async () => {
  const defaultLng = 'ru';

  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
      fallbackLng: defaultLng,
      debug: false,
      resources,
      interpolation: {
        escapeValue: false,
      },
    });

  const rollbarConfig = {
    accessToken: process.env.ROLLBAR_TOKEN,
    payload: {
      environment: 'production',
    },
    captureUncaught: true,
    captureUnhandledRejections: true,
  };

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <SocketContextProvider>
            <BadWordsProvider>
              <App />
            </BadWordsProvider>
          </SocketContextProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
