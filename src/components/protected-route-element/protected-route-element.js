import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getUserInfo } from '../../services/api';

export function ProtectedRouteElement({ element, isProtected }) {
  const [ auth, setAuth ] = useState(isProtected);

  useEffect(() => {
    getUserInfo()
      .then(res => {
        if (res.succes) { setAuth(true) }
        else { setAuth(false) }
      })
      .catch(err => console.log(err));
  }, []);

  if (isProtected && !auth) {
    return <Navigate to='/login' replace/>
  }

  if (!isProtected && auth) {
    return <Navigate to='/' replace/>
  }

  return element;
}
