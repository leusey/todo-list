import { useReducer, useEffect, useCallback, useState } from "react";
import About from "./pages/About";
import Header from "./shared/Header";
import NotFound from "./pages/NotFound";
import TodosPage from "./pages/TodosPage";
import styles from "./App.module.css";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";

import {
  reducer as todosReducer,
  actions as todoActions,
  initialState as initialTodosState,
} from "./reducers/todos.reducer";

const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${
  import.meta.env.VITE_TABLE_NAME
}`;
const token = `Bearer ${import.meta.env.VITE_PAT}`;

function App() {
  const [todoState, dispatch] = useReducer(todosReducer, initialTodosState);
  const [sortField, setSortField] = useState("createdTime");
  const [sortDirection, setSortDirection] = useState("desc");
  const [queryString, setQueryString] = useState("");
  const [title, setTitle] = useState("Todo List");

  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setTitle("Todo List");
        break;
      case "/about":
        setTitle("About");
        break;
      default:
        setTitle("Not Found");
    }
  }, [location]);

  // Memoized utilities
  const encodeUrl = useCallback(() => {
    let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
    let searchQuery = "";

    if (queryString) {
      searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;
    }

    return encodeURI(`${url}?${sortQuery}${searchQuery}`);
  }, [sortDirection, sortField, queryString]);

  // Side effects
  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({ type: todoActions.fetchTodos });

      try {
        const resp = await fetch(encodeUrl(), {
          method: "GET",
          headers: { Authorization: token },
        });

        if (!resp.ok) throw new Error(resp.message);

        const { records } = await resp.json();
        dispatch({ type: todoActions.loadTodos, records });
      } catch (error) {
        dispatch({ type: todoActions.setLoadError, error });
      }
    };

    fetchTodos();
  }, [encodeUrl]);

  // Handlers
  const addTodo = async (newTodo) => {
    const payload = {
      records: [
        {
          fields: {
            title: newTodo.title,
            isCompleted: newTodo.isCompleted,
          },
        },
      ],
    };

    try {
      dispatch({ type: todoActions.startRequest });

      const resp = await fetch(encodeUrl(), {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      });

      if (!resp.ok) throw new Error(resp.message);

      const { records } = await resp.json();
      dispatch({type: todoActions.addTodo, record: records[0] });
    } catch (error) {
      dispatch({ type: todoActions.setLoadError, error });
    } finally {
      dispatch({ type: todoActions.endRequest });
    }
  };

  const completeTodo = async (id) => {
    const originalTodo = todoState.todoList.find((todo) => todo.id === id);
    const completedTodo = { ...originalTodo, isCompleted: true };

    dispatch({ type: todoActions.completeTodo, editedTodo: completedTodo });

    const payload = {
      records: [
        {
          id: completedTodo.id,
          fields: {
            title: completedTodo.title,
            isCompleted: true,
          },
        },
      ],
    };

    try {
      await fetch(encodeUrl(), {
        method: "PATCH",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      dispatch({ type: todoActions.revertTodo, originalTodo });
      dispatch({ type: todoActions.setLoadError, error });
    }
  };

  const updateTodo = async (editedTodo) => {
    const originalTodo = todoState.todoList.find((todo) => todo.id === editedTodo.id);

    dispatch({ type: todoActions.updateTodo, editedTodo });

    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted,
          },
        },
      ],
    };

    try {
      await fetch(encodeUrl(), {
        method: "PATCH",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      dispatch({ type: todoActions.revertTodo, originalTodo });
      dispatch({ type: todoActions.setLoadError, error });
    }
  };

  // UI
  return (
    <div className={styles.appContainer}>
      <Header title={title} />
      <Routes>
        <Route
          path="/"
          element={
            <TodosPage
              todoState={todoState}
              addTodo={addTodo}
              completeTodo={completeTodo}
              updateTodo={updateTodo}
              sortField={sortField}
              setSortField={setSortField}
              sortDirection={sortDirection}
              setSortDirection={setSortDirection}
              queryString={queryString}
              setQueryString={setQueryString}
              dispatch={dispatch}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
