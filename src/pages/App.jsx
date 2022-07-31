import { ChakraProvider } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import theme from '../styles/theme';
import DashboardHome from './Dashboard/home';
import Dashboard from './Dashboard';
import Pending from './Dashboard/pending';
import Approved from './Dashboard/approved';
import Rejected from './Dashboard/rejected';
import Generate from './Dashboard/generate';
import Contribute from './Dashboard/contribute';
import QuestionPapers from './Dashboard/questionPapers';
import Home from './Home';
import { questionsApi } from '../redux/services/questionApi';

const App = () => {
  const response = questionsApi.endpoints.getQuestions.useQuery(
    ({}, { refetchOnMountOrArgChange: true, refetchOnFocus: true }),
  );
  console.log(response);
  return (
    <ChakraProvider theme={theme}>
      <Helmet>
        <title>EnormoQB</title>
      </Helmet>
      <Routes>
        <Route path='/'>
          <Route index element={<Home />} />
          <Route path='dashboard' element={<Dashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path='pending' element={<Pending />} />
            <Route path='approved' element={<Approved />} />
            <Route path='rejected' element={<Rejected />} />
            <Route path='generate' element={<Generate />} />
            <Route path='contribute' element={<Contribute />} />
            <Route path='questionpapers' element={<QuestionPapers />} />
          </Route>
        </Route>
      </Routes>
    </ChakraProvider>
  );
};

export default App;
