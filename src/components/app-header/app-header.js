import { useState } from 'react';
import PropTypes from 'prop-types';
import headerStyles from './app-header.module.css';
import {BurgerIcon, ListIcon, ProfileIcon, Logo} from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = (props) => {
  const [page, setPage] = useState(props.page);

  return(
    <header className={headerStyles.header}>
      <div className={`pt-6 pb-6 ${headerStyles['header-content']}`}>
        <nav>
          <ul className={headerStyles.list}>
            <li className={`pl-5 pr-5 pb-4 pt-4 ${headerStyles['list-item']}`} onClick={() => setPage('constructor')}>
              <BurgerIcon type={page === 'constructor' ? 'primary' : 'secondary'}/>
              <p
                className={`text text_type_main-default ml-2 ${page === 'constructor' ? '' : 'text_color_inactive'}`}
              >Конструктор</p>
            </li>
            <li className={`pl-5 pr-5 pb-4 pt-4 ml-2 ${headerStyles['list-item']}`} onClick={() => setPage('list')}>
              <ListIcon type={page === 'list' ? 'primary' : 'secondary'}/>
              <p className={`text text_type_main-default ml-2 ${page === 'list' ? '' : 'text_color_inactive'}`}>Лента заказов</p>
            </li>
          </ul>
        </nav>

        <div className={headerStyles.logo}>
          <Logo />
        </div>

        <div className={`pl-5 pr-5 pb-4 pt-4 ${headerStyles['list-item']}`} onClick={() => setPage('cabinet')}>
          <ProfileIcon type={page === 'cabinet' ? 'primary' : 'secondary'}/>
          <p className={`text text_type_main-default ml-2 ${page === 'cabinet' ? '' : 'text_color_inactive'}`}>Личный кабинет</p>
        </div>
      </div>
    </header>
  )
}

AppHeader.propTypes = {
  page: PropTypes.string
};

export default AppHeader;
