import React, { useState, useEffect } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import Question from '../../components/Accordion';
import Filter from '../../components/Filters';
import { useGetQuestionsQuery } from '../../redux/services/questionApi';
import DashboardLoader from '../../components/Loaders/DashboardLoader';

const Pending = () => {
  const [questions, setQuestions] = useState([]);
  const [filter, setfilter] = useState({
    status: 'pending',
  });

  const { data, isLoading, isFetching } = useGetQuestionsQuery(filter);

  useEffect(() => {
    if (data) {
      setQuestions(data.data.questions || []);
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
          Pending
        </mark>
        Questions
      </Heading>
      <Filter setfilter={setfilter} />
      {isLoading || isFetching ? (
        <DashboardLoader height='calc(70vh - 64px)' />
      ) : (
        <>
          {questions.length === 0 && <>No data!</>}
          {questions.length !== 0 &&
            questions.map((ques) => (
              <Question
                key={ques._id.$oid}
                data={ques}
                questions={questions}
                show
              />
            ))}
        </>
      )}
    </Box>
  );
};

export default Pending;
