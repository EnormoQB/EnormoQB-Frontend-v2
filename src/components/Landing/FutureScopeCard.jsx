import { Flex, Box } from '@chakra-ui/react';

const FutureScopeCard = ({ heading, content }) => {
  return (
    <Flex
      flexDir='column'
      w='40%'
      p='14'
      mx='4'
      my='6'
      bgColor='white'
      borderColor='gray.100'
      borderWidth='thin'
      borderRadius='lg'
    >
      <Box
        bg='brand.200'
        w='fit-content'
        p='2'
        fontSize='xs'
        color='brand.500'
        borderRadius='md'
      >
        COMING SOON
      </Box>
      <Box fontSize='xl' fontWeight='bold' my='6' color='brand.500'>
        {heading}
      </Box>
      <Box>{content}</Box>
    </Flex>
  );
};

export default FutureScopeCard;
