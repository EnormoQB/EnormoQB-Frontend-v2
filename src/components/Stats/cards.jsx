import { Flex } from '@chakra-ui/react';
// import { HiOutlineDocumentText } from 'react-icons/hi';

const Cards = ({ background, color, number, comment, iconcolor, iconused }) => {
  return (
    <Flex
      h='130px'
      w='22%'
      bgColor={background}
      color={color}
      borderRadius='20px'
      flexDir='column'
      boxShadow='0 4px 12px #00000022'
    >
      <Flex
        h='130px'
        alignItems='center'
        flexDir='row'
        justifyContent='space-around'
      >
        <Flex alignItems='center' justifyContent='flex-start' flexDir='column'>
          <Flex fontSize='30px'>
            <strong>{number}</strong>
          </Flex>
          <Flex>{comment}</Flex>
        </Flex>
        <Flex
          bgColor={iconcolor}
          h='50px'
          w='50px'
          alignItems='center'
          justifyContent='space-evenly'
          borderRadius='10px'
        >
          {iconused}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Cards;
