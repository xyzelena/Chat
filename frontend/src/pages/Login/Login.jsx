import {Link} from'react-router-dom';
import { useTranslation } from 'react-i18next';

import LoginForma from '../../containers/LoginForma/LoginForma';

import img from '../../assets/images/login.jpg';

const Login = () => {
  const { t } = useTranslation();

  return (
    <div className='container_enteringData'>

      <div className='container_enteringData_main'>
        <div className='container_enteringData_img'>
          <img src={img} alt="login" />
        </div>

        <div className='forma'>
          <h1> {t('loginForma.header')}</h1>

          <LoginForma />
        </div>
      </div>

      <div className='container_enteringData_footer'>
        <span>{t('loginForma.noRegistrationQuestion')}</span>
        <Link to="/signup">{t('loginForma.btnGetRegistration')}</Link>
      </div>

    </div>
  )
}

export default Login; 