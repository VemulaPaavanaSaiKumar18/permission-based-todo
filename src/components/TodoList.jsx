import React, { useState } from 'react';

const TodoList = ({ userRole, features }) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    text: '',
    dueDate: '',
    priority: 'medium',
    tags: ''
  });

  const addTodo = (e) => {
    e.preventDefault();
    if (todos.length >= features.maxTodos) {
      alert(`You can only create ${features.maxTodos} todos with a ${userRole} account`);
      return;
    }

    setTodos([...todos, {
      id: Date.now(),
      ...newTodo,
      tags: newTodo.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    }]);
    setNewTodo({ text: '', dueDate: '', priority: 'medium', tags: '' });
  };

  const deleteTodo = (id) => {
    if (!features.canDelete) return;
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id, field, value) => {
    if (!features.canEdit) return;
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, [field]: value } : todo
    ));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Todo List</h2>
        <span className="text-sm text-gray-600">
          {todos.length} / {features.maxTodos} todos
        </span>
      </div>

      <form onSubmit={addTodo} className="mb-6">
        <div className="space-y-4">
          <input
            type="text"
            value={newTodo.text}
            onChange={(e) => setNewTodo({ ...newTodo, text: e.target.value })}
            placeholder="What needs to be done?"
            className="w-full p-2 border rounded"
            required
          />
          
          {features.canAddDueDate && (
            <input
              type="date"
              value={newTodo.dueDate}
              onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
              className="w-full p-2 border rounded"
            />
          )}
          
          {features.canAddPriority && (
            <select
              value={newTodo.priority}
              onChange={(e) => setNewTodo({ ...newTodo, priority: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          )}
          
          {features.canAddTags && (
            <input
              type="text"
              value={newTodo.tags}
              onChange={(e) => setNewTodo({ ...newTodo, tags: e.target.value })}
              placeholder="Tags (comma-separated)"
              className="w-full p-2 border rounded"
            />
          )}
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            disabled={todos.length >= features.maxTodos}
          >
            Add Todo
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {todos.map(todo => (
          <div key={todo.id} className="p-4 border rounded">
            {features.canEdit ? (
              <input
                type="text"
                value={todo.text}
                onChange={(e) => editTodo(todo.id, 'text', e.target.value)}
                className="w-full p-2 mb-2"
              />
            ) : (
              <div className="font-medium">{todo.text}</div>
            )}
            
            {features.canAddDueDate && (
              <div className="text-sm text-gray-600">
                Due: {todo.dueDate || 'Not set'}
              </div>
            )}
            
            {features.canAddPriority && (
              <div className="text-sm text-gray-600 capitalize">
                Priority: {todo.priority}
              </div>
            )}
            
            {features.canAddTags && todo.tags.length > 0 && (
              <div className="flex gap-2 mt-2">
                {todo.tags.map((tag, index) => (
                  <span key={index} className="text-sm bg-gray-200 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            {features.canDelete && (
              <button
                onClick={() => deleteTodo(todo.id)}
                className="mt-2 text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;