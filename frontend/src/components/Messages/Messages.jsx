const Messages = () => {
  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b># general</b>
        </p>
        <span className="text-muted">2 сообщения</span>
      </div>

      <div id="messages-box" className="chat-messages overflow-auto px-5">
        <div className="text-break mb-2">
          <b>admin</b>: msg 1
        </div>
        <div className="text-break mb-2">
          <b>admin</b>: msg 2
        </div>
      </div>

      <div className="mt-auto px-5 py-3">
        <form noValidate="" className="py-1 border rounded-2">
          <div className="input-group has-validation">
            <input
              name="body"
              aria-label="Новое сообщение"
              placeholder="Введите сообщение..."
              className="border-0 p-0 ps-2 form-control"
              value=""
            />

            <button
              type="submit"
              className="btn btn-group-vertical"
              disabled=""
            >
              Отправить
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Messages;
