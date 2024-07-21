import React from 'react';
import Shopping from './src/views/shopping/Shopping';
import {Provider} from 'react-redux';
import store from './src/utils/Store';

const App = () => {
  return (
    <Provider store={store}>
      <Shopping />
    </Provider>
  );
};

export default App;
