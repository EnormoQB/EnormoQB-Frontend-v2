import { Flex } from '@chakra-ui/react';
import TagDivider from './divider';

const Tag = ({ content, isExpanded }) => {
  return (
    <Flex
      color={isExpanded ? 'brand.100' : 'gray.500'}
      fontSize='xs'
      fontWeight='400'
      alignItems='center'
    >
      {content}
      <TagDivider />
    </Flex>
  );
};

export default Tag;
