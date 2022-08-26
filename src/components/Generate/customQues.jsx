import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  FormControl,
  Flex,
  FormLabel,
  FormHelperText,
  IconButton,
  InputGroup,
  Input,
  InputRightElement,
  Tooltip,
  useToast,
  Textarea,
  Text,
  HStack,
  useRadioGroup,
  Wrap,
  WrapItem,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import debounce from 'lodash.debounce';
import { Fragment, useMemo, useRef, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { getToast } from '../../utils/helpers';
import RadioCard from '../Contribute/radioCard';
import SimilarQuesModal from '../Modal/SimilarQues';
import { difficulties } from './config';

const optionInitialState = [
  { value: '', isCorrect: false, id: Math.random() * 100 },
  { value: '', isCorrect: false, id: Math.random() * 100 },
  { value: '', isCorrect: false, id: Math.random() * 100 },
  { value: '', isCorrect: false, id: Math.random() * 100 },
];

const CustomQuestion = ({ addQues }) => {
  const toast = useToast();
  const {
    getRootProps,
    getRadioProps,
    value: difficulty,
    setValue: setDifficulty,
  } = useRadioGroup({ name: 'difficulty', defaultValue: 'Easy' });
  const group = getRootProps();

  const [options, setOptions] = useState(optionInitialState);
  const [openIndex, setOpenIndex] = useState(-1);
  const question = useRef();
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();
  const {
    isOpen: isOpen3,
    onOpen: onOpen3,
    onClose: onClose3,
  } = useDisclosure();
  const {
    isOpen: modalOpenSimilarQuestion,
    onOpen: onModalOpenSimilarQuestion,
    onClose: onModalCloseSimilarQuestion,
  } = useDisclosure();

  const errorToast = (description) => {
    if (!toast.isActive('error')) {
      toast(
        getToast({ id: 'error', title: 'Error', description, status: 'error' }),
      );
    }
  };

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
      toast(
        getToast({
          id: 'option-limit',
          title: 'Options',
          description: 'Minimum options must be 2',
          status: 'info',
        }),
      );
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
      errorToast('Answer cannot be blank!');
      return;
    }
    setOptions((prevValue) =>
      prevValue.map((val, i) => ({
        ...val,
        isCorrect: i === idx ? !val.isCorrect : false,
      })),
    );
  };

  const resetFields = () => {
    question.current.value = '';
    setOptions(optionInitialState);
    setDifficulty('Easy');
  };

  const handleSubmit = () => {
    let answer = '';
    const opts = [];
    let flag = false;

    for (let i = 0; i < options.length; i += 1) {
      const val = options[i].value.trim();
      if (val.length < 1) {
        flag = true;
        break;
      }
      opts.push(val);
      if (options[i].isCorrect) {
        answer = val;
      }
    }

    const data = {
      question: question.current.value.trim(),
      answer,
      options: opts,
      difficulty,
      status: 'custom',
      topics: [],
      _id: `${Math.floor(Math.random() * 10e10)}`,
    };
    if (data.question.length < 1) {
      errorToast('Question cannot be blank!');
    } else if (flag) {
      errorToast('Delete the empty option or enter some value!');
    } else if (data.answer === '') {
      errorToast('Please mark a correct answer!');
    } else {
      addQues(data);
      resetFields();
      onClose1();
      setOpenIndex(-1);
    }
  };

  return (
    <Accordion
      my='2'
      mb='4'
      allowToggle
      index={openIndex}
      onChange={(i) => setOpenIndex(i)}
    >
      <AccordionItem border='0px'>
        <h2>
          <AccordionButton
            bg='brand.300'
            border='1px'
            borderColor='brand.300'
            borderRadius='5'
            _focus={{ border: '1px', borderColor: 'brand.400' }}
            _hover={{ backgroundColor: 'brand.400', borderColor: 'brand.400' }}
            _expanded={{
              backgroundColor: 'brand.400',
              borderColor: 'brand.400',
            }}
          >
            <Box flex='1' textAlign='left' fontWeight='500'>
              Want to add a question of your choice?
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4} borderBottom='2px' borderColor='brand.300'>
          <Wrap spacing='20px' justify='center' mt={4} mb={2}>
            <WrapItem>
              <Button
                border='2px'
                borderColor='brand.450'
                bg='brand.100'
                h={16}
                borderRadius='unset'
                w='200px'
                color='brand.600'
                onClick={onOpen1}
              >
                Add Manually
              </Button>
              <Modal isOpen={isOpen1} onClose={onClose1} size='xl'>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Add Question</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody maxH='450px' overflow='auto'>
                    <Box>
                      <FormControl isRequired mb={6} mt='2'>
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
                        <Flex
                          alignItems='center'
                          justify='space-between'
                          mb='2'
                        >
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
                              _hover={{ backgroundColor: 'brand.400' }}
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
                                <Flex
                                  alignItems='center'
                                  justify='space-between'
                                  mb='1.5'
                                >
                                  <FormLabel
                                    htmlFor={`options[${idx + 1}]`}
                                    mb='0'
                                  >
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
                                        bg={
                                          option.isCorrect
                                            ? 'green.300'
                                            : 'gray.300'
                                        }
                                        color={
                                          option.isCorrect
                                            ? 'brand.100'
                                            : 'brand.100'
                                        }
                                        _hover={{
                                          backgroundColor: 'green.300',
                                        }}
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
                      <Flex gap='4' alignItems='center'>
                        <Text fontSize='sm'>
                          <strong>Note: </strong>You can reorder questions using
                          drag option.
                        </Text>
                      </Flex>
                    </Box>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      bg='brand.400'
                      color='brand.600'
                      _hover={{
                        backgroundColor: 'brand.600',
                        color: 'brand.100',
                      }}
                      onClick={handleSubmit}
                      mr={2}
                    >
                      Add
                    </Button>
                    <Button
                      variant='Ghost'
                      _hover={{
                        backgroundColor: 'brand.200',
                      }}
                      onClick={onClose1}
                    >
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </WrapItem>
            <WrapItem>
              <Button
                border='2px'
                borderColor='brand.450'
                bg='brand.100'
                h={16}
                borderRadius='unset'
                w='200px'
                color='brand.600'
                onClick={onOpen2}
              >
                Import From CSV
              </Button>
              <Modal isOpen={isOpen2} onClose={onClose2}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>CSV Questions</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>Yo</ModalBody>
                  <ModalFooter>
                    <Button
                      bg='brand.400'
                      color='brand.600'
                      _hover={{
                        backgroundColor: 'brand.600',
                        color: 'brand.100',
                      }}
                      mr={2}
                    >
                      Add
                    </Button>
                    <Button
                      variant='Ghost'
                      _hover={{
                        backgroundColor: 'brand.200',
                      }}
                      onClick={onClose2}
                    >
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </WrapItem>
            <WrapItem>
              <Button
                border='2px'
                borderColor='brand.450'
                bg='brand.100'
                h={16}
                borderRadius='unset'
                color='brand.600'
                w='200px'
                whiteSpace='unset'
                onClick={onModalOpenSimilarQuestion}
              >
                Choose From Custom Questions
              </Button>
              <SimilarQuesModal
                modalOpen={modalOpenSimilarQuestion}
                onModalClose={onModalCloseSimilarQuestion}
                customArray={[
                  {
                    options: ['c/a', '0', '-b/a', '-c/a'],
                    status: 'pending',
                    topic: ['Polynomials'],
                    difficulty: 'medium',
                    years: [],
                    imageKey: null,
                    answerExplanation: null,
                    feedback: null,
                    similarQuestions: ['62ff91c797e7cf001f003386'],
                    _id: '62f2acae83cc9c2e382cc260',
                    question:
                      'Given that one of the zeroes of the cubic polynomial ax3 + bx2 + cx + d is zero, the product of the other two zeroes is',
                    answer: 'c/a',
                    standard: '10',
                    subject: 'Maths',
                    userId: '6307611c6935cb135bf80786',
                    createdAt: '2022-08-09T18:50:34.761Z',
                    updatedAt: '2022-08-25T13:09:32.176Z',
                  },
                  {
                    options: [
                      'equal to 0',
                      'can’t say',
                      'greater than 0',
                      'less than 0',
                    ],
                    status: 'pending',
                    topic: ['Polynomials'],
                    difficulty: 'hard',
                    years: [],
                    imageKey: null,
                    answerExplanation: null,
                    feedback: null,
                    similarQuestions: ['62ff91c797e7cf001f003386'],
                    _id: '62f2acae83cc9c2e382cc261',
                    question:
                      'Given that two of the zeroes of the cubic polynomial ax 3 + bx2 + cx + d are 0, the value of c is',
                    answer: 'equal to 0',
                    standard: '10',
                    subject: 'Maths',
                    userId: '63076d176935cb135bf80835',
                    createdAt: '2022-08-09T18:50:34.761Z',
                    updatedAt: '2022-08-25T13:09:32.176Z',
                  },
                  {
                    options: [
                      'c and a have the same sign',
                      'c and b have the same sign',
                      'c and a have opposite signs',
                      'c and b have opposite signs',
                    ],
                    status: 'pending',
                    topic: ['Polynomials'],
                    difficulty: 'medium',
                    years: [],
                    imageKey: null,
                    answerExplanation: null,
                    feedback: null,
                    similarQuestions: ['62ff91c797e7cf001f003386'],
                    _id: '62f2acae83cc9c2e382cc262',
                    question:
                      'If the zeroes of the quadratic polynomial ax2 + bx + c, c ≠ 0 are equal, then',
                    answer: 'c and a have the same sign',
                    standard: '10',
                    subject: 'Maths',
                    userId: '630760dc324b6f12be817733',
                    createdAt: '2022-08-09T18:50:34.761Z',
                    updatedAt: '2022-08-25T13:09:32.176Z',
                  },
                  {
                    options: [
                      'cannot both be positive',
                      'are always equal',
                      'cannot both be negative',
                      'are always unequal',
                    ],
                    status: 'pending',
                    topic: ['Polynomials'],
                    difficulty: 'medium',
                    years: [],
                    imageKey: null,
                    answerExplanation: null,
                    feedback: null,
                    similarQuestions: ['62ff91c797e7cf001f003386'],
                    _id: '62f2acae83cc9c2e382cc263',
                    question:
                      'The zeroes of the quadratic polynomial x2 + kx + k, k ¹ 0',
                    answer: 'cannot both be positive',
                    standard: '10',
                    subject: 'Maths',
                    userId: '6307558c5d4ca35627724177',
                    createdAt: '2022-08-09T18:50:34.761Z',
                    updatedAt: '2022-08-25T13:09:32.176Z',
                  },
                  {
                    options: [
                      'both negative',
                      'both positive',
                      'one positive one negative',
                      'can’t say',
                    ],
                    status: 'approved',
                    topic: ['Polynomials'],
                    difficulty: 'medium',
                    years: [
                      2022, 2022, 2022, 2022, 2022, 2022, 2022, 2022, 2022,
                      2022, 2022, 2022, 2022, 2022, 2022, 2022, 2022, 2022,
                      2022, 2022, 2022, 2022, 2022, 2022, 2022, 2022, 2022,
                    ],
                    imageKey: null,
                    answerExplanation: null,
                    feedback: null,
                    similarQuestions: ['62ff91c797e7cf001f003386'],
                    _id: '62f2acae83cc9c2e382cc264',
                    question:
                      'The zeroes of the quadratic polynomial x2 + ax + b a, b > 0 are',
                    answer: 'both negative',
                    standard: '10',
                    subject: 'Maths',
                    userId: '630760dc324b6f12be817733',
                    createdAt: '2022-08-09T18:50:34.761Z',
                    updatedAt: '2022-08-26T03:23:54.110Z',
                    __v: 27,
                  },
                  {
                    options: [
                      'both negative',
                      'both equal',
                      'both positive',
                      'one positive and one negative',
                    ],
                    status: 'pending',
                    topic: ['Polynomials'],
                    difficulty: 'medium',
                    years: [],
                    imageKey: null,
                    answerExplanation: null,
                    feedback: null,
                    similarQuestions: ['62ff91c797e7cf001f003386'],
                    _id: '62f2acae83cc9c2e382cc266',
                    question:
                      'The zeroes of the quadratic polynomial x2 +99x +127 are',
                    answer: 'both negative',
                    standard: '10',
                    subject: 'Maths',
                    userId: '6307558c5d4ca35627724177',
                    createdAt: '2022-08-09T18:50:34.761Z',
                    updatedAt: '2022-08-25T13:09:32.176Z',
                  },
                ]}
                isSimilarModal={false}
              />
              {/* <Modal isOpen={isOpen3} onClose={onClose3}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Custom Questions</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>Yo</ModalBody>
                  <ModalFooter>
                    <Button
                      bg='brand.400'
                      color='brand.600'
                      _hover={{
                        backgroundColor: 'brand.600',
                        color: 'brand.100',
                      }}
                      mr={2}
                    >
                      Add
                    </Button>
                    <Button
                      variant='Ghost'
                      _hover={{
                        backgroundColor: 'brand.200',
                      }}
                      onClick={onClose3}
                    >
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal> */}
            </WrapItem>
          </Wrap>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default CustomQuestion;
