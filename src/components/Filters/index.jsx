import { useState } from 'react';
import { Box, Text, HStack, Flex, FormControl, Button } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { FaFilter } from 'react-icons/fa';
import { classOptions, difficulties, dummy } from '../Generate/config';
import classData from '../../data/classData';

console.log(dummy);

const Filter = () => {
  const [standard, setStandard] = useState({ value: '10', label: 'X' });
  const [subject, setSubject] = useState('');
  const [topicsList, setTopicsList] = useState([]);
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('');

  console.log(standard);
  console.log(subject);
  console.log(difficulty);
  console.log(topicsList);

  const handleFilter = () => {
    console.log('yo');
  };

  return (
    <Box mb={5}>
      <HStack>
        <FaFilter />
        <Text fontSize='2xl'>Filter</Text>
      </HStack>
      <Flex>
        <HStack spacing={4} w='full'>
          <FormControl mb={6} mt={6} w='15%'>
            <Select
              size='sm'
              options={classOptions}
              placeholder='Class'
              chakraStyles={{
                control: (provided) => ({ ...provided, boxShadow: 'base' }),
              }}
              value={standard}
              onChange={(e) => {
                setStandard(e);
              }}
            />
          </FormControl>
          <FormControl mb={6} w='15%'>
            <Select
              options={Object.keys(classData[standard.value]).map((value) => ({
                value,
                label: value,
              }))}
              placeholder='Subject'
              size='sm'
              chakraStyles={{
                control: (provided) => ({ ...provided, boxShadow: 'base' }),
              }}
              onChange={(e) => {
                if (subject.value !== e.value) {
                  setTopicsList([]);
                  setSubject(e);
                }
              }}
              value={subject}
            />
          </FormControl>
          <FormControl mb={6} w='15%'>
            <Select
              size='sm'
              options={difficulties.map((value) => ({
                value,
                label: value,
              }))}
              placeholder='Difficulty'
              chakraStyles={{
                control: (provided) => ({ ...provided, boxShadow: 'base' }),
              }}
              onChange={(e) => {
                setDifficulty(e);
                console.log(difficulty);
              }}
              value={difficulty}
            />
          </FormControl>
          <FormControl mb={6} w='35%'>
            <Select
              isMulti
              selectedOptionStyle='check'
              size='sm'
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
              placeholder='Topics'
              chakraStyles={{
                control: (provided) => ({
                  ...provided,
                  boxShadow: 'base',
                  maxH: '32px',
                  overflow: 'auto',
                }),
              }}
              closeMenuOnSelect={false}
              value={topic}
              onChange={(val) => {
                setTopic(val);
                setTopicsList((prev) => [...prev, { val }]);
              }}
            />
          </FormControl>
        </HStack>
        <Box mt={5}>
          <Button onClick={handleFilter}>Apply</Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default Filter;
