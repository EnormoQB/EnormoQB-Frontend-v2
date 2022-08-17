import React, { useState, useEffect, useRef } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { useGetQuestionsQuery } from '../../redux/services/questionApi';
import Question from '../../components/Accordion';
import DashboardLoader from '../../components/Loaders/DashboardLoader';
import Filter from '../../components/Filters';

const Approved = () => {
  const isInitialLoad = useRef(true);
  const [questions, setQuestions] = useState([]);
  const [filter, setfilter] = useState({ status: 'approved' });

  const { data, isLoading, isFetching } = useGetQuestionsQuery(filter);

  useEffect(() => {
    if (data) {
      setQuestions(data.data.questions || []);
      isInitialLoad.current = false;
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
      <Filter setfilter={setfilter} />
      {isLoading || isFetching || isInitialLoad.current ? (
        <DashboardLoader height='calc(70vh - 64px)' />
      ) : (
        <>
          {questions.length === 0 && <>No data!</>}
          {questions.length !== 0 &&
            questions.map((ques) => <Question key={ques._id} data={ques} />)}
        </>
      )}
    </Box>
  );
};

export default Approved;
