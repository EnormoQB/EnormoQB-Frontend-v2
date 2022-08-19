import { useEffect, useState } from 'react';
import { Box, Flex, IconButton, Text, Tooltip } from '@chakra-ui/react';
import { RiFileDownloadFill } from 'react-icons/ri';
import { BsBoxArrowInRight } from 'react-icons/bs';
import Tag from './tag';
import TagDivider from '../QuestionAccordion/Tags/divider';

const QuesPaper = ({ data }) => {
  const [marks, setMarks] = useState(0);

  useEffect(() => {
    if (data) {
      const EasyQues = ((data || {}).quesDiffDetails || {}).Easy;
      const EasyCount = (EasyQues || {}).count;
      const EasyMarks = (EasyQues || {}).marks;

      const MediumQues = ((data || {}).quesDiffDetails || {}).Medium;
      const MediumCount = (MediumQues || {}).count;
      const MediumMarks = (MediumQues || {}).marks;

      const HardQues = ((data || {}).quesDiffDetails || {}).Hard;
      const HardCount = (HardQues || {}).count;
      const HardMarks = (HardQues || {}).marks;

      setMarks(
        EasyCount * EasyMarks +
          MediumCount * MediumMarks +
          HardCount * HardMarks,
      );
    }
  }, []);

  return (
    <Flex
      px='6'
      py='4'
      borderRadius='10'
      bg='brand.100'
      boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
      role='group'
      my='2'
    >
      <Box w='75%'>
        <Text as='h2' fontWeight='600' fontSize='lg'>
          {data.name}
        </Text>
        <Flex wrap='wrap' mt='2.5' alignItems='center'>
          <Tag content={data.instituteName} />
          <TagDivider />
          <Tag content={data.examType || <span>Board Exam</span>} />
          <TagDivider />
          <Tag content={data.board} />
          <TagDivider />
          <Tag content={data.standard} />
          <TagDivider />
          <Tag content={data.subject} />
          <TagDivider />
          <Tag content={`${marks} Marks`} />
          <TagDivider />
          <Tag content={`${data.time} Minutes`} />
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
            onClick={() => {
              const linkElement = document.createElement('a');
              linkElement.href = `${process.env.REACT_APP_SERVER_URL}/api/assets/${data.questionKey}`;
              linkElement.click();
            }}
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
            onClick={() => {
              const linkElement = document.createElement('a');
              linkElement.href = `${process.env.REACT_APP_SERVER_URL}/api/assets/${data.answerKey}`;
              linkElement.click();
            }}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default QuesPaper;
