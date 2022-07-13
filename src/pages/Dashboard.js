import { Flex, Box } from '@chakra-ui/react';

const Dashboard = () => {
  return (
    <div>
      <Flex>
        <Box color='brand.600' w='300px' />
        <Flex grow>
          <Box color='brand.100' />
        </Flex>
      </Flex>
    </div>
  );
};

export default Dashboard;
