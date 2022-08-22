import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Flex, FormControl, Button } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { classOptions, boardOptions } from '../Generate/config';

const QuesPapersFilter = ({
  setFilter,
  filter,
  showBoard,
  validateApply,
  noClear,
}) => {
  const subjectsData = useSelector((state) => state.userState.subjectsData);
  const [standard, setStandard] = useState({
    value: filter.standard,
    label: 'X',
  });
  const [subject, setSubject] = useState({
    value: filter.subject,
    label: 'English',
  });
  const [board, setBoard] = useState('');

  const handleApply = () => {
    if (!validateApply(standard, subject)) {
      return;
    }
    setFilter((prev) => ({
      ...prev,
      standard: standard ? standard.value : '',
      subject: subject ? subject.value : '',
      board: board ? board.value : '',
      initialLoad: false,
    }));
  };

  const handleClearAll = () => {
    setFilter({
      standard: '',
      subject: '',
      board: '',
    });
    setStandard('');
    setSubject('');
    setBoard('');
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
          value={filter.initialLoad ? '' : standard}
          onChange={(e) => {
            setStandard(e);
            setSubject('');
            setBoard('');
            if (filter.initialLoad) {
              setFilter((prev) => ({
                ...prev,
                initialLoad: false,
              }));
            }
          }}
        />
      </FormControl>
      <FormControl w='15%' flexShrink='0'>
        <Select
          options={
            standard && standard.value
              ? Object.keys(subjectsData[standard.value]).map((value) => ({
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
            setSubject(e);
            if (filter.initialLoad) {
              setFilter((prev) => ({
                ...prev,
                initialLoad: false,
              }));
            }
          }}
          value={filter.initialLoad ? '' : subject}
        />
      </FormControl>

      {showBoard === 1 && (
        <FormControl w='15%' flexShrink='0'>
          <Select
            size='sm'
            options={boardOptions}
            placeholder='Board'
            chakraStyles={{
              control: (provided) => ({
                ...provided,
                boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                border: 'none',
              }),
            }}
            onChange={(e) => setBoard(e)}
            value={board}
          />
        </FormControl>
      )}
      {!noClear && (
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
      )}
      <Button
        size='sm'
        bg='brand.400'
        color='brand.600'
        _hover={{ backgroundColor: 'brand.600', color: 'brand.100' }}
        ml={noClear && 'auto'}
        flexShrink='0'
        onClick={handleApply}
      >
        Apply
      </Button>
    </Flex>
  );
};

export default QuesPapersFilter;

QuesPapersFilter.defaultProps = {
  validateApply: () => true,
  noClear: false,
};
