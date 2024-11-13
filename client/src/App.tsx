import { useState, MouseEvent } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import TestComponent2 from './TestComponent2';
import TestComponent1 from './TestComponent1';
import Hero from './components/homepage/Hero';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
    const [open, setOpen] = useState(false);
    const [gridSpacing, setGridSpacing] = useState<number>(2);
    const [gridData, setGridData] = useState<DataArray>([])

    const handleClose = () => setOpen(false);

    const handleOpen = (e: MouseEvent) => {
        e.stopPropagation();
        setOpen(true)
    }

    const onHandleAddGridSpacing = (value: 'inc' | 'dec') => {
        setGridSpacing(spacing => {
            if (value === 'dec' && spacing > 2) {
                return spacing - 1;
            } else if (value === 'inc') {
                return spacing + 1;
            }
            return spacing;
        });
    }


    return (
        <>
            <CssBaseline />
            <Router>
            <Routes>
                <Route path="/" element={<Hero handleOpen={handleOpen} handleClose={handleClose} open={open} onHandleAddGridSpacing={onHandleAddGridSpacing} gridSpacing={gridSpacing} />} />
                <Route path="/test1" element={<TestComponent1 />} />
                <Route path="/test2" element={<TestComponent2 />} />
            </Routes>
        </Router>
        </>
        
)};

export default App;
