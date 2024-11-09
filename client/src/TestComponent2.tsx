import React from 'react';
import { Container } from '@mui/material';
import Navigation from './components/navigation';

const TestComponent2: React.FC = () => {
  return (
    <Container maxWidth="xl">
        <Navigation />
      <h2>Test Component 2</h2>
      <p>This is the first test component.</p>
    </Container>
  );
};

export default TestComponent2;