import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetUserDataQuery } from '../redux/services/userApi';
import FullScreenLoader from '../components/Loaders/FullScreenLoader';

const allowedRoutes = {
  admin: [
    '/dashboard',
    '/dashboard/pending',
    '/dashboard/contribute',
    '/dashboard/generate',
    '/dashboard/questionpapers',
    '/dashboard/requestContributions',
  ],
  member: [
    '/dashboard',
    '/dashboard/pending',
    '/dashboard/approved',
    '/dashboard/rejected',
    '/dashboard/contribute',
    '/dashboard/questionpapers',
    '/dashboard/perks',
  ],
  developer: [
    '/dashboard',
    '/dashboard/pending',
    '/dashboard/approved',
    '/dashboard/rejected',
    '/dashboard/contribute',
    '/dashboard/generate',
    '/dashboard/questionpapers',
    '/dashboard/perks',
    '/dashboard/requestContributions',
  ],
};

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const user = useSelector((state) => state.userState.user);
  const { isLoading, isFetching } = useGetUserDataQuery(null, { skip: false });

  if (isLoading || isFetching) {
    return <FullScreenLoader />;
  }

  return user &&
    allowedRoutes[user.userType.toLowerCase()].includes(location.pathname) ? (
    children
  ) : (
    <Navigate to='/' state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
