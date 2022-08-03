import React from 'react';
import { Box, Image, Button, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import NotFoundGif from '../assets/404.gif';

const NotFound = () => {
  return (
    <Box
      bg='brand.100'
      w='full'
      h='100vh'
      borderRadius='16px'
      m='auto'
      boxShadow='dark-lg'
    >
      <Image
        src={NotFoundGif}
        alt='...Loading'
        h='70%'
        w='60%'
        minW='400px'
        outline='brand.100'
        m='auto'
      />
      <VStack spacing={8} mt={4} textAlign='center'>
        <Text fontSize='xl' color='brand.500'>
          Sorry, looks like the page you are looking for <br /> could not be
          found!
        </Text>
        <Link to='/dashboard'>
          <Button>Back To Home</Button>
        </Link>
      </VStack>
    </Box>
  );
};

export default NotFound;
