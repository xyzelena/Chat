import { BsFilePlus } from 'react-icons/bs';

const HeaderListChannels = (props) => {
  const { showAddChannelModal, t } = props;

  return (
    <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
      <b>{t('channels.header')}</b>

      <button
        type="button"
        className="p-0 btn btn-group-vertical btn-lg"
        onClick={showAddChannelModal}
      >
        <BsFilePlus />
        <span className="visually-hidden">+</span>
      </button>
    </div>
  );
};

export default HeaderListChannels;
