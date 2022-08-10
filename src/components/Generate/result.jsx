import { useCallback, useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Box, Flex, Text } from '@chakra-ui/react';
import CustomQuestion from './customQues';
import QuestionTab from './questionTab';
import { dummy } from './config';

const GenerateResult = ({ data }) => {
  const [initialData, setInitialData] = useState([]);
  const [isDragging, setIsDragging] = useState(null);

  useEffect(() => {
    console.log(data);
    if (data && data.data && data.data.length !== 0) {
      setInitialData(data.data);
    }
  }, [data]);

  const handleOnDragStart = (e) => {
    setIsDragging(e.source.index);
  };

  const handleOnDragEnd = (result) => {
    setIsDragging(null);
    if (!result.destination) return;
    if (result.destination.index === result.source.index) {
      return;
    }
    const items = Array.from(initialData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setInitialData(items);
  };

  const handleDelete = useCallback((idx) => {
    console.log('delete running');
    setInitialData((prev) => prev.filter((item, index) => idx !== index));
  }, []);

  return (
    <Box>
      <CustomQuestion />
      <Box mt='6' mb='6'>
        <Box textAlign='center'>
          <Text as='h2' fontSize='xl' fontWeight='500'>
            Central Board of Secondary Education
          </Text>
          <Text as='h2' fontSize='lg' fontWeight='500'>
            Class XII : Finals 2021-22
          </Text>
          <Text as='h2' fontSize='lg' fontWeight='500'>
            Mathematics
          </Text>
        </Box>
        <Flex justify='space-between' alignItems='center' mt='3'>
          <Text as='p' fontSize='md'>
            <Text as='span' fontWeight='500'>
              Time allowed:&nbsp;
            </Text>
            3 hours
          </Text>
          <Text as='p' fontSize='md'>
            <Text as='span' fontWeight='500'>
              Maximum Marks:&nbsp;
            </Text>
            3 hours
          </Text>
        </Flex>
        <Box mt='3'>
          <Text as='p' fontSize='md' fontWeight='500'>
            Exam Instructions:
          </Text>
          <Text as='p' sx={{ whiteSpace: 'pre' }} fontSize='15px'>
            {
              '1. Section A includes 10 questions for 1 mark each.\n2. Section B includes 6 questions for 3 marks each.\n3. Section C includes 4 questions for 5 marks each.'
            }
          </Text>
        </Box>
      </Box>
      <DragDropContext
        onDragEnd={handleOnDragEnd}
        onDragStart={handleOnDragStart}
      >
        <Droppable droppableId='list'>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {initialData.map((ques, idx) => (
                <QuestionTab
                  key={ques._id.$oid}
                  index={idx}
                  data={ques}
                  isDragging={isDragging}
                  onDelete={() => handleDelete(idx)}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default GenerateResult;
