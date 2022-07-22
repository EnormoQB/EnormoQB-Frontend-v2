import { Flex } from '@chakra-ui/react';

const Cards = ({ background, number, comment, iconColor, iconUsed }) => {
  return (
    <Flex
      h='130px'
      w='22%'
      bgColor={background}
      color={background === 'brand.600' ? 'brand.100' : 'brand.600'}
      borderRadius='xl'
      flexDir='column'
      boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
    >
      <Flex
        h='130px'
        alignItems='center'
        flexDir='row'
        justifyContent='space-between'
        p='4'
      >
        <Flex justifyContent='flex-start' flexDir='column'>
          <Flex fontSize='xl' fontWeight='semibold'>
            {number}
          </Flex>
          <Flex
            fontSize='sm'
            my='1'
            color={background === 'brand.600' ? 'brand.100' : 'gray.500'}
          >
            {comment}
          </Flex>
        </Flex>
        <Flex
          bgColor={iconColor}
          h='50px'
          w='50px'
          color='brand.100'
          alignItems='center'
          justifyContent='space-evenly'
          borderRadius='10px'
          ml='4'
        >
          {iconUsed}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Cards;
