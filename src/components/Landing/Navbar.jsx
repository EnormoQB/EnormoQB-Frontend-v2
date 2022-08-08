import {
  IconButton,
  Button,
  Flex,
  Box,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Image,
} from '@chakra-ui/react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../../redux/services/userApi';
import Logo from '../../assets/mainLogo.svg';

const NavBar = ({
  executeProcessScroll,
  executeAboutScroll,
  executeFooterScroll,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { data, isLoading, isFetching } =
    userApi.endpoints.getUserData.useQuery(null, {
      skip: false,
      refetchOnMountOrArgChange: true,
    });

  return (
    <Flex
      px={['8', '16', '20', '32']}
      my={['2', '4']}
      mb={['0', '0', '0', '0', '4']}
      justifyContent='space-between'
      alignItems='center'
      position='sticky'
      top='0'
      zIndex='10'
      bgColor='brand.100'
    >
      <Image
        src={Logo}
        h={['4rem', '5rem']}
        w={['10rem', '12rem']}
        alt='Logo'
      />
      <Flex alignItems='center' display={['none', 'none', 'flex']}>
        <Box
          mr={['1', '4', '4', '8', '12']}
          fontWeight='bold'
          cursor='pointer'
          _hover={{ color: 'blue.400' }}
          onClick={executeProcessScroll}
        >
          Process Flow
        </Box>
        <Box
          mr={['1', '4', '4', '8', '12']}
          fontWeight='bold'
          cursor='pointer'
          _hover={{ color: 'blue.400' }}
          onClick={executeAboutScroll}
        >
          About Us
        </Box>
        <Box
          mr={['1', '4', '4', '8', '12']}
          fontWeight='bold'
          cursor='pointer'
          _hover={{ color: 'blue.400' }}
          onClick={executeFooterScroll}
        >
          Contact Us
        </Box>
        {!data ? (
          <Button
            onClick={async () => {
              window.open(
                `${process.env.REACT_APP_SERVER_URL}/auth/google`,
                '_self',
              );
            }}
            isLoading={isFetching || isLoading}
          >
            Login
          </Button>
        ) : (
          <Button
            onClick={() => {
              navigate('/dashboard');
            }}
            isLoading={isFetching}
          >
            DashBoard
          </Button>
        )}
      </Flex>
      <IconButton
        aria-label='Search database'
        icon={<GiHamburgerMenu />}
        onClick={onOpen}
        display={['flex', 'flex', 'none']}
      />
      <Drawer
        placement='right'
        size='xs'
        onClose={onClose}
        isOpen={isOpen}
        returnFocusOnClose={false}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton top='4' _focus={{}} />
          <DrawerHeader borderBottomWidth='1px' color='brand.500'>
            EnormoQB
          </DrawerHeader>
          <DrawerBody>
            <Box
              mb='3'
              cursor='pointer'
              _hover={{ color: 'blue.400' }}
              onClick={() => {
                executeProcessScroll();
                onClose();
              }}
            >
              Process Flow
            </Box>
            <Box
              mb='3'
              cursor='pointer'
              _hover={{ color: 'blue.400' }}
              onClick={() => {
                executeAboutScroll();
                onClose();
              }}
            >
              About Us
            </Box>
            <Box
              mb='4'
              cursor='pointer'
              _hover={{ color: 'blue.400' }}
              onClick={() => {
                executeFooterScroll();
                onClose();
              }}
            >
              Contact Us
            </Box>
            {!data ? (
              <Button
                onClick={async () => {
                  window.open(
                    `${process.env.REACT_APP_SERVER_URL}/auth/google`,
                    '_self',
                  );
                }}
                isLoading={isFetching || isLoading}
              >
                Login
              </Button>
            ) : (
              <Button
                onClick={() => navigate('/dashboard')}
                isLoading={isFetching}
              >
                Dashboard
              </Button>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default NavBar;
