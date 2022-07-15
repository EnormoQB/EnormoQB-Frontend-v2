import { Box, Spinner, Container } from '@chakra-ui/react';

const FullScreenLoader = () => {
  return (
    <Container sx={{ height: '95vh' }}>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        sx={{ height: '100%' }}
      >
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='brand.100'
          color='brand.500'
          size='xl'
        />
      </Box>
    </Container>
  );
};

export default FullScreenLoader;
