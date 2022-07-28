import {
  Box,
  Button,
  Divider,
  Flex,
  IconButton,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { Draggable } from 'react-beautiful-dnd';
import { MdDelete } from 'react-icons/md';
import { AiOutlineMenu } from 'react-icons/ai';

const QuestionTab = ({ data, index, isDragging }) => {
  return (
    <Draggable draggableId={data._id.$oid} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Flex
            px='5'
            py='6'
            borderRadius='10'
            bg='brand.100'
            boxShadow={
              isDragging === index ? 'rgba(0, 0, 0, 0.16) 0px 1px 4px' : ''
            }
            _hover={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px' }}
            role='group'
          >
            <Tooltip label='Drag to reorder'>
              <Box alignSelf='center' mr='6'>
                <AiOutlineMenu />
              </Box>
            </Tooltip>
            <Box w='75%'>
              <Text as='h3' fontWeight='semibold' fontSize='17px'>
                {`Q${index + 1}. ${data.question}`}
              </Text>
              <Flex wrap='wrap' mt='2.5'>
                {data.options.map((option, idx) => (
                  <Text key={option} as='p' mr='2' mb='2' w='45%'>
                    {`${String.fromCharCode(idx + 65)}. ${option}`}
                  </Text>
                ))}
              </Flex>
            </Box>
            <Flex ml='auto'>
              <Button
                bg='brand.400'
                color='brand.600'
                _hover={{ backgroundColor: 'brand.600', color: 'brand.100' }}
                _groupHover={{ opacity: 1 }}
                opacity='0'
                transition='opacity ease-in-out 200ms'
                mr='2'
              >
                Switch
              </Button>
              <Tooltip label='Delete' fontSize='xs'>
                <IconButton
                  aria-label='Delete question'
                  fontSize='22px'
                  icon={<MdDelete />}
                  bg='brand.100'
                  color='brand.600'
                  _hover={{ backgroundColor: 'brand.400' }}
                  _groupHover={{ opacity: 1 }}
                  opacity='0'
                  transition='opacity ease-in-out 200ms'
                />
              </Tooltip>
            </Flex>
          </Flex>
          <Divider colorScheme='brand.600' orientation='horizontal' />
        </div>
      )}
    </Draggable>
  );
};

export default QuestionTab;
