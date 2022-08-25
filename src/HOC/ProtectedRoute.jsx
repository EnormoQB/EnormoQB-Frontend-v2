import { Navigate, useLocation } from 'react-router-dom';
import { userApi } from '../redux/services/userApi';
import FullScreenLoader from '../components/Loaders/FullScreenLoader';
import { useGetSubjectsQuery } from '../redux/services/subjectApi';

const allowedRoutes = {
  reviewer: [
    '/dashboard',
    '/dashboard/pending',
    '/dashboard/contribute',
    '/dashboard/generate',
    '/dashboard/questionpapers',
    '/dashboard/requestContributions',
  ],
  'exam-setter': [
    '/dashboard',
    '/dashboard/pending',
    '/dashboard/contribute',
    '/dashboard/generate',
    '/dashboard/questionpapers',
    '/dashboard/requestContributions',
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
  ],
};

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  const { isLoading, isFetching } = userApi.endpoints.getUserData.useQuery(
    null,
    { skip: false },
  );
  const {
    isLoading: isSubjectsDataLoading,
    isFetching: isSubjectsDataFetching,
  } = useGetSubjectsQuery();

  const user = userApi.endpoints.getUserData.useQueryState(null, {
    selectFromResult: ({ data }) => data,
  });

  if (
    isLoading ||
    isFetching ||
    isSubjectsDataLoading ||
    isSubjectsDataFetching
  ) {
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
