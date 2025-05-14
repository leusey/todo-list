import { useRef, useState } from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel";
import styled from "styled-components";

const StyledForm = styled.form`
  margin: 10px 0;
  display: flex;
  gap: 8px;
`;

const StyledButton = styled.button`
  font-family: "Arial", sans-serif;
  padding: 8px;
  margin: 5px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-style: ${({ disabled }) => (disabled ? "italic" : "normal")};
`;

function TodoForm({ onAddTodo, isSaving }) {
  const [workingTodo, setWorkingTodo] = useState("");
  const todoTitleInput = useRef();

  function handleAddTodo(event) {
    event.preventDefault();
    onAddTodo({ title: workingTodo, isCompleted: false });
    setWorkingTodo("");
    todoTitleInput.current.focus();
  }

  return (
    <StyledForm onSubmit={handleAddTodo}>
      <TextInputWithLabel
        elementId="todoTitle"
        labelText="Todo"
        ref={todoTitleInput}
        value={workingTodo}
        onChange={(e) => setWorkingTodo(e.target.value)}
      />
      <StyledButton type="submit" disabled={workingTodo === "" || isSaving}>
        {isSaving ? "Saving..." : "Add Todo"}
      </StyledButton>
    </StyledForm>
  );
}

export default TodoForm;
