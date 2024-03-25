import { Navigate } from 'react-router-dom';
import { RoutingConstraints } from './constraints';
import AppLayout from '../layout';

interface PrivateRouteProps {
  isAuthenticated: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuthenticated }) => {
  const isAuthenticate = !!localStorage.getItem('token');

  if (!isAuthenticate) {
    return <Navigate to={RoutingConstraints.INDEX} />;
  }
  return <AppLayout />;
};

export { PrivateRoute };
