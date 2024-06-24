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

      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        <li className="nav-item w-100">
          <button
            type="button"
            className="w-100 rounded-0 text-start btn btn-secondary"
          >
            <span className="me-1">#</span>general
          </button>
        </li>

        <li className="nav-item w-100">
          <button type="button" className="w-100 rounded-0 text-start btn">
            <span className="me-1">#</span>random
          </button>
        </li>

        <li className="nav-item w-100">
          <div role="group" className="d-flex dropdown btn-group">
            <button
              type="button"
              className="w-100 rounded-0 text-start text-truncate btn"
            >
              <span className="me-1">#</span>12345
            </button>
            <button
              type="button"
              id="react-aria5629665839-:r1:"
              aria-expanded="false"
              className="flex-grow-0 dropdown-toggle dropdown-toggle-split btn"
            >
              <span className="visually-hidden">Управление каналом</span>
            </button>
          </div>
        </li>
      </ul>
    </>
  );
};

export default Channels;
