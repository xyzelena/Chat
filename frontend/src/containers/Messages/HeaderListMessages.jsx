import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const HeaderListMessages = () => {
  const { t } = useTranslation();

  const { currentChannelData, countCurrentMessages } = useSelector(
    (state) => state.currentChannel,
  );

  return (
    <>
      <p className="m-0">
        <b># {currentChannelData?.name}</b>
      </p>
      <span className="text-muted">
        {countCurrentMessages} {t('messages.header')}
      </span>
    </>
  );
};

export default HeaderListMessages;
