import { Flex } from '@chakra-ui/react';
import { HiOutlineDocumentText } from 'react-icons/hi';

const Cards = ({ background, number, comment, iconcolor, iconused }) => {
  return (
    <Flex
      h='130px'
      w='22%'
      bgColor={background}
      color={background === 'brand.600' ? 'brand.100' : 'brand.600'}
      borderRadius='xl'
      flexDir='column'
      boxShadow='0 4px 12px #00000022'
    >
      <Flex
        h='130px'
        alignItems='center'
        flexDir='row'
        justifyContent='space-around'
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
          bgColor={iconcolor}
          h='50px'
          w='50px'
          color='brand.100'
          alignItems='center'
          justifyContent='space-evenly'
          borderRadius='10px'
          m='4'
        >
          {iconused}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Cards;
