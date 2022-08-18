import React, { useState, useEffect, useRef } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { useGetQuestionsQuery } from '../../redux/services/questionApi';
import DashboardLoader from '../../components/Loaders/DashboardLoader';
import Filter from '../../components/Filters';
import Question from '../../components/QuestionAccordion';
import Page from '../../components/Pagination/Page';
import Empty from '../../components/Empty';

const Approved = () => {
  const isInitialLoad = useRef(true);
  const [questions, setQuestions] = useState([]);
  const [filter, setfilter] = useState({ status: 'approved', page: 1 });
  const [metadata, setMetaData] = useState([]);
  const { data, isLoading, isFetching } = useGetQuestionsQuery(filter);

  useEffect(() => {
    if (data) {
      setQuestions(data.data.questions || []);
      setMetaData(data.data.meta || []);
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
          {questions.length === 0 && <Empty textContent='No Data Found!' />}
          {questions.length !== 0 ? (
            <>
              {questions.map((ques) => (
                <Question
                  key={ques._id}
                  data={ques}
                  questions={questions}
                  show
                />
              ))}
              <Page
                pageNumber={filter.page}
                setPageNumber={(page) => {
                  setfilter((prev) => ({ ...prev, page }));
                }}
                metadata={metadata}
              />
            </>
          ) : (
            <br />
          )}
        </>
      )}
    </Box>
  );
};

export default Approved;
