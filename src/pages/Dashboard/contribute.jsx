import { useState, Fragment, useRef, useMemo, useEffect } from 'react';
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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Image,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Select } from 'chakra-react-select';
import { MdDelete } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';
import { HiOutlineRefresh } from 'react-icons/hi';
import RadioCard from '../../components/Contribute/radioCard';
import ImageUploader from '../../components/ImageUploader';
import classData from '../../data/classData';
import { useAddQuestionsMutation } from '../../redux/services/questionApi';
import Congratulations from '../../assets/announcement.svg';
import Locked from '../../assets/locked.svg';
import OverlayLoader from '../../components/Loaders/OverlayLoader';
import { difficulties } from '../../components/Generate/config';
import { getToast, titleCase } from '../../utils/helpers';
import { useLazyGetUserDataQuery } from '../../redux/services/userApi';

const Contribute = () => {
  const user = useSelector((state) => state.userState.user);
  const toast = useToast();
  const {
    getRootProps,
    getRadioProps,
    value: difficulty,
    setValue: setDifficulty,
  } = useRadioGroup({ name: 'difficulty', defaultValue: 'Easy' });
  const group = getRootProps();

  const [options, setOptions] = useState([
    { value: '', isCorrect: false, id: Math.random() * 100 },
    { value: '', isCorrect: false, id: Math.random() * 100 },
    { value: '', isCorrect: false, id: Math.random() * 100 },
    { value: '', isCorrect: false, id: Math.random() * 100 },
  ]);
  const [standard, setStandard] = useState({ value: '10', label: 'X' });
  const [subject, setSubject] = useState('');
  const [topics, setTopics] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { state: quesEditData } = useLocation();
  const [searchParams] = useSearchParams();
  const question = useRef();
  const explanation = useRef();
  const [addQuestion] = useAddQuestionsMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [triggerGetUser] = useLazyGetUserDataQuery();

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

  const onSubmit = async () => {
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
      standard: standard.value,
      subject: subject.value,
      topics: topics.map((topic) => topic.value),
      difficulty,
      question: question.current.value.trim(),
      answerExplanation: explanation.current.value.trim(),
      answer,
      options: opts,
      ...(searchParams.get('id') && { id: searchParams.get('id') }),
    };

    if (data.question.length < 1) {
      errorToast('Question cannot be blank!');
    } else if (typeof data.subject === 'undefined') {
      errorToast('Subject cannot be blank!');
    } else if (data.topics.length === 0) {
      errorToast('Topics cannot be blank!');
    } else if (flag) {
      errorToast('Delete the empty option or enter some value!');
    } else if (!difficulties.includes(data.difficulty)) {
      errorToast('Select from given difficulties!');
    } else if (data.answer === '') {
      errorToast('Please mark a correct answer!');
    } else {
      setLoading(true);

      const formData = new FormData();
      formData.append('data', JSON.stringify(data));
      formData.append('image', image);

      addQuestion(formData)
        .then((res) => {
          if (res?.data.status === 1) {
            setImage(null);
            setOptions([
              { value: '', isCorrect: false, id: Math.random() * 100 },
              { value: '', isCorrect: false, id: Math.random() * 100 },
              { value: '', isCorrect: false, id: Math.random() * 100 },
              { value: '', isCorrect: false, id: Math.random() * 100 },
            ]);
            setStandard({ value: '10', label: 'X' });
            setSubject('');
            setTopics([]);
            question.current.value = '';
            explanation.current.value = '';
            setDifficulty('Easy');
            setLoading(false);
            onOpen();
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          errorToast('Some error occured!');
        });
    }
  };

  useEffect(() => {
    if (
      user?.status?.value === 'active' &&
      quesEditData !== null &&
      searchParams.get('id') === quesEditData._id
    ) {
      setImage(null);
      setOptions((prev) => {
        const newOptions = quesEditData.options.map((option, idx) => {
          document.querySelector(`#option${idx + 1}`).value = option;
          return {
            value: option,
            isCorrect: option === quesEditData.answer,
            id: prev[idx].id,
          };
        });
        return newOptions;
      });
      setStandard({
        value: quesEditData.standard,
        label: quesEditData.standard === '10' ? 'X' : 'XII',
      });
      setSubject({ value: quesEditData.subject, label: quesEditData.subject });
      setTopics(
        quesEditData.topic.map((item) => ({ value: item, label: item })),
      );
      question.current.value = quesEditData.question;
      explanation.current.value = quesEditData.answerExplanation;
      setDifficulty(titleCase(quesEditData.difficulty));
    }
  }, [quesEditData]);

  const refresh = async () => {
    try {
      await triggerGetUser();
    } catch (err) {
      console.log(err);
    }
  };
  const freezeCondition = useMemo(() => {
    if (user?.status?.freezedDetails.lastFreezed === null) return false;
    const isFreezed = user?.status?.value !== 'active';
    const lastFreezeTime = new Date(
      user?.status?.freezedDetails.lastFreezed,
    ).getTime();
    const currTime = new Date().getTime();
    return isFreezed && currTime - lastFreezeTime < 6.048e8;
  }, [user]);

  return (
    <Box>
      {freezeCondition ? (
        <Flex
          w='full'
          h='calc(100vh - 10vh - 64px)'
          justify='center'
          alignItems='center'
          direction='column'
        >
          <Image src={Locked} alt='access denied' h='270px' mb='8' />
          <Text w={['100%', '100%', '80%', '70%', '42%']} textAlign='center'>
            Your account has been freezed due to violation of the Code of
            Conduct
          </Text>
          <Button
            mt={7}
            _hover={{ backgroundColor: 'myGray.500' }}
            rightIcon={<HiOutlineRefresh />}
            flexShrink='0'
            onClick={refresh}
          >
            <span>Refresh</span>
          </Button>
        </Flex>
      ) : (
        <Box>
          {loading && <OverlayLoader />}
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
            <Button disabled={loading} onClick={onSubmit} w={150} h={45}>
              SUBMIT
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size='lg'>
              <ModalOverlay />
              <ModalContent m='auto'>
                <ModalHeader />
                <ModalCloseButton />
                <ModalBody>
                  <Text
                    fontWeight='bold'
                    fontSize='lg'
                    textAlign='center'
                    mb={3}
                  >
                    Thank you for the submission!
                  </Text>
                  <Text
                    textAlign='center'
                    mb={6}
                    fontSize='sm'
                    w='80%'
                    m='auto'
                  >
                    Your question status is pending. We will approve or reject
                    it upon evaluation.
                  </Text>
                  <Image
                    src={Congratulations}
                    alt='successful submission'
                    w='60%'
                    m='auto'
                    mt={6}
                    mr='78px'
                  />
                </ModalBody>
                <ModalFooter />
              </ModalContent>
            </Modal>
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
                        <Flex
                          alignItems='center'
                          justify='space-between'
                          mb='1.5'
                        >
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
                            id={`option${idx + 1}`}
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
                                color={
                                  option.isCorrect ? 'brand.100' : 'brand.100'
                                }
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
                  ref={explanation}
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
                  options={Object.keys(classData[standard.value]).map(
                    (value) => ({
                      value,
                      label: value,
                    }),
                  )}
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
                <ImageUploader image={image} setImage={setImage} />
              </FormControl>
            </Box>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default Contribute;
