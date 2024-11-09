import React from 'react';
import { Container } from '@mui/material';
import Navigation from './components/navigation';

const TestComponent1: React.FC = () => {
  return (
    <Container maxWidth="xl">
        <Navigation />
      <h2>Test Component 1</h2>
      <p>This is the first test component.</p>
    </Container>
  );
};

export default TestComponent1;