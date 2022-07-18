import { useState, Fragment } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Box,
  HStack,
  Select,
  useRadioGroup,
  Textarea,
  Heading,
  IconButton,
  Button,
  FormHelperText,
} from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';
import RadioCard from '../../components/Contribute/radioCard';

export const class12 = [
  'Physics',
  'Chemistry',
  'Maths',
  'Biology',
  'English',
  'Hindi',
  'History',
  'Geography',
  'Economics',
  'Accountancy',
  'Computer Science',
  'Business Studies',
  'Physical Education',
];

export const class10 = [
  'Maths',
  'English',
  'Hindi',
  'Science',
  'Social Studies',
  'General Knowledge',
];

// Difficulty

const difficulties = ['Easy', 'Medium', 'Hard'];

const Contribute = () => {
  // const [difficulty, setDifficulty] = useState('');

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'difficulty',
    defaultValue: 'Easy',
    onChange: console.log,
  });

  const group = getRootProps();
  const [options, setOptions] = useState(['', '', '', '']);
  const [standard, setStandard] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const onSelectClass = (val) => {
    setStandard(val);
    if (val === 'X') {
      setSubjects(class10);
    } else {
      setSubjects(class12);
    }
  };

  const handleOptionChange = (idx, e) => {
    setOptions((prevState) => {
      const newState = [...prevState];
      newState[idx] = e.target.value;
      return newState;
    });
  };

  // MCQ

  const handleRemoveOption = (idx) => {
    // eslint-disable-next-line no-unused-expressions
    options.length > 2
      ? setOptions(
          (prevState) => prevState.filter((option, id) => id !== idx),
          setAnswer(''),
        )
      : null;
  };

  const handleAddOption = () => {
    if (options.length < 4) {
      setOptions((prevState) => [...prevState, '']);
    }
  };

  const handleSelectAnswer = (idx) => {
    setAnswer(options.filter((option, id) => id === idx)[0]);
  };

  console.log(standard);
  console.log(topic);
  console.log(subjects);
  console.log(subject);
  console.log(question);
  console.log(options);
  console.log(answer);

  return (
    <Box>
      {/* Heading */}
      <Heading as='h1' fontSize='4xl' fontWeight='bold' mb={10}>
        Contribute
        <mark
          style={{
            backgroundColor: '#C3D0F9',
            borderRadius: '25px',
            padding: '0 12px',
            marginLeft: '3px',
          }}
        >
          Question
        </mark>
      </Heading>
      <Flex justify='space-between'>
        <Box borderRadius='5px' w='49%' flexShrink={0} rounded='md'>
          {/* Form Starts */}
          {/* Class */}
          <FormControl mb={6} isRequired>
            <FormLabel fontSize={19} htmlFor='class'>
              Class
            </FormLabel>
            <Select
              variant='outline'
              placeholder='Select Class'
              boxShadow='md'
              border='gray.200'
              borderWidth={1}
              onChange={(e) => onSelectClass(e.target.value)}
              // color='gray.400'
            >
              <option>X</option>
              <option>XII</option>
            </Select>
          </FormControl>
          {/* Subject */}
          <FormControl isRequired mb={6}>
            <FormLabel fontSize={19} htmlFor='subject'>
              Subject
            </FormLabel>
            <Select
              variant='outline'
              placeholder='Select Subject'
              boxShadow='md'
              border='gray.200'
              borderWidth={1}
              onChange={(e) => setSubject(e.target.value)}
              // color='gray.400'
            >
              {subjects.map((value, i) => (
                <option key={i}>{value}</option>
              ))}
            </Select>
          </FormControl>
          {/* Topic */}
          <FormControl isRequired mb={6}>
            <FormLabel fontSize={19} htmlFor='topic'>
              Topic
            </FormLabel>
            <Input
              id='topic'
              placeholder='Enter Topic'
              boxShadow='md'
              onChange={(e) => setTopic(e.target.value)}
            />
          </FormControl>
          {/* Difficulty */}
          <FormControl mb={6}>
            <FormLabel fontSize={19} htmlFor='difficulty'>
              Difficulty Level
            </FormLabel>
            <HStack {...group} size='sm'>
              {difficulties.map((value) => {
                const radio = getRadioProps({ value });
                return (
                  <RadioCard key={value} {...radio}>
                    {value}
                  </RadioCard>
                );
              })}
            </HStack>
          </FormControl>
        </Box>
        <Box borderRadius='5px' w='49%' flexShrink={0} rounded='md'>
          {/* Question */}
          <FormControl isRequired mb={6}>
            <FormLabel fontSize={19} htmlFor='question'>
              Question
            </FormLabel>
            <Textarea
              id='question'
              placeholder='Enter Question'
              w='100%'
              h='150px'
              boxShadow='md'
              onChange={(e) => setQuestion(e.target.value)}
            />
          </FormControl>
          {/* Options */}
          <FormControl isRequired mb={6}>
            <HStack mb={1}>
              <FormLabel fontSize={19} htmlFor='options'>
                Options
              </FormLabel>
              {options.length < 4 ? (
                <Button p={3} onClick={() => handleAddOption()}>
                  Add Option
                </Button>
              ) : null}
            </HStack>
            <FormHelperText mt={-1} mb={3}>
              Minimum 2 options are required
            </FormHelperText>
            <Flex justify='space-between' wrap='wrap'>
              {options.map((option, idx) => (
                <Fragment key={idx}>
                  <Box w={48} mr='12%' mb={7}>
                    <FormLabel htmlFor={`options[${idx + 1}]`}>
                      {`Option ${idx + 1}`}
                    </FormLabel>
                    <Flex>
                      <Input
                        placeholder={`Option ${idx + 1}`}
                        w={170}
                        minW='unset'
                        boxShadow='md'
                        value={option}
                        onChange={(e) => handleOptionChange(idx, e)}
                      />
                      <IconButton
                        aria-label='Delete option'
                        icon={<MdDelete />}
                        ml={2}
                        // borderRightRadius={0}
                        onClick={() => handleRemoveOption(idx)}
                      />
                      <IconButton
                        aria-label='Select Answer'
                        icon={<FaCheck />}
                        bg='green'
                        // borderLeftRadius={0}
                        ml={1}
                        _hover={{
                          backgroundColor: '#A0D995',
                          borderColor: 'brand.400',
                          color: 'black',
                        }}
                        onClick={() => handleSelectAnswer(idx)}
                      />
                    </Flex>
                  </Box>
                </Fragment>
              ))}
            </Flex>
          </FormControl>
          <FormControl>
            <FormLabel fontSize={19} htmlFor='answer'>
              Answer: {answer}
            </FormLabel>
          </FormControl>
        </Box>
      </Flex>
      {/* Submit */}
      <Flex justify='center'>
        <Button mt={5} w={300} h={50}>
          Submit
        </Button>
      </Flex>
    </Box>
  );
};

export default Contribute;
