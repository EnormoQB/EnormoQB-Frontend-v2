import { useCallback, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Box, Flex, Text, Button, useToast, Select } from '@chakra-ui/react';
import { BiChevronDown } from 'react-icons/bi';
import CustomQuestion from './customQues';
import QuestionTab from './questionTab';
import {
  setPreviewData,
  setCustomQues,
  setFormData,
} from '../../redux/features/generateSlice';
import { getToast, titleCase } from '../../utils/helpers';
import { useLazySwitchQuestionQuery } from '../../redux/services/questionApi';
import { useLazyGeneratePdfQuery } from '../../redux/services/questionPaperApi';
import languages from './config';

const GenerateResult = ({ switchForm }) => {
  const toast = useToast();
  const {
    generateForm: formDetails,
    previewData,
    customQues,
  } = useSelector((state) => state.generateState);
  const dispatch = useDispatch();
  const [isDragging, setIsDragging] = useState(null);
  const [triggerSwitch] = useLazySwitchQuestionQuery();
  const [triggerPdf, { isLoading: isPdfLoading, isFetching: isPdfFetching }] =
    useLazyGeneratePdfQuery();

  const [customPushData, setCustomPushData] = useState({
    standard: formDetails.standard,
    subject: formDetails.subject,
    topics: [],
    difficulty: '',
    question: '',
    answerExplanation: '',
    answer: '',
    options: [],
    status: 'custom',
  });
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

  const calculateMarks = useMemo(() => {
    let marks = 0;
    previewData.forEach((ques) => {
      marks += formDetails.quesDiffDetails[titleCase(ques.difficulty)].marks;
    });
    return marks;
  }, [previewData]);

  const handleDelete = useCallback(
    (idx, id) => {
      const finalPreview = Array.from(previewData);
      finalPreview.splice(idx, 1);
      dispatch(setPreviewData(finalPreview));
      dispatch(setCustomQues(customQues.filter((item) => item._id !== id)));
    },
    [previewData, customQues],
  );

  const addCustomQues = (data) => {
    setCustomPushData((prev) => ({
      question: data.question,
      difficulty: data.difficulty,
      options: data.options,
      answer: data.answer,
      standard: formDetails.standard,
      subject: formDetails.subject,
    }));
    const newArray = Array.from(customQues);
    const finalPreview = Array.from(previewData);
    newArray.push(data);
    finalPreview.unshift(data);
    dispatch(setCustomQues(newArray));
    dispatch(setPreviewData(finalPreview));
  };

  const generatePdf = () => {
    const data = {
      ...formDetails,
      questionList: previewData,
    };
    triggerPdf(data).then(() => {
      switchForm();
      dispatch(setFormData(null));
      dispatch(setPreviewData([]));
      dispatch(setCustomQues([]));
    });
  };

  const handleSwitch = (id, idx) => {
    triggerSwitch({ id })
      .then((res) => {
        console.log(res.data);
        if (Object.keys(res?.data.data).length > 0) {
          const finalPreview = Array.from(previewData);
          finalPreview[idx] = { ...res.data.data, switched: true };
          dispatch(setPreviewData(finalPreview));
          toast(
            getToast({
              description: 'Question switched! Kindly check for duplicates',
            }),
          );
        } else if (!toast.isActive('error')) {
          toast(
            getToast({
              id: 'error',
              title: 'Error',
              description: 'No question found to switch!',
              status: 'error',
            }),
          );
        }
      })
      .catch((err) => {
        console.log(err);
        if (!toast.isActive('error')) {
          toast(
            getToast({
              id: 'error',
              title: 'Error',
              description: 'Some error occured!',
              status: 'error',
            }),
          );
        }
      });
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
        <Flex justify='space-between' alignItems='center' mt='3' px='4'>
          {formDetails.time && (
            <Text as='p' fontSize='md'>
              <Text as='span' fontWeight='500'>
                Time allowed:&nbsp;
              </Text>
              {`${formDetails.time} mins`}
            </Text>
          )}
          <Text as='p' fontSize='md'>
            <Text as='span' fontWeight='500'>
              Maximum Marks:&nbsp;
            </Text>
            {calculateMarks}
          </Text>
        </Flex>
        {formDetails.instructions && (
          <Box mt='3' px='4'>
            <Text as='p' fontSize='md' fontWeight='500'>
              Exam Instructions:
            </Text>
            <Text as='p' sx={{ whiteSpace: 'pre-wrap' }} fontSize='15px'>
              {JSON.parse(formDetails.instructions)}
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
                  key={`${ques._id}${ques?.switched ? 'switched' : ''}`}
                  index={idx}
                  data={ques}
                  isDragging={isDragging}
                  onDelete={() => handleDelete(idx, ques._id)}
                  handleSwitch={() => handleSwitch(ques._id, idx)}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Flex justify='space-between' alignItems='center' mt={7}>
        <Select
          placeholder='Select language'
          rightIcon={<BiChevronDown />}
          w={200}
          h={50}
        >
          {languages.map((langData) => (
            <option key={langData.id} value={langData.name}>
              {langData.name}
            </option>
          ))}
        </Select>
        {previewData.length > 0 && (
          <Button
            w={200}
            h={50}
            onClick={generatePdf}
            isLoading={isPdfLoading || isPdfFetching}
            loadingText='Generating'
          >
            Generate PDF
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default GenerateResult;
