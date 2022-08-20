import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetUserDataQuery } from '../redux/services/userApi';
import FullScreenLoader from '../components/Loaders/FullScreenLoader';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const user = useSelector((state) => state.userState.user);
  const { isLoading, isFetching } = useGetUserDataQuery(null, { skip: false });

  if (isLoading || isFetching) {
    return <FullScreenLoader />;
  }

  return user ? (
    children
  ) : (
    <Navigate to='/' state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
