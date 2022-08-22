import { useState } from 'react';
import { Flex, FormControl, Button } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { classOptions, difficulties } from '../Generate/config';
import classData from '../../data/classData';

const Filter = ({ setfilter }) => {
  const [standard, setStandard] = useState('');
  const [subject, setSubject] = useState('');
  const [topics, setTopics] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const handleClearAll = () => {
    setStandard('');
    setSubject('');
    setTopics('');
    setDifficulty('');
    setfilter((prev) => ({
      ...prev,
      standard: '',
      subject: '',
      topics: '',
      difficulty: '',
      page: 1,
    }));
  };

  const handleApply = () => {
    if (
      standard === '' &&
      subject === '' &&
      topics === '' &&
      difficulty === ''
    ) {
      handleClearAll();
    } else if (
      difficulty !== '' &&
      standard === '' &&
      subject === '' &&
      topics === ''
    ) {
      setfilter((prev) => ({
        ...prev,
        difficulty: difficulty.value,
        page: 1,
      }));
    } else {
      setfilter((prev) => ({
        ...prev,
        standard: standard.value,
        subject: subject.value,
        topics: topics.map((topic) => topic.value),
        difficulty: difficulty.value,
        page: 1,
      }));
    }
  };

  return (
    <Flex alignItems='center' gap='4' mb='6'>
      <FormControl w='10%' flexShrink='0'>
        <Select
          size='sm'
          options={classOptions}
          placeholder='Class'
          chakraStyles={{
            control: (provided) => ({
              ...provided,
              boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
              border: 'none',
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
      <FormControl w='15%' flexShrink='0'>
        <Select
          options={
            standard !== ''
              ? Object.keys(classData[standard.value]).map((value) => ({
                  value,
                  label: value,
                }))
              : []
          }
          placeholder='Subject'
          size='sm'
          chakraStyles={{
            control: (provided) => ({
              ...provided,
              boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
              border: 'none',
            }),
          }}
          onChange={(e) => {
            if (subject.value !== e.value) {
              setTopics([]);
              setSubject(e);
            }
          }}
          value={subject}
        />
      </FormControl>
      <FormControl w='15%' flexShrink='0'>
        <Select
          size='sm'
          options={difficulties.map((value) => ({ value, label: value }))}
          placeholder='Difficulty'
          chakraStyles={{
            control: (provided) => ({
              ...provided,
              boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
              border: 'none',
            }),
          }}
          onChange={(e) => setDifficulty(e)}
          value={difficulty}
        />
      </FormControl>
      <FormControl minW='35%' grow='1'>
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
          placeholder='Select Topics'
          chakraStyles={{
            multiValue: (provided) => ({
              ...provided,
              flexShrink: '0',
            }),
            valueContainer: (provided) => ({
              ...provided,
              overflowX: 'auto',
              '&::-webkit-scrollbar': { display: 'none' },
              flexWrap: 'nowrap',
            }),
            control: (provided) => ({
              ...provided,
              boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
              border: 'none',
              maxH: '32px',
            }),
          }}
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          value={topics}
          onChange={(val) => setTopics(val)}
        />
      </FormControl>
      <Button
        size='sm'
        bg='brand.400'
        color='brand.600'
        _hover={{ backgroundColor: 'brand.600', color: 'brand.100' }}
        ml='auto'
        flexShrink='0'
        onClick={handleClearAll}
      >
        Clear All
      </Button>
      <Button
        size='sm'
        bg='brand.400'
        color='brand.600'
        _hover={{ backgroundColor: 'brand.600', color: 'brand.100' }}
        ml='auto'
        flexShrink='0'
        onClick={handleApply}
      >
        Apply
      </Button>
    </Flex>
  );
};

export default Filter;
