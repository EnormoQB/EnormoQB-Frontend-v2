import { Box, Flex, Text } from '@chakra-ui/react';

const SimilarQuestion = ({ data }) => {
  return (
    <Flex
      px='6'
      py='4'
      my='3'
      borderRadius='10'
      bg='brand.100'
      boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
      role='group'
    >
      <Box w='100%'>
        <Text as='h3' fontWeight='semibold' fontSize='17px' mr='2'>
          {`Q. ${data.question}`}
        </Text>
        <Flex wrap='wrap' mt='2.5'>
          {data.options.map((option, idx) => (
            <Text key={option} as='p' mr='2' mb='2' w='45%'>
              {`${String.fromCharCode(idx + 65)}. ${option}`}
            </Text>
          ))}
        </Flex>
      </Box>
    </Flex>
  );
};

export default SimilarQuestion;
