import { useRef, useState } from "react";

function TodoForm({ onAddTodo }) {
  const [workingTodo, setWorkingTodo] = useState("");
  const todoTitleInput = useRef();

  function handleAddTodo(event) {
    event.preventDefault();
    onAddTodo(workingTodo);
    setWorkingTodo("");
    todoTitleInput.current.focus();
  }

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Todo</label>
      <input
        id="todoTitle"
        type="text"
        name="title"
        ref={todoTitleInput}
        value={workingTodo}
        onChange={(e) => setWorkingTodo(e.target.value)}
      ></input>
      <button type="submit" disabled={workingTodo === ""}>
        Add Todo
      </button>
    </form>
  );
}

export default TodoForm;
