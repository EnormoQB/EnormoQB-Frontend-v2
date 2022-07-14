import { Flex, Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

const Dashboard = () => {
  return (
    <Flex bg='brand.100' w='100%' direction='row'>
      <Box position='relative'>
        <Sidebar />
      </Box>
      <Box p='8'>
        <Outlet />
      </Box>
    </Flex>
  );
};

export default Dashboard;
