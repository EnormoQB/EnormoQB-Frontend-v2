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
import { Fragment, useMemo, useRef, useState, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { getToast } from '../../utils/helpers';
import RadioCard from '../Contribute/radioCard';
import SimilarQuesModal from '../Modal/SimilarQues';
import { useGetQuestionsQuery } from '../../redux/services/questionApi';
import { difficulties } from './config';

const optionInitialState = [
  { value: '', isCorrect: false, id: Math.random() * 100 },
  { value: '', isCorrect: false, id: Math.random() * 100 },
  { value: '', isCorrect: false, id: Math.random() * 100 },
  { value: '', isCorrect: false, id: Math.random() * 100 },
];

const CustomQuestion = ({ addQues, addToPreview }) => {
  const toast = useToast();
  const {
    getRootProps,
    getRadioProps,
    value: difficulty,
    setValue: setDifficulty,
  } = useRadioGroup({ name: 'difficulty', defaultValue: 'Easy' });
  const group = getRootProps();
  const [questions, setQuestions] = useState([]);
  const { data: questionData } = useGetQuestionsQuery(
    { status: 'custom', page: 1 },
    { refetchOnMountOrArgChange: true },
  );

  const [options, setOptions] = useState(optionInitialState);
  const [file, setFile] = useState(null);
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
    isOpen: modalOpenSimilarQuestion,
    onOpen: onModalOpenSimilarQuestion,
    onClose: onModalCloseSimilarQuestion,
  } = useDisclosure();
  const [importData, setImportData] = useState(null);

  useEffect(() => {
    if (questionData) {
      console.log(questionData?.data);
      setQuestions(questionData?.data?.questions || []);
    }
  }, [questionData]);

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

  const handleImport = (data) => {
    console.log(data);
    // addToPreview();
    // setImportData(e);
    // toast(
    //   getToast({
    //     title: 'Success',
    //     description: 'Question imported successfully!',
    //     status: 'success',
    //   }),
    // );
    // onModalCloseSimilarQuestion();
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
                disabled
              >
                <Flex direction='column'>
                  <span>Import From CSV</span>
                  <span style={{ fontSize: 11, marginTop: 5 }}>
                    (Coming Soon)
                  </span>
                </Flex>
              </Button>
              <Modal isOpen={isOpen2} onClose={onClose2}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>CSV Questions</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Input
                      type='file'
                      onChange={(event) => {
                        setFile(event.target.files[0]);
                      }}
                    />
                  </ModalBody>
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
                customArray={questions}
                isSimilarModal={false}
                onConfirm={handleImport}
              />
            </WrapItem>
          </Wrap>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default CustomQuestion;
