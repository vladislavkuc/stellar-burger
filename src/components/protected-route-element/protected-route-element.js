import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getNewAccessToken } from '../../services/api';
import { setCookie } from '../../services/utils';

export function ProtectedRouteElement({ element, isProtected }) {
  const [ auth, setAuth ] = useState(isProtected);

  useEffect(() => {
    if (localStorage.getItem('refreshToken')){
      getNewAccessToken({token: localStorage.getItem('refreshToken')})
        .then(res => {
          if (res.success) {
            setAuth(true);
            setCookie('token', res.accessToken.split('Bearer ')[1], { expires: 1200 });
            localStorage.setItem('refreshToken', res.refreshToken);
          }
          else { setAuth(false) }
        })
        .catch(err => console.log(err));
    } else {
      setAuth(false)
    }
  }, []);

  if (isProtected && !auth) {
    return <Navigate to='/login' replace/>
  }

  if (!isProtected && auth) {
    return <Navigate to='/' replace/>
  }

  return element;
}
