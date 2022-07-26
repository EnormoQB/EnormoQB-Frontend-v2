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
} from '@chakra-ui/react';
import debounce from 'lodash.debounce';
import { Fragment, useMemo, useRef, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const CustomQuestion = () => {
  const toast = useToast();
  const [options, setOptions] = useState([
    { value: '', isCorrect: false, id: Math.random() * 100 },
    { value: '', isCorrect: false, id: Math.random() * 100 },
  ]);
  const question = useRef();

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

  return (
    <Accordion my='2' mb='4' allowToggle>
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
        <AccordionPanel pb={4} borderBottom='1px' borderColor='brand.300'>
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
            <Flex gap='4' alignItems='center'>
              <Button
                bg='brand.400'
                color='brand.600'
                _hover={{ backgroundColor: 'brand.600', color: 'brand.100' }}
                size='sm'
              >
                Add
              </Button>
              <Text fontSize='sm'>
                <strong>Note: </strong>You can reorder questions using drag
                option.
              </Text>
            </Flex>
          </Box>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default CustomQuestion;
