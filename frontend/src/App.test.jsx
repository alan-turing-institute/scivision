import { render, screen } from '@testing-library/react';
import { /* App , */ sample_without_replacement } from './App';

require("@babel/core").transform("code", {
    plugins: ["transform-require-context"]
});

/*
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
*/

test('sample without replacement', () => {
    expect(sample_without_replacement(['a', 'b', 'c'], 3)).toBe(
        ['a', 'b', 'c']
    );
});
