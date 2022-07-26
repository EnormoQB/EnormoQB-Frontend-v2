import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Box,
  HStack,
  Text,
  Flex,
  Button,
  NumberInput,
  NumberInputStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  Input,
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { FaPlus } from 'react-icons/fa';
import classData from '../../data/classData';

const difficulties = ['Easy', 'Medium', 'Hard'];

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
        {
          name: topic.value,
          count: topicQuesCount,
        },
      ]);
    }

    setTopicQuesCount('');
    setTopic('');
  };

  return (
    <Box>
      <FormControl mb={6} isRequired>
        <FormLabel fontSize={19} htmlFor='board'>
          Institution Name
        </FormLabel>
        <Input
          placeholder='Enter Institution Name'
          chakraStyles={{
            control: (provided) => ({
              ...provided,
              boxShadow: 'base',
            }),
          }}
          value={title}
          onChange={(e) => {}}
        />
      </FormControl>
      <Flex justify='space-between'>
        <Box borderRadius='5px' w='48%' flexShrink={0} rounded='md'>
          <FormControl mb={6} isRequired>
            <FormLabel fontSize={19} htmlFor='board'>
              Exam Type
            </FormLabel>
            <Select
              options={[
                { value: 'Class Test', label: 'Class Test' },
                { value: 'Board', label: 'Board' },
                { value: 'Pre-Board', label: 'Pre-Board' },
              ]}
              placeholder='Select Exam Type'
              chakraStyles={{
                control: (provided) => ({
                  ...provided,
                  boxShadow: 'base',
                }),
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
              options={[
                { value: 'CBSE', label: 'CBSE' },
                { value: 'ICSE', label: 'ICSE' },
              ]}
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
          <FormControl mb={6} isRequired>
            <FormLabel fontSize={19} htmlFor='noOfQues'>
              Number Of Questions
            </FormLabel>
            <HStack spacing={50}>
              {difficulties.map((value, i) => {
                return (
                  <Box key={i}>
                    <Text>{value}</Text>
                    <NumberInput defaultValue={0} min={0} allowMouseWheel>
                      <NumberInputField boxShadow='base' />
                    </NumberInput>
                  </Box>
                );
              })}
            </HStack>
          </FormControl>
          <FormControl mb={6} isRequired>
            <FormLabel fontSize={19} htmlFor='noOfQues'>
              Total
            </FormLabel>
            <HStack spacing={50}>
              {['Marks', 'Time'].map((value, i) => {
                return (
                  <Box key={i}>
                    <Text>{value}</Text>
                    <NumberInput
                      defaultValue={0}
                      min={0}
                      allowMouseWheel
                      step={5}
                    >
                      <NumberInputField boxShadow='base' />
                    </NumberInput>
                  </Box>
                );
              })}
            </HStack>
          </FormControl>
        </Box>
        <Box borderRadius='5px' w='48%' flexShrink={0} rounded='md'>
          <FormControl mb={6} isRequired>
            <FormLabel fontSize={19} htmlFor='class'>
              Class
            </FormLabel>
            <Select
              options={[
                { value: '10', label: 'X' },
                { value: '12', label: 'XII' },
              ]}
              placeholder='Select Class'
              chakraStyles={{
                control: (provided) => ({
                  ...provided,
                  boxShadow: 'base',
                }),
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
                control: (provided) => ({
                  ...provided,
                  boxShadow: 'base',
                }),
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
          <FormControl mb={6} isRequired>
            <FormLabel fontSize={19} htmlFor='noOfQues'>
              Marks Per Question
            </FormLabel>
            <HStack spacing={50}>
              {difficulties.map((value, i) => {
                return (
                  <Box key={i}>
                    <Text>{value}</Text>
                    <NumberInput defaultValue={0} min={0} allowMouseWheel>
                      <NumberInputField boxShadow='base' />
                    </NumberInput>
                  </Box>
                );
              })}
            </HStack>
          </FormControl>
          <FormControl mb={6} isRequired>
            <FormLabel fontSize={19} htmlFor='topics'>
              Topics
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
                      ? classData[standard.value][subject.value].map(
                          (value) => ({
                            value,
                            label: value,
                          }),
                        )
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
        </Box>
      </Flex>
      <Flex justify='center'>
        <Button mt={5} w={300} h={50}>
          SUBMIT
        </Button>
      </Flex>
    </Box>
  );
};

export default GenerateForm;
