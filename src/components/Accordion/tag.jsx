import { Flex } from '@chakra-ui/react';

const Tag = ({ content, isExpanded }) => {
  return (
    <Flex
      bgColor={isExpanded ? 'brand.300' : 'brand.400'}
      color={isExpanded ? 'brand.600' : 'brand.600'}
      // bgColor='brand.400'
      // color='brand.600'
      fontSize='sm'
      fontWeight='400'
      py='1'
      px='1.5'
      ml='2'
      mt='1'
      borderRadius='md'
    >
      {content}
    </Flex>
  );
};

export default Tag;
