import { Box, Heading } from '@chakra-ui/react';
import QuesPapersFilter from '../../components/Filters/quesPapersFilter';
import QuesPaper from '../../components/QuestionPapers/questionPaper';
import dummy from '../../components/QuestionPapers/config';

const QuestionPapers = () => {
  return (
    <Box>
      <Heading as='h1' fontSize='4xl' fontWeight='bold' mb={10}>
        <mark
          style={{
            backgroundColor: '#C3D0F9',
            borderRadius: '25px',
            padding: '0 12px 2px 12px',
            marginRight: '3px',
          }}
        >
          Question
        </mark>
        Papers
      </Heading>
      <QuesPapersFilter />
      {dummy.map((ques) => (
        <QuesPaper key={ques._id.$oid} data={ques} />
      ))}
    </Box>
  );
};

export default QuestionPapers;
