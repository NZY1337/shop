import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import TestComponent2 from './TestComponent2';
import TestComponent1 from './TestComponent1';
import Hero from './components/homepage/Hero';

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/test1" element={<TestComponent1 />} />
            <Route path="/test2" element={<TestComponent2 />} />
        </Routes>
    </Router>
    )};

export default App;
