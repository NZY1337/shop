import App from './App';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

test('checks if header is present', () => {
  render(<App />);
    const headerElement = screen.getByRole('heading', { name: /vite \+ react/i });
  expect(headerElement).toBeInTheDocument();
});

test('increments count when button is clicked', () => {
    render(<App />);
    const buttonElement = screen.getByText(/count is 0/i);
    fireEvent.click(buttonElement);
    expect(buttonElement).toHaveTextContent('count is 1');
});

test('login button is present', () => {
    render(<App />);
    const loginButton = screen.getByText(/login as alice/i);
    expect(loginButton).toBeInTheDocument();
});

test('register button is present', () => {
    render(<App />);
    const registerButton = screen.getByText(/register/i);
    expect(registerButton).toBeInTheDocument();
});

// test('fetchData function is called when register button is clicked', async () => {
//     render(<App />);
//     const registerButton = screen.getByText(/register/i);
//     fireEvent.click(registerButton);
//     // Assuming fetchData logs the response data
//     await screen.findByText(/response data/i);
// });