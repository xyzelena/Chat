import {Link} from'react-router-dom';

import LoginForma from '../../components/LoginForma/LoginForma';

import img from '../../assets/images/login.jpg';

const Login = () => {
  return (
    <div className='container_enteringData'>

      <div className='container_enteringData_main'>
        <div className='container_enteringData_img'>
          <img src={img} alt="login" />
        </div>

        <div className='forma'>
          <h1>Войти</h1>

          <LoginForma />
        </div>
      </div>

      <div className='container_enteringData_footer'>
        <span>Нет аккаунта?</span>
        <Link to="/signup">Регистрация</Link>
      </div>

    </div>
  )
}

export default Login; 