import { Box, Spinner } from '@chakra-ui/react';

const OverlayLoader = () => {
  return (
    <Box
      pos='fixed'
      top='0px'
      right='0px'
      display='flex'
      alignItems='center'
      justifyContent='center'
      zIndex='10000000'
      bgColor='myGray.500'
      opacity='0.4'
      filter='alpha(opacity=40)'
      h='100%'
      w='100%'
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

export default OverlayLoader;
