import { Navigate, useLocation } from 'react-router-dom';
import { userApi } from '../redux/services/userApi';
import FullScreenLoader from '../components/Loaders/FullScreenLoader';

const allowedRoutes = {
  reviewer: [
    '/dashboard',
    '/dashboard/pending',
    '/dashboard/approved',
    '/dashboard/rejected',
    '/dashboard/contribute',
    '/dashboard/generate',
    '/dashboard/questionpapers',
    '/dashboard/requestContributions',
    '/dashboard/custom',
  ],
  'exam-setter': [
    '/dashboard',
    '/dashboard/pending',
    '/dashboard/approved',
    '/dashboard/rejected',
    '/dashboard/contribute',
    '/dashboard/generate',
    '/dashboard/questionpapers',
    '/dashboard/requestContributions',
    '/dashboard/custom',
  ],
  contributor: [
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
    '/dashboard/custom',
  ],
};

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  const { isLoading, isFetching } = userApi.endpoints.getUserData.useQuery(
    null,
    { skip: false },
  );

  const user = userApi.endpoints.getUserData.useQueryState(null, {
    selectFromResult: ({ data }) => data,
  });

  if (isLoading || isFetching) {
    return <FullScreenLoader />;
  }

  return user &&
    allowedRoutes[user.userType.role.toLowerCase()].includes(
      location.pathname,
    ) ? (
    children
  ) : (
    <Navigate to='/' state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
