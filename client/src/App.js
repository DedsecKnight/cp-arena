import React from 'react';
import './App.css';
import CPArena from './CPArena';

import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <CPArena />
    </Provider>
  );
  
}

export default App;
