const initialState = {
    user: null,
    isAuthenticated: false,
    error: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGOUT':
        return {
          ...state,
          user: null,
          isAuthenticated: false,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  