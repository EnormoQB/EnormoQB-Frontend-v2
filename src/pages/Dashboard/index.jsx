import { Flex, Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import ProtectedRoute from '../../HOC/ProtectedRoute';

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <Flex bg='brand.100' w='100%' direction='row'>
        <Box position='relative'>
          <Sidebar />
        </Box>
        <Box
          pos='relative'
          overflowY='auto'
          w='full'
          h='100vh'
          // py='8'
          // px='12'
        >
          <Outlet />
        </Box>
      </Flex>
    </ProtectedRoute>
  );
};

export default Dashboard;
