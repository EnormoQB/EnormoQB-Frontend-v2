import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Box, Flex, Text } from '@chakra-ui/react';
import CustomQuestion from './customQues';
import QuestionTab from './questionTab';
import { setPreviewData } from '../../redux/features/generateSlice';

const GenerateResult = () => {
  const formDetails = useSelector((state) => state.generateState.generateForm);
  const previewData = useSelector((state) => state.generateState.previewData);
  const dispatch = useDispatch();
  const [isDragging, setIsDragging] = useState(null);

  const handleOnDragStart = (e) => {
    setIsDragging(e.source.index);
  };

  const handleOnDragEnd = (result) => {
    setIsDragging(null);
    if (!result.destination) return;
    if (result.destination.index === result.source.index) {
      return;
    }
    const items = Array.from(previewData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    dispatch(setPreviewData(items));
  };

  const handleDelete = useCallback(
    (idx) => {
      console.log(previewData, idx);
      dispatch(
        setPreviewData(previewData.filter((item, index) => idx !== index)),
      );
    },
    [previewData],
  );

  const addCustomQues = (data) => {
    const newArray = Array.from(previewData);
    newArray.unshift(data);
    dispatch(setPreviewData(newArray));
  };

  return (
    <Box>
      <CustomQuestion addQues={addCustomQues} />
      <Box mt='6' mb='6'>
        {formDetails && (
          <Box textAlign='center'>
            {formDetails.instituteName && (
              <Text as='h2' fontSize='xl' fontWeight='500'>
                {formDetails.instituteName}
              </Text>
            )}
            {formDetails.board && (
              <Text as='h2' fontSize='lg' fontWeight='500'>
                {formDetails.board}
                {` - Class ${formDetails.standard}`}
              </Text>
            )}
            {formDetails.examType && (
              <Text as='h2' fontSize='lg' fontWeight='500'>
                {formDetails.examType}
              </Text>
            )}
            {formDetails.subject && (
              <Text as='h2' fontSize='lg' fontWeight='500'>
                {formDetails.subject}
              </Text>
            )}
          </Box>
        )}
        <Flex justify='space-between' alignItems='center' mt='3'>
          {formDetails.time && (
            <Text as='p' fontSize='md'>
              <Text as='span' fontWeight='500'>
                Time allowed:&nbsp;
              </Text>
              {`${formDetails.time} minutes`}
            </Text>
          )}
          <Text as='p' fontSize='md'>
            <Text as='span' fontWeight='500'>
              Maximum Marks:&nbsp;
            </Text>
            {formDetails.totalMarks}
          </Text>
        </Flex>
        {formDetails.instructions && (
          <Box mt='3'>
            <Text as='p' fontSize='md' fontWeight='500'>
              Exam Instructions:
            </Text>
            <Text as='p' sx={{ whiteSpace: 'pre' }} fontSize='15px'>
              {formDetails.instructions}
            </Text>
          </Box>
        )}
      </Box>
      <DragDropContext
        onDragEnd={handleOnDragEnd}
        onDragStart={handleOnDragStart}
      >
        <Droppable droppableId='list'>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {previewData.map((ques, idx) => (
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
