import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { userSelectors } from '../../services/slices/userSlice';
import { Preloader } from '../ui/preloader/preloader';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactNode;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const location = useLocation();
  const { selectUserData, selectIsAuthChecked } = userSelectors;
  const user = useSelector(selectUserData);
  const isAuthChecked = useSelector(selectIsAuthChecked);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
