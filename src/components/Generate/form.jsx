import { useState } from 'react';
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
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { FaPlus } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import classData from '../../data/classData';
import { boardOptions, classOptions, difficulties, examTypes } from './config';

const GenerateForm = () => {
  const [title, setTitle] = useState('');
  const [standard, setStandard] = useState({ value: '10', label: 'X' });
  const [subject, setSubject] = useState('');
  const [board, setBoard] = useState('');
  const [topic, setTopic] = useState('');
  const [topicQuesCount, setTopicQuesCount] = useState('');
  const [topicsList, setTopicsList] = useState([]);

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

  return (
    <Box>
      <FormControl mb={6}>
        <FormLabel fontSize={19} htmlFor='institution'>
          Institution Name
        </FormLabel>
        <Input
          id='institution'
          placeholder='Enter Institution Name (optional)'
          boxShadow='base'
          value={title}
          onChange={(e) => {}}
        />
      </FormControl>
      <Flex justify='space-between'>
        <Box borderRadius='5px' w='48%' flexShrink={0} rounded='md'>
          <FormControl mb={6} isRequired>
            <FormLabel fontSize={19} htmlFor='type'>
              Exam Type
            </FormLabel>
            <Select
              options={examTypes}
              placeholder='Select Exam Type'
              chakraStyles={{
                control: (provided) => ({ ...provided, boxShadow: 'base' }),
              }}
              value={title}
              onChange={(e) => {
                setTitle(e);
              }}
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
              onChange={(e) => {
                setStandard(e);
                setSubject('');
              }}
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
              onChange={(e) => {
                if (subject.value !== e.value) {
                  setTopicsList([]);
                  setSubject(e);
                }
              }}
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
              <Box key={i} w='24%'>
                <Text>{value}</Text>
                <Flex boxShadow='base' borderRadius='6'>
                  <NumberInput min={0} defaultValue={0} allowMouseWheel>
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
          <Box w='15%'>
            <Text>Total Marks</Text>
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
              0
            </Flex>
          </Box>
        </Flex>
      </FormControl>
      <FormControl mb={6} isRequired>
        <FormLabel fontSize={19} htmlFor='examTime'>
          Total Time&nbsp;
          <Box display='inline' fontSize='15'>
            (in mins)
          </Box>
        </FormLabel>
        <NumberInput defaultValue={0} min={0} allowMouseWheel step={5}>
          <NumberInputField boxShadow='base' />
        </NumberInput>
      </FormControl>
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
            // colorScheme='blue'
            bg='#C3D0F9'
          >
            <TagLabel
              color='black'
              bg='#C3D0F9'
              fontSize={15}
            >{`${item.name} : ${item.count}`}</TagLabel>
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
        <Button mt={5} w={300} h={50}>
          SUBMIT
        </Button>
      </Flex>
    </Box>
  );
};

export default GenerateForm;
