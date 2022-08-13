import { Box, Spinner } from '@chakra-ui/react';

const DashboardLoader = (height) => {
  return (
    <Box display='flex' alignItems='center' justifyContent='center' sx={height}>
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='brand.100'
        color='brand.500'
        size='xl'
      />
    </Box>
  );
};

export default DashboardLoader;

DashboardLoader.defaultProps = {
  height: 'calc(100vh - 64px)',
};
