import React from 'react';
// import { Flex, Icon, IconButton, Menu, MenuButton, Text } from '@chakra-ui/react';
import { Flex, Icon, Menu, MenuButton } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { FaBeer } from 'react-icons/fa';

const NavItems = (navSize, title, icon, active) => (
  <Flex
    mt={30}
    flexDir='column'
    w='100%'
    alignItems={navSize === 'small' ? 'center' : 'flex-start'}>
    <Menu placement='right'>
      <Link
        to='/'
        backgroundColor={active && '#AEC8CA'}
        p={3}
        borderRadius={8}
        _hover={{ textDecor: 'none', backgroundColor: '#AEC8CA' }}
        w={navSize === 'large' && '100%'}>
        <MenuButton w='100%'>
          <Flex>
            <Icon
              as={icon}
              fontSize='xl'
              color={active ? '#000000' : '#gray.500'}
              alignItems={navSize === 'small' ? 'center' : 'flex-start'}
            />
          </Flex>
        </MenuButton>
      </Link>
    </Menu>
  </Flex>
);

export default NavItems;
