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
        ...state
      };
    case actions.loadTodos:
      return {
        ...state
      };
    case actions.setLoadError:
      return {
        ...state
      };
    case actions.startRequest:
      return {
        ...state
      };
    case actions.addTodo:
      return {
        ...state
      };
    case actions.endRequest:
      return {
        ...state
      };
    case actions.updateTodo:
      return {
        ...state
      };
    case actions.completeTodo:
      return {
        ...state
      };
    case actions.revertTodo:
      return {
        ...state
      };
    case actions.clearError:
      return {
        ...state
      };
    default:
      return state;
  }
}

// Export named exports
export { initialState, actions, reducer };