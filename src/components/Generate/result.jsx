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
import {
  useLazySwitchQuestionQuery,
  useAddQuestionsMutation,
} from '../../redux/services/questionApi';
import {
  useLanguageConvertMutation,
  useLazyGeneratePdfQuery,
} from '../../redux/services/questionPaperApi';

import languages from './config';
import DashboardLoader from '../Loaders/DashboardLoader';

const GenerateResult = ({ switchForm }) => {
  const [addQuestion] = useAddQuestionsMutation();
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

  const handleOnDragStart = (e) => {
    setIsDragging(e.source.index);
  };

  const errorToast = (description) => {
    if (!toast.isActive('error')) {
      toast(
        getToast({
          id: 'error',
          title: 'Error',
          description,
          status: 'error',
        }),
      );
    }
  };

  const [trigger, { isLoading, isFetching }] = useLanguageConvertMutation();
  const [respData, setRespData] = useState([]);

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

  const addToPreview = (data) => {
    const newArray = [...customQues];
    const finalPreview = [...previewData];
    newArray.push(data);
    finalPreview.unshift(data);
    dispatch(setCustomQues(newArray));
    dispatch(setPreviewData(finalPreview));
  };

  const addCustomQues = (data) => {
    const customData = {
      ...data,
      standard: formDetails.standard,
      subject: formDetails.subject,
      topics: [],
    };
    delete customData._id;
    const formData = new FormData();
    formData.append('data', JSON.stringify(customData));
    addQuestion(formData)
      .then((res) => {
        if (res?.data?.status !== 1) {
          errorToast('Some error occured!');
        }
      })
      .catch((err) => {
        console.log(err);
        errorToast('Some error occured!');
      });
    addToPreview(data);
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

  const handleLangChange = async (event) => {
    const lang = event.target.value;
    if (lang === 'English') {
      setRespData(previewData);
      return;
    }
    const questionList = previewData;
    trigger({ questionList, lang })
      .then((resp) => {
        setRespData(resp.data.data);
        toast(
          getToast({
            title: 'Success',
            description: `Language Updated!`,
            status: 'success',
          }),
        );
      })
      .catch((err) => {
        console.log('Delete Error', err);
        toast(
          getToast({
            title: 'Error',
            description: 'Some Error Occured!',
            status: 'error',
          }),
        );
      });
  };

  return (
    <Box>
      {isLoading || isFetching ? (
        <DashboardLoader />
      ) : (
        <>
          <CustomQuestion addQues={addCustomQues} addToPreview={addToPreview} />
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
                  {respData.length === 0 &&
                    previewData.map((ques, idx) => (
                      <QuestionTab
                        key={`${ques._id}${ques?.switched ? 'switched' : ''}`}
                        index={idx}
                        data={ques}
                        isDragging={isDragging}
                        onDelete={() => handleDelete(idx, ques._id)}
                        handleSwitch={() => handleSwitch(ques._id, idx)}
                      />
                    ))}
                  {respData &&
                    respData.map((ques, idx) => (
                      <QuestionTab
                        key={`${ques._id}${ques?.switched ? 'switched' : ''}`}
                        index={idx}
                        data={ques}
                        isDragging={isDragging}
                        onDelete={() => handleDelete(idx, ques._id)}
                        // handleSwitch={() => handleSwitch(ques._id, idx)}
                        hide
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
              onChange={(e) => {
                handleLangChange(e);
              }}
              // onClick={() => console.log(langData)}
              opacity='0'
              visibility='hidden'
            >
              {languages.map((langData, index) => (
                <option
                  key={index}
                  value={langData.name}
                  // onClick={(event) => handleLangChange(event)}
                >
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
        </>
      )}
    </Box>
  );
};

export default GenerateResult;
