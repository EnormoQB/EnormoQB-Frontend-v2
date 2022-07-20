import { Box } from '@chakra-ui/react';
import { Value } from '../../components/Accordion/config';
import Questions from '../../components/Accordion/Questions';
// eslint-disable-next-line import/order
import { BsCheck } from 'react-icons/bs';

const Approved = () => {
  return (
    <Box>
      {Value.map((value) => (
        <Questions
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
          // color='green'
          color='green.400'
          iconused={<BsCheck />}
          pending='0'
        />
      ))}
    </Box>
  );
};

export default Approved;
