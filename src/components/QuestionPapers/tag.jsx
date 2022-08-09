import { Flex } from '@chakra-ui/react';

const Tag = ({ content }) => {
  return (
    <Flex color='gray.500' fontSize='xs' fontWeight='400' alignItems='center'>
      {content}
    </Flex>
  );
};

export default Tag;
