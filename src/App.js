import './App.css';
import { useEffect, useState } from 'react';

function App() {
  let [todos, setTodos] = useState([])

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((json) => {
        console.log('json :>> ', json);
        setTodos(json.users)
      })
  }, [])

  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((json) => {
        console.log('json :>> ', json);
        // setTodos(json.users)
      })
  }, [])

  return (
    <div className="App">
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
