import { ChakraProvider } from '@chakra-ui/react';
import { Helmet } from 'react-helmet';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import theme from '../styles/Home/theme';
import Dashboard from './Dashboard';
import Home from './Home';

const App = () => (
  <ChakraProvider theme={theme}>
    <Helmet>
      <meta charSet='utf-8' />
      <title>EnormoQB</title>
      <link rel='icon' href='favicon.ico' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
    </Helmet>
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<Home />} />
          <Route path='dashboard' element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);

export default App;
