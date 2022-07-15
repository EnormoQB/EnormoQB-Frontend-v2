import { ColorModeScript } from '@chakra-ui/react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import './styles/index.scss';

const container = document.getElementById('root');

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ColorModeScript />
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
  container,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
