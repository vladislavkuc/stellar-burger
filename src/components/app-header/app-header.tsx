import { FC, ReactElement } from 'react';
import headerStyles from './app-header.module.css';
import {BurgerIcon, ListIcon, ProfileIcon, Logo} from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, Link } from 'react-router-dom';

const AppHeader: FC = (): ReactElement => {
  const { pathname } = useLocation();

  const checkPath = (path: string) => {
    return pathname.split('/').find(word => word === path);
  };

  return(
    <header className={headerStyles.header}>
      <div className={`pt-6 pb-6 ${headerStyles['header-content']}`}>
        <nav>
          <ul className={headerStyles.list}>
            <li className={`pl-5 pr-5 pb-4 pt-4 ${headerStyles['list-item']}`}>
              <Link to="/" className={headerStyles.link}>
                <BurgerIcon type={pathname === '/' || checkPath('ingredients') ? 'primary' : 'secondary'}/>
                <p
                  className={`text text_type_main-default ml-2 ${pathname === '/' || checkPath('ingredients') ? '' : 'text_color_inactive'}`}
                >Конструктор</p>
              </Link>
            </li>
            <li className={`pl-5 pr-5 pb-4 pt-4 ml-2 ${headerStyles['list-item']}`}>
              <Link to="/feed" className={headerStyles.link}>
                <ListIcon type={checkPath('feed') ? 'primary' : 'secondary'}/>
                <p className={`text text_type_main-default ml-2 ${checkPath('feed') ? '' : 'text_color_inactive'}`}>Лента заказов</p>
              </Link>
            </li>
          </ul>
        </nav>

        <div className={headerStyles.logo}>
          <Logo />
        </div>

        <Link to="/profile" className={`pl-5 pr-5 pb-4 pt-4 ${headerStyles['list-item']}`}>
            <ProfileIcon type={checkPath('profile') ? 'primary' : 'secondary'}/>
            <p className={`text text_type_main-default ml-2 ${checkPath('profile') ? '' : 'text_color_inactive'}`}>Личный кабинет</p>
        </Link>
      </div>
    </header>
  )
}

export default AppHeader;
