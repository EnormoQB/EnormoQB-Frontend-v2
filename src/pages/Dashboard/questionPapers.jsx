import { useEffect, useState } from 'react';
import {
  Tabs,
  TabList,
  TabPanels,
  Box,
  TabPanel,
  Heading,
} from '@chakra-ui/react';
import QuesPapersFilter from '../../components/Filters/quesPapersFilter';
import QuesPaper from '../../components/QuestionPapers/questionPaper';
import {
  usePreviousYearPaperQuery,
  useUserPaperHistoryQuery,
} from '../../redux/services/questionPaperApi';
import DashboardLoader from '../../components/Loaders/DashboardLoader';
import CustomTab from '../../components/Generate/customTab';

const QuestionPapers = () => {
  const [paper, setpaper] = useState([]);
  const [history, sethistory] = useState([]);
  const { data, isLoading, isFetching } = usePreviousYearPaperQuery();

  const {
    data: historydata,
    isLoading: historyLoading,
    isFetching: historyFetching,
  } = useUserPaperHistoryQuery();

  useEffect(() => {
    if (data) {
      setpaper(data.data);
    }
    if (historydata) {
      sethistory(historydata.data);
    }
  }, [data, historydata]);

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
      <Box w='full'>
        <Tabs isLazy defaultIndex={0} size='lg'>
          <TabList>
            <CustomTab>Previous Year</CustomTab>
            <CustomTab>Your Papers</CustomTab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <QuesPapersFilter />
              {isLoading || isFetching || paper.length === 0 ? (
                <DashboardLoader />
              ) : (
                paper.map((ques, index) => (
                  <QuesPaper key={index} data={ques} />
                ))
              )}
            </TabPanel>
            <TabPanel>
              <QuesPapersFilter />
              {isLoading || isFetching || paper.length === 0 ? (
                <DashboardLoader />
              ) : (
                history.map((ques, index) => (
                  <QuesPaper key={index} data={ques} />
                ))
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default QuestionPapers;
