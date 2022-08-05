import React, { useState, useEffect } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import Question from '../../components/Accordion';
import Filter from '../../components/Filters';
import { useGetQuestionsQuery } from '../../redux/services/questionApi';
import DashboardLoader from '../../components/Loaders/DashboardLoader';

const Rejected = () => {
  const [questions, setQuestions] = useState([]);
  const { data, isLoading, isFetching } = useGetQuestionsQuery({
    status: 'rejected',
  });

  useEffect(() => {
    if (data) {
      setQuestions(data.data.questions);
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
          Rejected
        </mark>
        Questions
      </Heading>
      <Filter />
      {isLoading || isFetching || questions.length === 0 ? (
        <DashboardLoader />
      ) : (
        <>
          {questions.map((ques) => (
            <Question key={ques._id.$oid} data={ques} />
          ))}
        </>
      )}
    </Box>
  );
};

export default Rejected;
