import { Box, Flex } from '@chakra-ui/react';

const ActivityCard = (props) => {
  return (
    <Flex
      boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
      borderRadius='10'
      bgColor='brand.100'
      p='2'
      mt='2'
    >
      {props.activityIcon}
      <Flex flexDirection='column' ml='2'>
        <Box fontSize='sm'>{props.heading}</Box>
        <Box fontSize='xs' w='48' color='gray.500'>
          {props.activityDate}
        </Box>
      </Flex>
    </Flex>
  );
};

export default ActivityCard;
