import { Flex, Icon, Menu, MenuButton, Text, Tooltip } from '@chakra-ui/react';

const Wrapper = ({ children, title }) => {
  if (title)
    return (
      <Tooltip label={title} placement='right'>
        {children}
      </Tooltip>
    );
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

const NavItems = ({ isNavOpen, title, icon, active, headProps, onClick }) => {
  return (
    <Wrapper title={isNavOpen ? null : title}>
      <Flex
        mb='2'
        direction='column'
        w='100%'
        alignItems={!isNavOpen ? 'center' : 'flex-start'}
        px={!isNavOpen ? '2' : '5'}
        py='2.5'
        bg={active ? 'myGray.500' : 'none'}
        _hover={{ backgroundColor: 'myGray.500' }}
        cursor='pointer'
        {...headProps}
        onClick={onClick}
      >
        <Menu placement='right'>
          <MenuButton>
            <Flex align='center'>
              <Icon
                as={icon}
                fontSize='21px'
                color='white'
                alignItems={!isNavOpen ? 'center' : 'flex-start'}
              />
              <Text
                ml='4'
                fontSize='15px'
                display={isNavOpen ? 'flex' : 'none'}
              >
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Menu>
      </Flex>
    </Wrapper>
  );
};

export default NavItems;
