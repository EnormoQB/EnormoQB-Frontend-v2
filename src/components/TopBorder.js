import { Box, Flex } from '@chakra-ui/react';

const TopBorder = () => (
  <Flex>
    <Box w='25%' h='0.5rem' bg='blue.400' />
    <Box w='25%' h='0.5rem' bg='blue.300' />
    <Box w='25%' h='0.5rem' bg='blue.200' />
    <Box w='25%' h='0.5rem' bg='blue.100' />
  </Flex>
);

export default TopBorder;
