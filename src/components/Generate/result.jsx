import { useCallback, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Box } from '@chakra-ui/react';
import CustomQuestion from './customQues';
import QuestionTab from './questionTab';
import { dummy } from './config';

const GenerateResult = () => {
  const [initialData, setInitialData] = useState(dummy);
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
