import React from 'react';
import {StatusBar} from 'react-native';
import {Auth} from './src/screens/auth/auth';

function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Auth />
    </>
  );
}

export default App;
