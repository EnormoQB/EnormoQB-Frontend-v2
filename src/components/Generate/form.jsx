import { useState, useRef } from 'react';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Box,
  Text,
  Flex,
  Button,
  NumberInput,
  NumberInputField,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  Input,
  Tooltip,
  Textarea,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { FaPlus } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import classData from '../../data/classData';
import { boardOptions, classOptions, difficulties } from './config';
import WarningModal from '../Modal/Warning';
import { useGenerateQuesPaperMutation } from '../../redux/services/questionApi';

const GenerateForm = () => {
  const toast = useToast();
  const [standard, setStandard] = useState({ value: '10', label: 'X' });
  const [subject, setSubject] = useState('');
  const [board, setBoard] = useState('');
  const [topic, setTopic] = useState('');
  const [topicQuesCount, setTopicQuesCount] = useState('');
  const [topicsList, setTopicsList] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [warning, setWarning] = useState('null');
  const [generateQuesPaper] = useGenerateQuesPaperMutation();
  const instituteName = useRef();
  const examType = useRef();
  const [quesDiffDetails, setQuesDiffDetails] = useState({
    Easy: { count: 0, marks: 1 },
    Medium: { count: 0, marks: 1 },
    Hard: { count: 0, marks: 1 },
  });
  const instructions = useRef();
  const [time, setTime] = useState('');

  const onConfirm = {
    class: (e) => {
      setStandard(e);
      setSubject('');
      setTopicsList([]);
    },
    subject: (e) => {
      setSubject(e);
      setTopicsList([]);
    },
  };

  const handleStdChange = (e) => {
    if (subject !== '') {
      onOpen();
      setWarning({ type: 'class', val: e });
    } else setStandard(e);
  };

  const handleSubjectChange = (e) => {
    if (topicsList.length > 0) {
      onOpen();
      setWarning({ type: 'subject', val: e });
    } else setSubject(e);
  };

  const handleAddTopic = () => {
    if (topicsList.filter((item) => item.name === topic.value).length === 0) {
      setTopicsList((prev) => [
        ...prev,
        { name: topic.value, count: topicQuesCount },
      ]);
    }
    setTopicQuesCount('');
    setTopic('');
  };

  const easy = quesDiffDetails.Easy.count * quesDiffDetails.Easy.marks;
  const medium = quesDiffDetails.Medium.count * quesDiffDetails.Medium.marks;
  const hard = quesDiffDetails.Hard.count * quesDiffDetails.Hard.marks;
  let totalMarks = easy + medium + hard;

  const onSubmit = () => {
    const data = {
      instituteName: instituteName.current.value,
      standard: standard.value,
      subject: subject.value,
      topics: topicsList,
      examType: examType.current.value,
      board: board.value,
      instructions: instructions.current.value,
      time,
      quesDiffDetails,
      totalMarks,
    };

    const formData = new FormData();
    formData.append('data', data);
    console.log(data);
    generateQuesPaper(formData)
      .then(() => {
        toast({
          id: 'Contribute',
          title: 'success',
          position: 'top-right',
          description: 'Successfully contributed the question!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        instituteName.current.value = '';
        examType.current.value = '';
        instructions.current.value = '';
        setStandard({ value: '10', label: 'X' });
        setSubject('');
        setBoard('');
        setSubject('');
        setTopicsList([]);
        setQuesDiffDetails({
          Easy: { count: 0, marks: 1 },
          Medium: { count: 0, marks: 1 },
          Hard: { count: 0, marks: 1 },
        });
        setTime('');
        totalMarks = 0;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box>
      <WarningModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={() => onConfirm[warning.type](warning.val)}
      />
      <FormControl mb={6}>
        <FormLabel fontSize={19} htmlFor='institution'>
          Institution Name
        </FormLabel>
        <Input
          id='institution'
          placeholder='Enter Institution Name (optional)'
          boxShadow='base'
          ref={instituteName}
        />
      </FormControl>
      <Flex justify='space-between'>
        <Box borderRadius='5px' w='48%' flexShrink={0} rounded='md'>
          <FormControl mb={6}>
            <FormLabel fontSize={19} htmlFor='examType'>
              Exam Type
            </FormLabel>
            <Input
              id='examType'
              placeholder='For Example: Pre-Boards 2021-22 (optional)'
              boxShadow='base'
              ref={examType}
            />
          </FormControl>
          <FormControl mb={6} isRequired>
            <FormLabel fontSize={19} htmlFor='board'>
              Board
            </FormLabel>
            <Select
              options={boardOptions}
              placeholder='Select Board'
              chakraStyles={{
                control: (provided) => ({
                  ...provided,
                  boxShadow: 'base',
                }),
              }}
              value={board}
              onChange={(e) => {
                setBoard(e);
              }}
            />
          </FormControl>
        </Box>
        <Box borderRadius='5px' w='48%' flexShrink={0} rounded='md'>
          <FormControl mb={6} isRequired>
            <FormLabel fontSize={19} htmlFor='class'>
              Class
            </FormLabel>
            <Select
              options={classOptions}
              placeholder='Select Class'
              chakraStyles={{
                control: (provided) => ({ ...provided, boxShadow: 'base' }),
              }}
              value={standard}
              onChange={handleStdChange}
            />
          </FormControl>
          <FormControl isRequired mb={6}>
            <FormLabel fontSize={19} htmlFor='subject'>
              Subject
            </FormLabel>
            <Select
              options={Object.keys(classData[standard.value]).map((value) => ({
                value,
                label: value,
              }))}
              placeholder='Select Subject'
              chakraStyles={{
                control: (provided) => ({ ...provided, boxShadow: 'base' }),
              }}
              value={subject}
              onChange={handleSubjectChange}
            />
          </FormControl>
        </Box>
      </Flex>
      <FormControl mb={6}>
        <FormLabel fontSize={18} htmlFor='instructions'>
          Exam Instructions
        </FormLabel>
        <Textarea
          id='instructions'
          placeholder='Write Exam Instructions (optional)'
          w='100%'
          rows='3'
          ref={instructions}
          boxShadow='base'
          resize='none'
        />
      </FormControl>
      <FormControl mb={6} isRequired>
        <FormLabel fontSize={19} htmlFor='noOfQues'>
          Number/Marks Of Questions
        </FormLabel>
        <Flex justify='space-between'>
          {difficulties.map((value, i) => {
            return (
              <Box key={i} w='29%'>
                <Text>{value}</Text>
                <Flex boxShadow='base' borderRadius='6'>
                  <NumberInput
                    min={0}
                    defaultValue={0}
                    allowMouseWheel
                    value={quesDiffDetails[value].count}
                    onChange={(e) => {
                      setQuesDiffDetails((prev) => ({
                        ...prev,
                        [value]: {
                          count: Number(e),
                          marks: Number(prev[value].marks),
                        },
                      }));
                    }}
                  >
                    <NumberInputField
                      borderRightRadius='0'
                      placeholder='Questions'
                    />
                  </NumberInput>
                  <NumberInput
                    min={0}
                    max={100}
                    defaultValue={1}
                    allowMouseWheel
                    w='60%'
                    value={quesDiffDetails[value].marks}
                    onChange={(e) => {
                      setQuesDiffDetails((prev) => ({
                        ...prev,
                        [value]: {
                          marks: Number(e),
                          count: Number(prev[value].count),
                        },
                      }));
                    }}
                  >
                    <NumberInputField borderRadius='0' />
                  </NumberInput>
                  <Flex
                    px='2'
                    border='1px'
                    bg='gray.100'
                    borderColor='gray.200'
                    alignItems='center'
                    fontSize='sm'
                    borderRightRadius='6px'
                  >
                    marks
                  </Flex>
                </Flex>
              </Box>
            );
          })}
        </Flex>
      </FormControl>
      <Flex justify='space-between'>
        <Box w='48%'>
          <Text fontSize={19} mb='8px' fontWeight={500}>
            Total Marks
          </Text>
          <Flex
            px='2'
            h='40px'
            border='1px'
            bg='gray.100'
            borderColor='gray.200'
            boxShadow='base'
            alignItems='center'
            fontSize='sm'
            borderRadius='6px'
          >
            {totalMarks}
          </Flex>
        </Box>
        <FormControl mb={6} isRequired w='48%'>
          <FormLabel fontSize={19} htmlFor='examTime'>
            Total Time&nbsp;
            <Box display='inline' fontSize='15'>
              (in mins)
            </Box>
          </FormLabel>
          <NumberInput
            defaultValue={0}
            min={0}
            allowMouseWheel
            step={5}
            value={time}
            onChange={(e) => {
              setTime(e);
            }}
          >
            <NumberInputField placeholder='Total Time' boxShadow='base' />
          </NumberInput>
        </FormControl>
      </Flex>
      <FormControl mb={6}>
        <FormLabel fontSize={19} htmlFor='topics'>
          <Box display='inline-flex' alignItems='center' gap='2'>
            Topics
            <Tooltip
              label='You can add particular number of questions for multiple topics'
              placement='right'
            >
              <Box display='inline' cursor='pointer'>
                <AiOutlineInfoCircle />
              </Box>
            </Tooltip>
          </Box>
        </FormLabel>
        <FormHelperText fontSize={14} mb={1}>
          Select 1 topic at a time. To add a topic press + button.
        </FormHelperText>
        <Flex justify='space-between'>
          <Box w='85%'>
            <Select
              options={
                classData &&
                classData[standard.value] &&
                classData[standard.value][subject.value]
                  ? classData[standard.value][subject.value].map((value) => ({
                      value,
                      label: value,
                    }))
                  : []
              }
              placeholder='Select Topics'
              chakraStyles={{
                control: (provided) => ({
                  ...provided,
                  boxShadow: 'base',
                }),
              }}
              value={topic}
              onChange={(val) => setTopic(val)}
              selectedOptionStyle='check'
            />
          </Box>
          <Box w='55%' ml={4}>
            <NumberInput
              allowMouseWheel
              min={1}
              value={topicQuesCount}
              onChange={(val) => setTopicQuesCount(val)}
            >
              <NumberInputField
                boxShadow='base'
                placeholder='Total Questions'
              />
            </NumberInput>
          </Box>
          <Box ml={4}>
            <Button onClick={handleAddTopic}>
              <FaPlus />
            </Button>
          </Box>
        </Flex>
      </FormControl>
      <Wrap spacing={4}>
        {topicsList.map((item, i) => (
          <Tag
            size='md'
            key={i}
            borderRadius='full'
            variant='solid'
            bg='#C3D0F9'
          >
            <TagLabel color='black' bg='#C3D0F9' fontSize={15}>
              {`${item.name} : ${item.count}`}
            </TagLabel>
            <TagCloseButton
              color='black'
              onClick={() => {
                setTopicsList((prevValue) =>
                  prevValue.filter((val, idx) => idx !== i),
                );
              }}
            />
          </Tag>
        ))}
      </Wrap>
      <Flex justify='center'>
        <Button mt={7} w={300} h={50} onClick={onSubmit}>
          SUBMIT
        </Button>
      </Flex>
    </Box>
  );
};

export default GenerateForm;
