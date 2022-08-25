import { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  Tabs,
  TabList,
  TabPanels,
  Box,
  TabPanel,
  Heading,
} from '@chakra-ui/react';
import QuesPapersFilter from '../../components/Filters/quesPapersFilter';
import {
  usePreviousYearPaperQuery,
  useUserPaperHistoryQuery,
} from '../../redux/services/questionPaperApi';
import DashboardLoader from '../../components/Loaders/DashboardLoader';
import CustomTab from '../../components/Generate/customTab';
import QuesPaper from '../../components/QuestionPapers';
import Empty from '../../components/Empty';

const QuestionPapers = () => {
  const [paper, setpaper] = useState([]);
  const [history, sethistory] = useState([]);
  const user = useSelector((state) => state.userState.user);
  const userType = useMemo(
    () => user?.userType.role.toLowerCase() || 'contributor',
    [user],
  );
  const [filter, setFilter] = useState({
    standard: '',
    subject: '',
    board: '',
    initialLoad: true,
  });

  const { data, isLoading, isFetching } = usePreviousYearPaperQuery(filter);
  const { data: historydata } = useUserPaperHistoryQuery(filter);

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
        {userType === 'exam-setter' || userType === 'developer' ? (
          <Tabs isLazy defaultIndex={0} size='lg'>
            <TabList>
              <CustomTab>Previous Year</CustomTab>
              <CustomTab>Your Papers</CustomTab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <QuesPapersFilter
                  filter={filter}
                  setFilter={setFilter}
                  showBoard={1}
                />
                {isLoading || isFetching ? (
                  <DashboardLoader height='55vh' />
                ) : (
                  <>
                    {paper.length === 0 && (
                      <Empty
                        textContent='No Data Found!'
                        containerHeight='55vh'
                      />
                    )}
                    {paper.length !== 0 && (
                      <>
                        {paper.map((ques, index) => (
                          <QuesPaper key={index} data={ques} />
                        ))}
                      </>
                    )}
                  </>
                )}
              </TabPanel>
              <TabPanel>
                <QuesPapersFilter
                  filter={filter}
                  setFilter={setFilter}
                  showBoard={1}
                />
                {isLoading || isFetching ? (
                  <DashboardLoader height='55vh' />
                ) : (
                  <>
                    {history.length === 0 && (
                      <Empty
                        textContent='No Data Found!'
                        containerHeight='55vh'
                      />
                    )}
                    {history.length !== 0 && (
                      <>
                        {history.map((ques, index) => (
                          <QuesPaper key={index} data={ques} />
                        ))}
                      </>
                    )}
                  </>
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        ) : (
          <>
            <QuesPapersFilter
              filter={filter}
              setFilter={setFilter}
              showBoard={1}
            />
            {isLoading || isFetching ? (
              <DashboardLoader height='55vh' />
            ) : (
              <>
                {paper.length === 0 && (
                  <Empty textContent='No Data Found!' containerHeight='55vh' />
                )}
                {paper.length !== 0 && (
                  <>
                    {paper.map((ques, index) => (
                      <QuesPaper key={index} data={ques} />
                    ))}
                  </>
                )}
              </>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default QuestionPapers;
