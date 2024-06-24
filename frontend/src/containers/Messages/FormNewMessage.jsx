const FormNewMessage = () => {
  return (
    <form noValidate="" className="py-1 border rounded-2">
      <div className="input-group has-validation">
        <input
          name="body"
          aria-label="Новое сообщение"
          placeholder="Введите сообщение..."
          className="border-0 p-0 ps-2 form-control"
          value=""
        />

        <button type="submit" className="btn btn-group-vertical" disabled="">
          Отправить
        </button>
      </div>
    </form>
  );
};

export default FormNewMessage;
