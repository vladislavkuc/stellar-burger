import { useState, useEffect } from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngridients from '../burger-ingridients/burger-ingridients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { url } from './../../utils/constants';

const App = () => {
  const [ data, setData ] = useState([]);

  useEffect(() => {
    fetch(url)
    .then(res => res.json())
    .then(({ data }) => setData(JSON.parse(JSON.stringify(data))))
    .catch(error => console.log(`Ошибка: ${error}`))
  }, []);

  return (
    <div className={`p-10 ${appStyles.app}`}>
      <AppHeader page='constructor'/>
      <main className={`pt-10 ${appStyles.main}`}>
        <BurgerIngridients data={data } />
        <BurgerConstructor data={data} />
      </main>
    </div>
  );
}

export default App;
