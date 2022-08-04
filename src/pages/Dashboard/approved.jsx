import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { useGetQuestionsQuery } from '../../redux/services/questionApi';
import Question from '../../components/Accordion';
import DashboardLoader from '../../components/Loaders/DashboardLoader';

const Approved = () => {
  const [questions, setQuestions] = useState([]);
  const { data, isLoading, isFetching } = useGetQuestionsQuery();

  useEffect(() => {
    if (data) {
      setQuestions(data.data.questions);
    }
  }, [data]);

  return (
    <Box>
      {isLoading || isFetching || questions.length === 0 ? (
        <DashboardLoader />
      ) : (
        questions.map((ques) => <Question key={ques._id} data={ques} />)
      )}
    </Box>
  );
};

export default Approved;
