import React, { useState } from 'react';
import { Avatar, Divider, Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import { FaBars, FaBeer } from 'react-icons/fa';
import NavItems from './NavItems';

const Sidebar = () => {
  const [navSize, setNavSize] = useState('large');
  return (
    <Flex
      pos='sticky'
      left='0'
      h='98vh'
      marginTop='1vh'
      w={navSize === 'small' ? '75px' : '300px'}
      boxShadow='0 4px 12px 0 rgba(0,0,0,0.05)'
      flexDir='column'
      justifyContent='space-between'>
      <Flex
        p='5%'
        flexDir='column'
        alignItems={navSize === 'small' ? 'center' : 'flex-start'}
        as='nav'>
        <IconButton
          background='nonr'
          mt={5}
          _hover={{ background: 'none' }}
          icon={<FaBars color='black' />}
          onClick={() => {
            if (navSize === 'small') setNavSize('large');
            else setNavSize('small');
          }}
        />
        <NavItems navSize={navSize} icon={FaBeer} title='Dashboard1' key='1' />
        <NavItems navSize={navSize} icon={FaBeer} title='ContactU' active />
        <NavItems navSize={navSize} icon={FaBeer} title='Dashboard3' />
        <NavItems navSize={navSize} icon={FaBeer} title='Dashboard4' />
        <NavItems navSize={navSize} icon={FaBeer} title='Dashboard5' />
        <NavItems navSize={navSize} icon={FaBeer} title='Dashboard6' />
      </Flex>

      <Flex
        p='5%'
        flexDir='column'
        alignItems={navSize === 'small' ? 'center' : 'flex-start'}
        mb={4}>
        <Divider display={navSize === 'small' ? 'none' : 'flex'} />
        <Flex mt={4} align='center'>
          <Avatar size='md' src='' />
          <Flex flexDir='column' ml='4' display={navSize === 'small' ? 'none' : 'flex'}>
            <Heading as='h2' size='md'>
              Prakhar Sharma
            </Heading>
            <Text color='gray' size='sm'>
              Admin
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
