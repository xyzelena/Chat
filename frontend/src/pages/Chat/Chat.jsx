import { Link, Outlet } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Chat = () => {
  const { t } = useTranslation();

  return (
    <>
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <Link className="navbar-brand" to="/"> {t('baseTextUI.header')}</Link>
        </div>
      </nav>

      <Outlet />
    </>

  )
}

export default Chat; 