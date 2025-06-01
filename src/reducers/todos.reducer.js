// Actions
const actions = {
  // actions in useEffect that loads todos
  fetchTodos: "fetchTodos",
  loadTodos: "loadTodos",

  // found in useEffect and addTodo to handle failed requests
  setLoadError: "setLoadError",

  // actions found in addTodo
  startRequest: "startRequest",
  addTodo: "addTodo",
  endRequest: "endRequest",

  // found in helper functions
  updateTodo: "updateTodo",
  completeTodo: "completeTodo",

  // reverts todos when requests fail
  revertTodo: "revertTodo",

  // action on Dismiss Error button
  clearError: "clearError",
};

// Initial state
const initialState = {
  todoList: [],
  isLoading: false,
  errorMessage: "",
  isSaving: false,
  sortField: "createdTime",
  sortDirection: "desc",
  queryString: "",
};

// Reducer function
function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.fetchTodos:
      return {
        ...state,
        isLoading: true,
      };

    case actions.loadTodos: {
      const todos = action.records.map((record) => {
        const todo = {
          id: record.id,
          ...record.fields,
        };

        if (!todo.isCompleted) {
          todo.isCompleted = false;
        }

        if (!todo.title) {
          todo.title = "";
        }

        return todo;
      });

      return {
        ...state,
        todoList: todos,
        isLoading: false,
      };
    }

    case actions.setLoadError:
      return {
        ...state,
        errorMessage: action.error.message,
        isLoading: false,
      };

    case actions.startRequest:
      return {
        ...state,
        isSaving: true,
      };

    case actions.addTodo: {
      const savedTodo = {
        id: action.record.id,
        ...action.record.fields,
      };

      if (!savedTodo.isCompleted) {
        savedTodo.isCompleted = false;
      }

      return {
        ...state,
        todoList: [...state.todoList, savedTodo],
        isSaving: false,
      };
    }

    case actions.endRequest:
      return {
        ...state,
        isLoading: false,
        isSaving: false,
      };

    case actions.revertTodo:
    case actions.updateTodo: {
      const updatedTodos = state.todoList.map((todo) =>
        todo.id === action.editedTodo.id ? action.editedTodo : todo
      );

      const updatedState = {
        ...state,
        todoList: updatedTodos,
      };

      if (action.error) {
        updatedState.errorMessage = action.error.message;
      }

      return updatedState;
    }

    case actions.completeTodo: {
      const updatedTodos = state.todoList.map((todo) =>
        todo.id === action.id ? { ...todo, isCompleted: true } : todo
      );

      return {
        ...state,
        todoList: updatedTodos,
      };
    }

    case actions.clearError:
      return {
        ...state,
        errorMessage: "",
      };

    default:
      return state;
  }
}

// Export named exports
export { initialState, actions, reducer };
