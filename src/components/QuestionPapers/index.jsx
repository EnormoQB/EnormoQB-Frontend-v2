import { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  IconButton,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Tag from './tag';
import TagDivider from '../QuestionAccordion/Tags/divider';
import DifficultyTag from '../QuestionAccordion/Tags/difficulty';

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
          <Tag content={data.board} />
          <TagDivider />
          <Tag content={`Class ${data.standard}`} />
          <TagDivider />
          <Tag content={data.subject} />
          <TagDivider />
          <Tag content={`${marks} Marks`} />
          <TagDivider />
          <Tag content={`${data.time} Minutes`} />
          <TagDivider />
          <DifficultyTag
            content={data.status}
            bgColor={
              data.status.toLowerCase() === 'completed'
                ? 'brand.400'
                : 'orange.100'
            }
          />
        </Flex>
      </Box>
      <Flex ml='auto' alignItems='center'>
        {data.status.toLowerCase() === 'completed' && (
          <Menu>
            <MenuButton
              fontSize='22px'
              bg='brand.100'
              color='brand.600'
              _hover={{ backgroundColor: 'brand.400' }}
              transition='opacity ease-in-out 200ms'
              as={IconButton}
              aria-label='Preview Options'
              icon={<BsThreeDotsVertical />}
            />
            <MenuList>
              <MenuItem
                onClick={() => {
                  const linkElement = document.createElement('a');
                  linkElement.href = `${process.env.REACT_APP_SERVER_URL}/api/assets/${data.questionKey}`;
                  linkElement.target = '_blank';
                  linkElement.click();
                  linkElement.remove();
                }}
              >
                Preview Question Paper
              </MenuItem>
              <MenuItem
                onClick={() => {
                  const linkElement = document.createElement('a');
                  linkElement.href = `${process.env.REACT_APP_SERVER_URL}/api/assets/${data.answerKey}`;
                  linkElement.target = '_blank';
                  linkElement.click();
                  linkElement.remove();
                }}
              >
                Preview Answer Key
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>
    </Flex>
  );
};

export default QuesPaper;
