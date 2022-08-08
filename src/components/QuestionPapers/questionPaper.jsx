import { Box, Flex, IconButton, Text, Tooltip } from '@chakra-ui/react';
import { RiFileDownloadFill } from 'react-icons/ri';
import { BsBoxArrowInRight } from 'react-icons/bs';
import Tag from './tag';
import TagDivider from '../Accordion/Tags/divider';

const QuesPaper = ({ data }) => {
  return (
    <Flex
      px='5'
      py='6'
      borderRadius='10'
      bg='brand.100'
      boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
      role='group'
      my='4'
    >
      <Box w='75%'>
        <Text as='h2' fontWeight='600' fontSize='lg'>
          {data.title}
        </Text>
        <Flex wrap='wrap' mt='2.5' alignItems='center'>
          <Tag content={data.instituteName} />
          <TagDivider />
          <Tag content={data.examType} />
          <TagDivider />
          <Tag content={data.board} />
          <TagDivider />
          <Tag content={data.class} />
          <TagDivider />
          <Tag content={data.subject} />
          <TagDivider />
          <Tag content={`${data.totalMarks} Marks`} />
          <TagDivider />
          <Tag content={`${data.totalTime} Hours`} />
        </Flex>
      </Box>
      <Flex ml='auto' alignItems='center'>
        <Tooltip label='Preview' fontSize='xs'>
          <IconButton
            aria-label='Preview question paper'
            fontSize='22px'
            icon={<BsBoxArrowInRight />}
            bg='brand.100'
            color='brand.600'
            _hover={{ backgroundColor: 'brand.400' }}
            transition='opacity ease-in-out 200ms'
            mr='4'
          />
        </Tooltip>
        <Tooltip label='Download' fontSize='xs'>
          <IconButton
            aria-label='Download question paper'
            fontSize='22px'
            icon={<RiFileDownloadFill />}
            bg='brand.100'
            color='brand.600'
            _hover={{ backgroundColor: 'brand.400' }}
            transition='opacity ease-in-out 200ms'
            mr='4'
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default QuesPaper;
