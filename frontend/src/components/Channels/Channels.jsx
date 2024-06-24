import ListChannels from '../../containers/Channels/ListChannels.jsx';

const Channels = () => {
  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
        >
          +
        </button>
      </div>
      <ListChannels />;
    </>
  );
};

export default Channels;
