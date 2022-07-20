import { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import CustomQuestion from './customQues';
import QuestionTab from './questionTab';
import { dummy } from './config';

const GenerateResult = () => {
  const [initialData, setInitialData] = useState(dummy);

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) {
      return;
    }
    const items = Array.from(initialData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setInitialData(items);
  }

  return (
    // eslint-disable-next-line react/jsx-no-bind
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId='list'>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <CustomQuestion />
            {initialData.map((ques, idx) => (
              // eslint-disable-next-line no-underscore-dangle
              <QuestionTab key={ques._id.$oid} index={idx} data={ques} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default GenerateResult;
