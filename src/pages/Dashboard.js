import { Flex, Box } from '@chakra-ui/react';
import Sidebar from '../components/Sidebar';

const Dashboard = () => (
  <Flex bg='brand.100' w='100%' direction='row'>
    <Box position='relative'>
      <Sidebar />
    </Box>
    <Box overflowY='auto' w='full' h='100vh' p='6'>
      <Box bg='brand.600' h='150px' w='full' my='3' />
      <Box bg='brand.500' h='150px' w='full' my='3' />
      <Box bg='brand.600' h='150px' w='full' my='3' />
      <Box bg='brand.500' h='150px' w='full' my='3' />
      <Box bg='brand.600' h='150px' w='full' my='3' />
      <Box bg='brand.500' h='150px' w='full' my='3' />
      <Box bg='brand.600' h='150px' w='full' my='3' />
      <Box bg='brand.500' h='150px' w='full' my='3' />
      <Box bg='brand.600' h='150px' w='full' my='3' />
      <Box bg='brand.500' h='150px' w='full' my='3' />
      <Box bg='brand.600' h='150px' w='full' my='3' />
      <Box bg='brand.500' h='150px' w='full' my='3' />
      <Box bg='brand.600' h='150px' w='full' my='3' />
      <Box bg='brand.500' h='150px' w='full' my='3' />
    </Box>
  </Flex>
);

export default Dashboard;
