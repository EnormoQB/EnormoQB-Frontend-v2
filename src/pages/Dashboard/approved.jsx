import { Box } from '@chakra-ui/react';
import AQuestions from '../../components/Accepted/AQuestions';
import { Value } from '../../components/Accepted/config';

const Approved = () => {
  return (
    <Box>
      {Value.map((value) => (
        <AQuestions
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
        />
      ))}
    </Box>
  );
};

export default Approved;
