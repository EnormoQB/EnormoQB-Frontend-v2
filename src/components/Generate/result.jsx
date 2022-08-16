import { useCallback, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Box, Flex, Text } from '@chakra-ui/react';
import CustomQuestion from './customQues';
import QuestionTab from './questionTab';

const GenerateResult = ({ data }) => {
  const formDetails = useSelector((state) => state.generateState.generateForm);
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
            {formDetails.instituteName}
          </Text>
          <Text as='h2' fontSize='lg' fontWeight='500'>
            Class {formDetails.standard} : {formDetails.examType}
          </Text>
          <Text as='h2' fontSize='lg' fontWeight='500'>
            {formDetails.subject}
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
            {formDetails.totalMarks}
          </Text>
        </Flex>
        <Box mt='3'>
          <Text as='p' fontSize='md' fontWeight='500'>
            Exam Instructions:
          </Text>
          <Text as='p' sx={{ whiteSpace: 'pre' }} fontSize='15px'>
            {formDetails.instructions}
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
                  key={ques._id}
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
