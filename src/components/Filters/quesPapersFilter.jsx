import { useState } from 'react';
import { Flex, FormControl, Button } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { classOptions, boardOptions } from '../Generate/config';
import classData from '../../data/classData';

const QuesPapersFilter = ({
  setFilter,
  filter,
  showBoard,
  validateApply,
  noClear,
}) => {
  const [standard, setStandard] = useState(
    filter.standard === '' ? '' : { value: filter.standard, label: 'X' },
  );
  const [subject, setSubject] = useState(
    filter.subject === '' ? '' : { value: filter.subject, label: 'Maths' },
  );
  const [board, setBoard] = useState('');

  const handleApply = () => {
    if (!validateApply()) {
      return;
    }
    setFilter((prev) => ({
      ...prev,
      standard: standard ? standard.value : '',
      subject: subject ? subject.value : '',
      board: board ? board.value : '',
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
          value={standard}
          onChange={(e) => {
            setStandard(e);
            setSubject('');
            setBoard('');
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
              setSubject(e);
            }
          }}
          value={subject}
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
