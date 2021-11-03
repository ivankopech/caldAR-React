import {
    GET_BOILERS,
    ADD_BOILER,
    UPDATE_BOILER,
    DELETE_BOILER,
  } from '../Types/boilerTypes';
  
  const initialState = {
    list: [],
  };
  
  const boilerReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_BOILERS:
        return {
          ...state,
          list: action.boilers,
        };
      case ADD_BOILER:
        return {
          ...state,
          list: [...state.list, { id: action.id, ...action.boiler }],
        };
      case UPDATE_BOILER:
        return {
          ...state,
          list: state.list.map((boiler) => {
            if (boiler.id === action.boiler.id) {
              const updatedBoiler = action.boiler;
              updatedBoiler.id = action.boiler.id;
              return updatedBoiler;
            }
            return boiler;
          }),
        };
      case DELETE_BOILER:
        return {
          ...state,
          list: [...state.list.filter((boiler) => boiler.id !== action.id)],
        };
      default:
        return state;
    }
};
  
  export default boilerReducer;