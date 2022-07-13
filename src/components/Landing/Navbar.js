import { Button, Flex, Box } from '@chakra-ui/react';

const NavBar = ({
  executeProcessScroll,
  executeAboutScroll,
  executeFooterScroll,
}) => (
  <Flex mx='32' my='4' justifyContent='space-between' alignItems='center'>
    <img
      src='/assets/mainLogo.svg'
      style={{ height: '5rem', width: '12rem' }}
      alt='Logo'
    />
    <Flex alignItems='center'>
      <Box
        mr={['1', '4', '12']}
        fontWeight='bold'
        cursor='pointer'
        _hover={{ color: 'blue.400' }}
        onClick={executeProcessScroll}
      >
        Process Flow
      </Box>
      <Box
        mr={['1', '4', '12']}
        fontWeight='bold'
        cursor='pointer'
        _hover={{ color: 'blue.400' }}
        onClick={executeAboutScroll}
      >
        About Us
      </Box>
      <Box
        mr={['1', '4', '12']}
        fontWeight='bold'
        cursor='pointer'
        _hover={{ color: 'blue.400' }}
      >
        Contact Us
      </Box>
      <Button>Login</Button>
    </Flex>
  </Flex>
);

export default NavBar;
