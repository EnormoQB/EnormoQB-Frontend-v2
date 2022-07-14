import { Box, Flex } from '@chakra-ui/react';

const TopBorder = ({ borderH }) => (
  <Flex>
    <Box w='25%' h={borderH} bg='blue.400' />
    <Box w='25%' h={borderH} bg='blue.300' />
    <Box w='25%' h={borderH} bg='blue.200' />
    <Box w='25%' h={borderH} bg='blue.100' />
  </Flex>
);

export default TopBorder;
