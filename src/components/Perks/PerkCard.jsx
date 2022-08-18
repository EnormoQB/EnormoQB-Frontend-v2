import { Box, Flex, Image } from '@chakra-ui/react';
import { FaCoins } from 'react-icons/fa';

const PerkCard = (props) => {
  return (
    <Flex
      flexDirection='column'
      boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
      borderRadius='10'
      p='3'
      mr='6'
      mb='4'
    >
      <Flex flexDirection='column' alignItems='center' bgColor='brand.600'>
        <Image src={props.imgSrc} alt='Card header' h='32' w='72' />
        <Box pb='4' color='brand.100'>
          {props.imgTitle}
        </Box>
      </Flex>
      <Flex justifyContent='space-between' alignItems='center' mt='3'>
        <Flex flexDirection='column'>
          <Box fontSize='sm'>{props.perkHeading}</Box>
          <Box fontSize='xs' w='48' color='gray.500'>
            {props.perkSubHeading}
          </Box>
        </Flex>
        <Flex
          px='3'
          py='2'
          alignItems='center'
          borderRadius='8'
          bgColor='blue.400'
          _hover={{ cursor: 'pointer', bgColor: 'blue.300' }}
          color='brand.100'
        >
          <Box mr='2'>{props.coins}</Box>
          <FaCoins />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PerkCard;
