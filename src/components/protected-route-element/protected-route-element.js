import { Navigate } from 'react-router-dom';

export function ProtectedRouteElement({ element }) {
  return localStorage.getItem('refreshToken') ? element : <Navigate to="/login" replace/>;
}
