import { Box } from '@chakra-ui/react';
import { BsX } from 'react-icons/bs';
import { Value } from '../../components/Accordion/config';
import Question from '../../components/Accordion';

const Rejected = () => {
  return (
    <Box>
      {Value.map((value) => (
        <Question
          key={value.id}
          question={value.question}
          option1={value.option1}
          option2={value.option2}
          option3={value.option3}
          option4={value.option4}
          answer={value.answer}
          standard={value.standard}
          subject={value.subject}
          chapter={value.chapter}
          difficulty={value.difficulty}
          imageurl={value.imageurl}
          alt={value.alt}
          color='gray.400'
          iconused={<BsX />}
          pending='0'
        />
      ))}
    </Box>
  );
};

export default Rejected;
