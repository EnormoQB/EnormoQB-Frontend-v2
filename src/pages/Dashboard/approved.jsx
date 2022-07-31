import { useState } from 'react';
import { Box } from '@chakra-ui/react';
import {
  questionsApi,
  useGetQuestionsQuery,
} from '../../redux/services/questionApi';
import Question from '../../components/Accordion';

const Approved = () => {
  const response = questionsApi.endpoints.getQuestions.useQuery(
    ({}, { refetchOnMountOrArgChange: true, refetchOnFocus: true }),
  );
  // const { data = [] } = useGetQuestionsQuery();
  const [questions] = useState(response.data.data.items);

  console.log(questions);
  return (
    <Box>
      {questions.map((ques) => (
        <Question key={ques._id} data={ques} />
      ))}
    </Box>
  );
};

export default Approved;
