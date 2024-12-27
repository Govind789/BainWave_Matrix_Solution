import { useState } from 'react';
import './App.css';
import MainPage from './components/MainPage';
import TodoList from './components/TodoList';

function App() {
  const [createTodo, setcreateTodo] = useState(false);

  return (
    <>
      <div className="h-screen bg-gradient-to-r from-sky-500 to-indigo-800">
        {createTodo ? (
          <TodoList createTodo={createTodo}/>
        ) : (
          <MainPage setcreateTodo={setcreateTodo} />
        )}
      </div>
    </>
  );
}

export default App;
