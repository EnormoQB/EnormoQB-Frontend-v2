import { Flex } from '@chakra-ui/react';

const DifficultyTag = ({ content, isExpanded }) => {
  return (
    <Flex
      bgColor={isExpanded ? 'brand.600' : 'brand.400'}
      color={isExpanded ? 'brand.100' : 'brand.600'}
      fontSize='xs'
      fontWeight='400'
      py='1'
      px='1.5'
      mr='2'
      borderRadius='md'
    >
      {content}
    </Flex>
  );
};

export default DifficultyTag;
