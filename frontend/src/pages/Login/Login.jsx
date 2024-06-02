import LoginForma from '../../components/LoginForma/LoginForma';

import img from '../../assets/images/login.jpg'; 

const Login = () => {
  return (
    <div className='container_enteringData'>
        <div className='container_enteringData_img'>
            <img src={img} alt="registering cat" />
        </div>

        <div className='forma'>
          <h1>Войти</h1>

          <LoginForma />
        </div>

    </div>
  )
}

export default Login; 