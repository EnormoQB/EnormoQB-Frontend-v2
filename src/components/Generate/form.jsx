import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Box,
  Select,
  HStack,
  Text,
  Flex,
  Button,
  NumberInput,
  NumberInputStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { Select as Select2 } from 'chakra-react-select';
import { class10, class12 } from '../../pages/Dashboard/contribute';

const difficulties = ['Easy', 'Medium', 'Hard'];

const GenerateForm = () => {
  const [standard, setStandard] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState('');
  const [board, setBoard] = useState('');
  // const [topics, setTopics] = useState([]);

  console.log(standard);
  console.log(subject);
  console.log(board);

  const onSelectClass = (val) => {
    setStandard(val);
    if (val === 'X') {
      setSubjects(class10);
    } else {
      setSubjects(class12);
    }
  };

  return (
    <Box>
      {/* Class */}
      <FormControl mb={6} isRequired>
        <FormLabel fontSize={19} htmlFor='class'>
          Class
        </FormLabel>
        <Select
          variant='outline'
          placeholder='Select Class'
          boxShadow='base'
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
      {/* Board */}
      <FormControl mb={6} isRequired>
        <FormLabel fontSize={19} htmlFor='class'>
          Board
        </FormLabel>
        <Select
          variant='outline'
          placeholder='Select Board'
          boxShadow='base'
          border='gray.200'
          borderWidth={1}
          onChange={(e) => setBoard(e.target.value)}
          // color='gray.400'
        >
          <option>CBSE</option>
          <option>ICSE</option>
        </Select>
      </FormControl>
      <FormControl mb={6} isRequired>
        <FormLabel fontSize={19} htmlFor='noOfQues'>
          Number Of Questions
        </FormLabel>
        <HStack spacing={175}>
          {difficulties.map((value, i) => {
            return (
              <Box key={i}>
                <Text>{value}</Text>
                <NumberInput defaultValue={0} allowMouseWheel>
                  <NumberInputField boxShadow='base' />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
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
        {/* <Input placeholder='Enter Topics' boxShadow='md' /> */}
        <Flex justify='space-between'>
          <Box w='85%'>
            <Select2
              options={[
                { value: 'topic1', label: 'topic1' },
                { value: 'topic2', label: 'topic2' },
              ]}
              placeholder='Select Topic'
              selectedOptionStyle='color'
              selectedOptionColor='blue'
              chakraStyles={{
                control: (provided) => ({
                  ...provided,
                  boxShadow: 'base',
                }),
              }}
            />
          </Box>
          <Box w='30%' ml={10}>
            <NumberInput allowMouseWheel>
              <NumberInputField
                boxShadow='base'
                placeholder='Number Of Questions'
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Box>
          <Box ml={100}>
            <Button w={100}>Add</Button>
          </Box>
        </Flex>
      </FormControl>
      {/* Submit */}
      <Flex justify='center'>
        <Button mt={5} w={300} h={50}>
          Submit
        </Button>
      </Flex>
    </Box>
  );
};

export default GenerateForm;
