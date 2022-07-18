import { Navigate, useLocation } from 'react-router-dom';
import { userApi } from '../redux/services/userApi';
import FullScreenLoader from '../components/FullScreenLoader';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  const { isLoading, isFetching } = userApi.endpoints.getUserData.useQuery(
    null,
    { skip: false },
  );

  const loading = isLoading || isFetching;

  const user = userApi.endpoints.getUserData.useQueryState(null, {
    selectFromResult: ({ data }) => data,
  });

  if (loading) {
    return <FullScreenLoader />;
  }

  return user ? (
    children
  ) : (
    <Navigate to='/' state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
