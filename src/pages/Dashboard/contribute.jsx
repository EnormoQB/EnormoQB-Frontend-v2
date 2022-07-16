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
// import ContributeQuesImage from '../../assets/contributeQues.png';
import RadioCard from '../../components/Contribute/radioCard';

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
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleOptionChange = (idx, e) => {
    setOptions((prevState) => {
      const newState = [...prevState];
      newState[idx] = e.target.value;
      return newState;
    });
  };

  // MCQ

  const handleRemoveOption = (idx) => {
    setOptions((prevState) => prevState.filter((option, id) => id !== idx));
  };

  const handleAddOption = () => {
    if (options.length < 4) {
      setOptions((prevState) => [...prevState, '']);
    }
  };

  console.log(standard);
  console.log(topic);
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
              onChange={(e) => setStandard(e.target.value)}
              // color='gray.400'
            >
              <option>X</option>
              <option>XII</option>
            </Select>
          </FormControl>
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
          <FormControl isRequired mb={6} mt={-2}>
            <FormLabel fontSize={19} htmlFor='answer'>
              Answer
            </FormLabel>
            <Input
              id='answer'
              placeholder='Enter Answer'
              boxShadow='md'
              onChange={(e) => setAnswer(e.target.value)}
            />
          </FormControl>
        </Box>
        <Box borderRadius='5px' w='49%' flexShrink={0} rounded='md'>
          {/* Subject */}
          <FormControl isRequired mb={6}>
            <FormLabel fontSize={19} htmlFor='subject'>
              Subject
            </FormLabel>
            <Input
              id='subject'
              placeholder='Enter Subject'
              boxShadow='md'
              onChange={(e) => setSubject(e.target.value)}
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
          {/* Options */}
          <FormControl isRequired mb={6}>
            <FormLabel fontSize={19} htmlFor='options'>
              Options
            </FormLabel>
            <FormHelperText mt={-1} mb={3}>
              Minimum 2 options are required
            </FormHelperText>
            <Flex justify='space-between' wrap='wrap'>
              {options.map((option, idx) => (
                // eslint-disable-next-line react/no-array-index-key
                <Fragment key={idx}>
                  <Box w={48} mr={20} mb={7}>
                    <FormLabel htmlFor={`options[${idx + 1}]`}>
                      {`Option ${idx + 1}`}
                    </FormLabel>
                    <Flex>
                      <Input
                        placeholder={`Option ${idx + 1}`}
                        w={40}
                        boxShadow='md'
                        value={option}
                        onChange={(e) => handleOptionChange(idx, e)}
                      />
                      <IconButton
                        aria-label='Delete option'
                        icon={<MdDelete />}
                        ml={2}
                        onClick={() => handleRemoveOption(idx)}
                      />
                    </Flex>
                  </Box>
                </Fragment>
              ))}
            </Flex>
            {options.length < 4 ? (
              <Button mt={5} onClick={() => handleAddOption()}>
                Add Option
              </Button>
            ) : null}
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
