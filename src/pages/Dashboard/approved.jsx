import React, { useState, useEffect } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { useGetQuestionsQuery } from '../../redux/services/questionApi';
import Question from '../../components/Accordion';
import DashboardLoader from '../../components/Loaders/DashboardLoader';

const Approved = () => {
  const [questions, setQuestions] = useState([]);
  const { data, isLoading, isFetching } = useGetQuestionsQuery();

  useEffect(() => {
    if (data) {
      setQuestions(data.data.items);
    }
  }, [data]);

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
          Approved
        </mark>
        Questions
      </Heading>
      {isLoading || isFetching || questions.length === 0 ? (
        <DashboardLoader />
      ) : (
        questions.map((ques) => <Question key={ques._id} data={ques} />)
      )}
    </Box>
  );
};

export default Approved;
