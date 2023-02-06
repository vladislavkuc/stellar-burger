import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginPage, RegisterPage, ForgotPage, ResetPage, ProfilePage, ConstructorPage, FeedPage, OrderPage } from '../../pages';
import { ProtectedRouteElement } from '../protected-route-element/protected-route-element';

const App = () => {
  return (
    <div className={`pt-5 pb-5 pr-10 pl-10 ${appStyles.app}`}>
      <Router>
        <AppHeader page='constructor'/>
        <main className={appStyles.main}>
          <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage />}/>
            <Route path="/forgot-password" element={<ForgotPage />}/>
            <Route path="/reset-password" element={<ResetPage />}/>
            <Route path='/feed' element={<FeedPage />}/>
            <Route path='/feed/:id' element={<OrderPage />}/>
            <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />} /> } />
            <Route path="/profile/orders" element={<ProtectedRouteElement element={<ProfilePage />} /> } />
            <Route path="/profile/orders/:id" element={<ProtectedRouteElement element={<OrderPage />} /> } />
            <Route path="/ingredients/:id" element={<ConstructorPage />}/>
            <Route path="/" element={<ConstructorPage />}/>
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
