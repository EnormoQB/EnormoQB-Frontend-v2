import { useState } from 'react';
import { FormControl, FormLabel, Box, Select } from '@chakra-ui/react';
import classData from '../../data/classData';

const GenerateForm = () => {
  const [standard, setStandard] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState('');

  console.log(standard);
  console.log(subject);

  // const onSelectClass = (val) => {
  //   setStandard(val);
  //   if (val === 'X') {
  //     setSubjects(class10);
  //   } else {
  //     setSubjects(class12);
  //   }
  // };

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
          // onChange={(e) => onSelectClass(e.target.value)}
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
    </Box>
  );
};

export default GenerateForm;
