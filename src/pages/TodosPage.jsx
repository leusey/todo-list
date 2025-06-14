import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import TodoForm from "../features/TodoForm";
import TodoList from "../features/TodoList/TodoList";
import TodosViewForm from "../features/TodosViewForm";
import styles from "./TodosPage.module.css";

function TodosPage({
  todoState,
  addTodo,
  completeTodo,
  updateTodo,
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  queryString,
  setQueryString,
  dispatch,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const itemsPerPage = 15;
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const indexOfFirstTodo = (currentPage - 1) * itemsPerPage;

  const filteredTodoList = todoState.todoList.filter((todo) => {
    return todo.title
      .toLowerCase()
      .includes(queryString.toLowerCase());
  });
  
  const totalPages = Math.ceil(filteredTodoList.length / itemsPerPage);
  const paginatedTodos = filteredTodoList.slice(
    indexOfFirstTodo,
    indexOfFirstTodo + itemsPerPage
  );

  useEffect(() => {
    if (totalPages > 0) {
      const isInvalidPage =
        isNaN(currentPage) || currentPage < 1 || currentPage > totalPages;

      if (isInvalidPage) {
        navigate("/");
      }
    }
  }, [currentPage, totalPages, navigate]);

  const handlePreviousPage = () => {
    const newPage = Math.max(1, currentPage - 1);
    setSearchParams({ page: `${newPage}` });
  };

  const handleNextPage = () => {
    const newPage = Math.min(totalPages, currentPage + 1);
    setSearchParams({ page: `${newPage}` });
  };

  return (
    <div className={styles.pageContainer}>
      <TodoForm onAddTodo={addTodo} isSaving={todoState.isSaving} />

      <TodoList
        todoList={paginatedTodos}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        isLoading={todoState.isLoading}
      />

      <div className={styles.paginationControls}>
        <button disabled={currentPage === 1} onClick={handlePreviousPage}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button disabled={currentPage === totalPages} onClick={handleNextPage}>
          Next
        </button>
      </div>

      <hr />

      <TodosViewForm
        sortField={sortField}
        setSortField={setSortField}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        queryString={queryString}
        setQueryString={setQueryString}
      />

      {todoState.errorMessage && (
        <div className={styles.errorMessage}>
          <hr />
          <p>{todoState.errorMessage}</p>
          <button onClick={() => dispatch({ type: "clearError" })}>
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}

export default TodosPage;
