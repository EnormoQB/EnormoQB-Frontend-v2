import { ChakraProvider } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { Routes, Route } from 'react-router-dom';
import theme from '../styles/theme';
import DashboardHome from './Dashboard/home';
import Dashboard from './Dashboard';
import Pending from './Dashboard/pending';
import Approved from './Dashboard/approved';
import Rejected from './Dashboard/rejected';
import Generate from './Dashboard/generate';
import Contribute from './Dashboard/contribute';
import PreviousPaper from './Dashboard/previousPapers';
import GeneratedPapers from './Dashboard/generatedPapers';
import Home from './Home';

const App = () => {
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
            <Route path='previouspapers' element={<PreviousPaper />} />
            <Route path='generatedpapers' element={<GeneratedPapers />} />
          </Route>
        </Route>
      </Routes>
    </ChakraProvider>
  );
};

export default App;
