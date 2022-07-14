import { useState, useCallback, useEffect } from 'react';
import {
  Avatar,
  Divider,
  Flex,
  Heading,
  IconButton,
  Text,
  Image,
  Tooltip,
  Box,
  Kbd,
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdOutlineLogout } from 'react-icons/md';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import NavItems from './NavItems';
import { navItems } from './config';
import LogoWhite from '../../assets/mainLogoWhite.svg';
import LogoIcon from '../../assets/favicon.svg';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const handleDrawer = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const onEscape = (e) => {
      if (e.which === 27) handleDrawer();
    };

    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('keydown', onEscape);
    };
  }, []);

  return (
    <Flex
      h='100vh'
      w={!isOpen ? '75px' : '300px'}
      transition='width 300ms'
      boxShadow='0 4px 12px 0 rgba(0,0,0,0.05)'
      flexDir='column'
      justifyContent='space-between'
      bg='brand.600'
      color='white'
      py='7'
      overflow='hidden'
    >
      <Flex
        flexDir='column'
        alignItems={!isOpen ? 'center' : 'flex-start'}
        as='nav'
        grow='1'
      >
        <Flex w='100%' px={!isOpen ? '2' : '5'}>
          <Image
            w='80%'
            maxH='60px'
            src={isOpen ? LogoWhite : LogoIcon}
            alt='Logo'
            loading='eager'
          />
        </Flex>
        <Tooltip
          label={
            <span>
              Press&ensp;
              <Kbd color='brand.600'>Esc</Kbd>
              &ensp;to toggle
            </span>
          }
          fontSize='xs'
          bg='brand.600'
          placement={isOpen ? 'bottom' : 'right'}
        >
          <IconButton
            position='absolute'
            top='78px'
            right='0'
            transform='translateX(50%)'
            borderRadius='full'
            bg='brand.400'
            color='brand.600'
            boxShadow='0 4px 12px 0 rgba(0,0,0,0.1)'
            size='sm'
            fontSize='20px'
            icon={!isOpen ? <IoIosArrowForward /> : <IoIosArrowBack />}
            onClick={handleDrawer}
          />
        </Tooltip>
        <Box mt='12' w='100%'>
          {navItems.map((item) => (
            <NavItems
              key={item.id}
              isNavOpen={isOpen}
              icon={item.icon}
              title={item.name}
              active={`/dashboard${item.link}` === location.pathname}
              onClick={() => {
                navigate(`/dashboard${item.link}`);
              }}
            />
          ))}
        </Box>
        <NavItems
          isNavOpen={isOpen}
          icon={MdOutlineLogout}
          title='Logout'
          headProps={{ mt: 'auto' }}
          onClick={() => navigate(`/`)}
        />
      </Flex>
      <Flex
        pt='1'
        px={!isOpen ? '2' : '5'}
        flexDir='column'
        alignItems={!isOpen ? 'center' : 'flex-start'}
      >
        <Divider display={!isOpen ? 'none' : 'flex'} />
        <Flex mt={4} align='center'>
          <Box w='35px'>
            <Avatar size='full' src='' />
          </Box>
          <Flex flexDir='column' ml='4' display={!isOpen ? 'none' : 'flex'}>
            <Heading as='h2' fontSize='18px'>
              Enormo QB
            </Heading>
            <Text color='gray' fontSize='sm' mt='0.5'>
              Admin
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
