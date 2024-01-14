// Todolist.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import Todolist from './Todolist';

// Mocking local storage
beforeAll(() => {
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn(),
      setItem: jest.fn(),
    },
    writable: true,
  });
});

test('renders Todolist component', () => {
  render(<Todolist />);

  // Check if the component renders without errors
  expect(screen.getByText('TO-DO LIST')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Add a new task')).toBeInTheDocument();
  expect(screen.getByText('Add')).toBeInTheDocument();
  // Add more assertions based on your component structure
});

test('adds a new task', () => {
  render(<Todolist />);
  const input = screen.getByPlaceholderText('Add a new task');
  const addButton = screen.getByText('Add');

  fireEvent.change(input, { target: { value: 'New Task' } });
  fireEvent.click(addButton);

  expect(screen.getByText('New Task')).toBeInTheDocument();
  expect(window.localStorage.setItem).toHaveBeenCalledWith(
    'localTasks',
    JSON.stringify([{ id: expect.any(Number), todo: 'New Task' }])
  );
});

test('edits a task', () => {
  render(<Todolist />);
  const editButton = screen.getByText('Edit');

  fireEvent.click(editButton);

  expect(screen.getByDisplayValue('The task to edit')).toBeInTheDocument();
});

test('updates a task', () => {
  render(<Todolist />);
  const updateButton = screen.getByText('Update');

  fireEvent.click(updateButton);

  expect(screen.getByText('Updated Task')).toBeInTheDocument();
  expect(window.localStorage.setItem).toHaveBeenCalledWith(
    'localTasks',
    expect.stringContaining('Updated Task')
  );
});

test('deletes a task', () => {
  render(<Todolist />);
  const deleteButton = screen.getByText('Delete');

  fireEvent.click(deleteButton);

  expect(screen.queryByText('Task to delete')).not.toBeInTheDocument();
  expect(window.localStorage.setItem).toHaveBeenCalledWith(
    'localTasks',
    JSON.stringify([]) // Assuming all tasks are deleted
  );
});

test('checks/unchecks a task', () => {
  render(<Todolist />);
  const checkbox = screen.getByRole('checkbox');

  fireEvent.click(checkbox);

  expect(screen.getByText('Task with status change')).toHaveStyle('text-decoration: line-through');
  expect(window.localStorage.setItem).toHaveBeenCalledWith(
    'localTasks',
    expect.stringContaining('"completed":true')
  );
});
