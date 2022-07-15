import { Button, Flex, Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../../redux/services/userApi';
import Logo from '../../assets/mainLogo.svg';

const NavBar = ({
  executeProcessScroll,
  executeAboutScroll,
  executeFooterScroll,
}) => {
  const navigate = useNavigate();
  const { data, isLoading, isFetching } =
    userApi.endpoints.getUserData.useQuery(null, {
      skip: false,
      refetchOnMountOrArgChange: true,
    });
  return (
    <Flex mx='32' my='4' justifyContent='space-between' alignItems='center'>
      <img src={Logo} style={{ height: '5rem', width: '12rem' }} alt='Logo' />
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
    </Flex>
  );
};

export default NavBar;
