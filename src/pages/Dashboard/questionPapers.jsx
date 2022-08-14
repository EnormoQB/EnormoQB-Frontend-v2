import { useEffect, useState } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import QuesPapersFilter from '../../components/Filters/quesPapersFilter';
import QuesPaper from '../../components/QuestionPapers/questionPaper';
import dummy from '../../components/QuestionPapers/config';
import { usePreviousYearPaperQuery } from '../../redux/services/questionPaperApi';
import DashboardLoader from '../../components/Loaders/DashboardLoader';

const QuestionPapers = () => {
  const [paper, setpaper] = useState([]);
  const { data, isLoading, isFetching } = usePreviousYearPaperQuery();

  useEffect(() => {
    if (data) {
      setpaper(data.data);
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
          Question
        </mark>
        Papers
      </Heading>
      <QuesPapersFilter />
      {/* {dummy.map((ques) => (
        <QuesPaper key={ques._id.$oid} data={ques} />
      ))} */}

      {isLoading || isFetching || paper.length === 0 ? (
        <DashboardLoader />
      ) : (
        paper.map((ques, index) => <QuesPaper key={index} data={ques} />)
      )}
    </Box>
  );
};

export default QuestionPapers;
