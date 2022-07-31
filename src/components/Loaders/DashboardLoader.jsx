import { Box, Spinner } from '@chakra-ui/react';

const FullScreenLoader = () => {
  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      h='calc(100vh - 64px)'
    >
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

export default FullScreenLoader;
