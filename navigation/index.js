import React from 'react';
import { AuthProvider } from './AuthProvider';
import { AuthStack } from './AuthStack';
import Routes from './Routes';

const Providers = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default Providers;