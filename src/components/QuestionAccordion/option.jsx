import { Flex, Text } from '@chakra-ui/react';
import { BsCheckCircleFill } from 'react-icons/bs';

const Option = ({ index, option, isAnswer }) => {
  return (
    <Flex my='1.5'>
      <Text>{`${String.fromCharCode(65 + index)}. ${option}`}</Text>
      <BsCheckCircleFill
        size='1.5rem'
        style={{ marginLeft: '0.7rem' }}
        visibility={isAnswer ? 'visible' : 'hidden'}
      />
    </Flex>
  );
};

export default Option;
