import { Flex } from '@chakra-ui/react';

const Tag = ({ content, isExpanded }) => {
  return (
    <Flex
      color={isExpanded ? 'brand.100' : 'gray.500'}
      fontSize='xs'
      fontWeight='400'
      p='1'
      mr='2'
      mt='1'
    >
      {content}
    </Flex>
  );
};

export default Tag;
