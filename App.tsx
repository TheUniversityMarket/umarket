import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import Navigator from './src/navigation/Navigator';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Navigator />
    </AuthProvider>
  );
};

export default App;


