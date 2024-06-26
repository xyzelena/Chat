import { useTranslation } from 'react-i18next';

const FormNewMessage = () => {
  const { t } = useTranslation();

  return (
    <form noValidate="" className="py-1 border rounded-2">
      <div className="input-group has-validation">
        <input
          name="body"
          aria-label={t('formNewMessage.ariaLabel')}
          placeholder={t('formNewMessage.placeholder')}
          className="border-0 p-0 ps-2 form-control"
          value=""
        />

        <button type="submit" className="btn btn-group-vertical" disabled="">
          {t('formNewMessage.btnSubmit')}
        </button>
      </div>
    </form>
  );
};

export default FormNewMessage;
