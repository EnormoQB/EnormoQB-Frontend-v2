import { Flex, Icon, Menu, MenuButton, Text } from '@chakra-ui/react';

const NavItems = ({ isNavOpen, title, icon, active, headProps, onClick }) => {
  return (
    <Flex
      mb='2'
      direction='column'
      w='100%'
      alignItems={!isNavOpen ? 'center' : 'flex-start'}
      px={!isNavOpen ? '2' : '4'}
      py='2.5'
      bg={active ? 'myGray.500' : 'none'}
      _hover={{ backgroundColor: 'myGray.500' }}
      {...headProps}
      onClick={onClick}
    >
      <Menu placement='right'>
        <MenuButton>
          <Flex align='center'>
            <Icon
              as={icon}
              fontSize='20px'
              color='white'
              alignItems={!isNavOpen ? 'center' : 'flex-start'}
            />
            <Text ml='4' display={isNavOpen ? 'flex' : 'none'}>
              {title}
            </Text>
          </Flex>
        </MenuButton>
      </Menu>
    </Flex>
  );
};

export default NavItems;
