/* eslint-disable no-unused-vars */
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
  InputGroup,
  InputRightElement,
  Tooltip,
  Code,
  useToast,
} from '@chakra-ui/react';
import { Select as Select2 } from 'chakra-react-select';
import { MdDelete } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';
import RadioCard from '../../components/Contribute/radioCard';
import ImageUploader from '../../components/ImageUploader';

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

const difficulties = ['Easy', 'Medium', 'Hard'];

const Contribute = () => {
  const toast = useToast();
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'difficulty',
    defaultValue: 'Easy',
    onChange: console.log,
  });

  const group = getRootProps();
  const [options, setOptions] = useState(['', '', '', '']);
  const [standard, setStandard] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState(null);
  const [topics, setTopics] = useState([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState(null);
  const [image, setImage] = useState(null);

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

  const handleRemoveOption = (idx) => {
    if (options.length > 2) {
      setOptions(
        (prevState) => prevState.filter((option, id) => id !== idx),
        setAnswer(''),
      );
    } else if (!toast.isActive('option-limit')) {
      toast({
        id: 'option-limit',
        title: 'Options',
        position: 'top-right',
        description: 'Minimum options must be 2',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleAddOption = () => {
    if (options.length < 4) {
      setOptions((prevState) => [...prevState, '']);
    }
  };

  const handleTopics = (list) => {
    setTopics(list.map((item) => item.label));
  };

  const handleAnswer = (idx) => {
    if (options[idx] === '') {
      if (!toast.isActive('answer')) {
        toast({
          id: 'answer',
          title: 'Error',
          position: 'top-right',
          description: 'Answer cannot be blank!',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
      return;
    }
    setAnswer(idx);
  };

  return (
    <Box>
      <Flex justify='space-between' alignItems='center' mb={10}>
        <Heading as='h1' fontSize='4xl' fontWeight='bold'>
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
        <Button w={150} h={45}>
          Submit
        </Button>
      </Flex>
      <Flex justify='space-between'>
        <Box borderRadius='5px' w='48%' flexShrink={0} rounded='md'>
          <FormControl mb={6} isRequired>
            <FormLabel fontSize={18} htmlFor='class'>
              Class
            </FormLabel>
            <Select
              variant='outline'
              placeholder='Select Class'
              boxShadow='base'
              border='gray.200'
              borderWidth={1}
              onChange={(e) => onSelectClass(e.target.value)}
            >
              <option>X</option>
              <option>XII</option>
            </Select>
          </FormControl>
          <FormControl isRequired mb={6}>
            <FormLabel fontSize={18} htmlFor='subject'>
              Subject
            </FormLabel>
            <Select
              variant='outline'
              placeholder='Select Subject'
              boxShadow='base'
              border='gray.200'
              borderWidth={1}
              onChange={(e) => setSubject(e.target.value)}
            >
              {subjects.map((value) => (
                <option key={value}>{value}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl isRequired mb={6}>
            <FormLabel fontSize={18} htmlFor='topics'>
              Topic
            </FormLabel>
            <Select2
              isMulti
              options={[
                { value: 'WI', label: 'Wisconsin' },
                { value: 'WY', label: 'Wyoming' },
              ]}
              placeholder='Select Topics'
              boxShadow='base'
              closeMenuOnSelect={false}
              selectedOptionStyle='check'
              hideSelectedOptions={false}
              onChange={handleTopics}
            />
          </FormControl>
          <FormControl mb={6}>
            <FormLabel fontSize={18} htmlFor='difficulty'>
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
          <FormControl mb={6}>
            <FormLabel fontSize={18} htmlFor='difficulty'>
              Upload Image
            </FormLabel>
            <ImageUploader setImage={setImage} />
          </FormControl>
        </Box>
        <Box borderRadius='5px' w='48%' flexShrink={0} rounded='md'>
          <FormControl isRequired mb={6}>
            <FormLabel fontSize={18} htmlFor='question'>
              Question
            </FormLabel>
            <Textarea
              id='question'
              placeholder='Enter Question'
              w='100%'
              rows='3'
              boxShadow='base'
              resize='none'
              onChange={(e) => setQuestion(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <Flex alignItems='center' justify='space-between' mb='2'>
              <Box>
                <FormLabel fontSize={18} htmlFor='options' mb='1'>
                  Options
                </FormLabel>
                <FormHelperText mb={3} fontSize='sm' mt='0'>
                  Minimum 2 options are required
                </FormHelperText>
              </Box>
              {options.length < 4 && (
                <Button
                  p={3}
                  onClick={() => handleAddOption()}
                  bg='brand.300'
                  color='brand.600'
                  _hover={{ backgroundColor: 'brand.500', color: 'brand.100' }}
                  size='sm'
                >
                  Add Option
                </Button>
              )}
            </Flex>
            <Flex justify='space-between' wrap='wrap'>
              {options.map((option, idx) => (
                // eslint-disable-next-line react/no-array-index-key
                <Fragment key={idx}>
                  <Box w='43%' mb={7}>
                    <Flex alignItems='center' justify='space-between' mb='1.5'>
                      <FormLabel htmlFor={`options[${idx + 1}]`} mb='0'>
                        {`Option ${idx + 1}`}
                      </FormLabel>
                      <IconButton
                        aria-label='Delete option'
                        icon={<MdDelete />}
                        borderRadius='full'
                        onClick={() => handleRemoveOption(idx)}
                        size='xs'
                        bg='gray.100'
                        color='gray.400'
                        _hover={{
                          backgroundColor: 'gray.200',
                          color: 'gray.600',
                        }}
                      />
                    </Flex>
                    <InputGroup>
                      <Input
                        placeholder={`Option ${idx + 1}`}
                        w='full'
                        minW='unset'
                        boxShadow='base'
                        value={option}
                        onChange={(e) => handleOptionChange(idx, e)}
                        pr='0'
                      />
                      <InputRightElement>
                        <Tooltip
                          label='Mark this as correct answer'
                          fontSize='10px'
                        >
                          <IconButton
                            aria-label='Select Answer'
                            icon={<FaCheck />}
                            bg={idx === answer ? 'green.300' : 'gray.300'}
                            color={idx === answer ? 'brand.100' : 'brand.100'}
                            _hover={{ backgroundColor: 'green.300' }}
                            borderLeftRadius='0'
                            onClick={() => handleAnswer(idx)}
                          />
                        </Tooltip>
                      </InputRightElement>
                    </InputGroup>
                  </Box>
                </Fragment>
              ))}
            </Flex>
          </FormControl>
          <FormControl>
            <FormLabel fontSize={18} htmlFor='explanation'>
              Answer Explanation
            </FormLabel>
            <Textarea
              id='explanation'
              placeholder='Enter Answer Explanation'
              w='100%'
              rows='3'
              boxShadow='base'
              resize='none'
              onChange={(e) => setQuestion(e.target.value)}
            />
          </FormControl>
        </Box>
      </Flex>
    </Box>
  );
};

export default Contribute;
