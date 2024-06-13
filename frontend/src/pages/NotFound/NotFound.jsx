import {Link} from'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from './NotFound.module.css';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container_notFound}>
      <h1> {t('notFound.header')} </h1>
      <p> 
        {t('notFound.text')} 
        <Link to="/"> {t('notFound.linkMainPage')} </Link>
      </p>
    </div>
  )
}

export default NotFound; 