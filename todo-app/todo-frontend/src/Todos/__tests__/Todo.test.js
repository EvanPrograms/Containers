// src/Todos/__tests__/Todo.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import this line
import Todo from '../Todo';

test('renders todo item and handles actions', () => {
  const mockTodo = { text: 'Test Todo', done: false, _id: '1' };
  const mockDeleteTodo = jest.fn();
  const mockCompleteTodo = jest.fn();

  render(
    <Todo todo={mockTodo} deleteTodo={mockDeleteTodo} completeTodo={mockCompleteTodo} />
  );

  expect(screen.getByText(/Test Todo/i)).toBeInTheDocument();
  expect(screen.getByText(/This todo is not done/i)).toBeInTheDocument();

  fireEvent.click(screen.getByText(/Set as done/i));
  expect(mockCompleteTodo).toHaveBeenCalledWith(mockTodo);

  fireEvent.click(screen.getByText(/Delete/i));
  expect(mockDeleteTodo).toHaveBeenCalledWith(mockTodo);
});
