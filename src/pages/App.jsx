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
import ProtectedRoute from '../HOC/ProtectedRoute';
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
          <Route
            path='dashboard'
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={
                <ProtectedRoute>
                  <DashboardHome />
                </ProtectedRoute>
              }
            />
            <Route
              path='pending'
              element={
                <ProtectedRoute>
                  <Pending />
                </ProtectedRoute>
              }
            />
            <Route
              path='approved'
              element={
                <ProtectedRoute>
                  <Approved />
                </ProtectedRoute>
              }
            />
            <Route
              path='rejected'
              element={
                <ProtectedRoute>
                  <Rejected />
                </ProtectedRoute>
              }
            />
            <Route
              path='generate'
              element={
                <ProtectedRoute>
                  <Generate />
                </ProtectedRoute>
              }
            />
            <Route
              path='contribute'
              element={
                <ProtectedRoute>
                  <Contribute />
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>
      </Routes>
    </ChakraProvider>
  );
};

export default App;
