import { Box, Flex } from '@chakra-ui/react';
import { BsCheckCircleFill } from 'react-icons/bs';

const Option = ({ choice, option, answer }) => {
  return (
    <Flex my='1.5'>
      <BsCheckCircleFill
        size='1.5rem'
        visibility={option === answer ? 'visible' : 'hidden'}
      />
      <Box ml='3'>{choice}</Box>
      <Box ml='2' w='90%'>
        {option}
      </Box>
    </Flex>
  );
};

export default Option;
