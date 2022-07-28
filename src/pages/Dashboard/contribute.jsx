import { useState, Fragment, useRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Box,
  HStack,
  useRadioGroup,
  Textarea,
  Heading,
  IconButton,
  Button,
  FormHelperText,
  InputGroup,
  InputRightElement,
  Tooltip,
  useToast,
} from '@chakra-ui/react';
import debounce from 'lodash.debounce';
import { Select } from 'chakra-react-select';
import { MdDelete } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';
import RadioCard from '../../components/Contribute/radioCard';
import ImageUploader from '../../components/ImageUploader';
import classData from '../../data/classData';
import { useAddQuestionsMutation } from '../../redux/services/questionApi';

const difficulties = ['Easy', 'Medium', 'Hard'];

const Contribute = () => {
  const toast = useToast();
  const {
    getRootProps,
    getRadioProps,
    value: difficulty,
  } = useRadioGroup({
    name: 'difficulty',
    defaultValue: 'Easy',
  });

  const group = getRootProps();

  const [options, setOptions] = useState([
    { value: '', isCorrect: false, id: Math.random() * 100 },
    { value: '', isCorrect: false, id: Math.random() * 100 },
    { value: '', isCorrect: false, id: Math.random() * 100 },
    { value: '', isCorrect: false, id: Math.random() * 100 },
  ]);
  const user = useSelector((state) => state.userState.user);
  const [standard, setStandard] = useState({ value: '10', label: 'X' });
  const [subject, setSubject] = useState('');
  const [topics, setTopics] = useState('');
  const [image, setImage] = useState(null);
  const question = useRef();
  const answer = useRef();
  const [addQuestion] = useAddQuestionsMutation();

  const changeHandler = (idx, e) => {
    setOptions((prevState) =>
      prevState.map((val, i) => {
        let newVal = val;
        if (i === idx) {
          newVal = {
            ...val,
            value: e.target.value,
            isCorrect: e.target.value === '' ? false : val.isCorrect,
          };
        }

        return newVal;
      }),
    );
  };

  const handleOptionChange = useMemo(() => debounce(changeHandler, 150), []);

  const handleRemoveOption = (idx) => {
    if (options.length > 2) {
      setOptions((prevState) =>
        prevState.filter((option, index) => {
          return index !== idx;
        }),
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
      setOptions((prevState) => [
        ...prevState,
        { value: '', isCorrect: false, id: Math.random() * 100 },
      ]);
    }
  };

  const handleAnswer = (idx) => {
    if (options[idx].value === '') {
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
    setOptions((prevValue) => {
      const newState = prevValue.map((val, i) => ({
        ...val,
        isCorrect: i === idx ? !val.isCorrect : false,
      }));
      return newState;
    });
  };

  function buildFormData(formData, data, parentKey) {
    if (
      data &&
      typeof data === 'object' &&
      !(data instanceof Date) &&
      !(data instanceof File)
    ) {
      Object.keys(data).forEach((key) => {
        buildFormData(
          formData,
          data[key],
          parentKey ? `${parentKey}[${key}]` : key,
        );
      });
    } else {
      const value = data == null ? '' : data;

      formData.append(parentKey, value);
    }
  }

  const onSubmit = async () => {
    const data = {
      standard: standard.value,
      subject: subject.value,
      topics: topics.map((topic) => topic.value),
      difficulty,
      question: question.current.value,
      answerExplaination: answer.current.value,
      options,
      userId: user._id,
    };

    const formData = new FormData();
    buildFormData(formData, data);
    formData.append('image', image);
    console.log(formData);
    // await addQuestion(data)
    await addQuestion(formData)
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
        setImage(null);
        setOptions([
          { value: '', isCorrect: false, id: Math.random() * 100 },
          { value: '', isCorrect: false, id: Math.random() * 100 },
          { value: '', isCorrect: false, id: Math.random() * 100 },
          { value: '', isCorrect: false, id: Math.random() * 100 },
        ]);
        setStandard({ value: '10', label: 'X' });
        setSubject('');
        setTopics('');
        question.current.value = '';
        answer.current.value = '';
        group.current.value = 'Easy';
      })
      .catch((error) => {
        console.log(error);
      });
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
              padding: '0 12px 2px 12px',
              marginLeft: '3px',
            }}
          >
            Question
          </mark>
        </Heading>
        <Button onClick={onSubmit} w={150} h={45}>
          SUBMIT
        </Button>
      </Flex>
      <Flex justify='space-between'>
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
              ref={question}
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
                  onClick={handleAddOption}
                  bg='brand.300'
                  color='brand.600'
                  _hover={{
                    backgroundColor: 'brand.500',
                    color: 'brand.100',
                  }}
                  size='sm'
                >
                  Add Option
                </Button>
              )}
            </Flex>
            <Flex justify='space-between' wrap='wrap'>
              {options.map((option, idx) => (
                <Fragment key={option.id}>
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
                        // value={option.value}
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
                            bg={option.isCorrect ? 'green.300' : 'gray.300'}
                            color={option.isCorrect ? 'brand.100' : 'brand.100'}
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
              ref={answer}
            />
          </FormControl>
        </Box>
        <Box borderRadius='5px' w='48%' flexShrink={0} rounded='md'>
          <FormControl mb={6} isRequired>
            <FormLabel fontSize={18} htmlFor='class'>
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
                setTopics([]);
              }}
            />
          </FormControl>
          <FormControl isRequired mb={6}>
            <FormLabel fontSize={18} htmlFor='subject'>
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
                setSubject(e);
                setTopics([]);
              }}
            />
          </FormControl>
          <FormControl isRequired mb={6}>
            <FormLabel fontSize={18} htmlFor='topics'>
              Topic
            </FormLabel>
            <Select
              isMulti
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
              value={topics}
              onChange={(e) => {
                setTopics(e);
              }}
              closeMenuOnSelect={false}
              selectedOptionStyle='check'
              hideSelectedOptions={false}
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
      </Flex>
    </Box>
  );
};

export default Contribute;
