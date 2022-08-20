import React, { useState, useEffect, useRef } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import Question from '../../components/QuestionAccordion';
import Filter from '../../components/Filters';
import { useGetQuestionsQuery } from '../../redux/services/questionApi';
import DashboardLoader from '../../components/Loaders/DashboardLoader';
import Page from '../../components/Pagination';
import Empty from '../../components/Empty';

const Pending = () => {
  const isInitialLoad = useRef(true);
  const [questions, setQuestions] = useState([]);
  const [filter, setfilter] = useState({ status: 'pending', page: 1 });
  const [metadata, setMetaData] = useState([]);
  const { data, isLoading, isFetching } = useGetQuestionsQuery({
    refetchOnMountOrArgChange: true,
  });

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
          Pending
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
                  removeQuestion={() => {
                    setQuestions((prev) =>
                      prev.filter((item) => item._id !== ques._id),
                    );
                  }}
                  similarQues={ques.similarQuestions}
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
          ) : null}
        </>
      )}
    </Box>
  );
};

export default Pending;
