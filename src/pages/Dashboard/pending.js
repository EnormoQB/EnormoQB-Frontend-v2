import { Box } from '@chakra-ui/react';
import { Value } from '../../components/Accordion/config';
import Questions from '../../components/Accordion/Questions';

const Pending = () => {
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
        />
      ))}
    </Box>
  );
};

export default Pending;
