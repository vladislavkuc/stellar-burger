import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngridients from '../burger-ingridients/burger-ingridients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App = () => {
  return (
    <div className={`p-10 ${appStyles.app}`}>
      <AppHeader page='constructor'/>
      <DndProvider backend={HTML5Backend}>
        <main className={`pt-10 ${appStyles.main}`}>
          <BurgerIngridients />
          <BurgerConstructor />
        </main>
      </DndProvider>
    </div>
  );
}

export default App;
