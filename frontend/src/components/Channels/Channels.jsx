import { useTranslation } from 'react-i18next';

import ListChannels from './ListChannels.jsx';

const Channels = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels.header')}</b>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
        >
          +
        </button>
      </div>
      <ListChannels />
    </>
  );
};

export default Channels;
