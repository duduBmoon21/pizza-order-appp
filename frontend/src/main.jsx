import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // Import Provider
import App from './App.jsx';
import store from './redux/store.js'; // Import your Redux store
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>  {/* Wrap App with Provider */}
      <App />
    </Provider>
  </StrictMode>,
);
