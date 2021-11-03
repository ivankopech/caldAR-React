import {
    GET_TECHNICIANS,
    ADD_TECHNICIAN,
    UPDATE_TECHNICIAN,
    DELETE_TECHNICIAN,
  } from '../Types/technicianTypes';
  
  const initialState = {
    list: [],
  };
  
  const technicianReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_TECHNICIANS:
        return {
          ...state,
          list: action.technicians,
        };
      case ADD_TECHNICIAN:
        return {
          ...state,
          list: [...state.list, { id: action.id, ...action.technician }],
        };
      case UPDATE_TECHNICIAN:
        return {
          ...state,
          list: state.list.map((technician) => {
            if (technician.id === action.technician.id) {
              const updatedTechnician = action.technician;
              updatedTechnician.id = action.technician.id;
              return updatedTechnician;
            }
            return technician;
          }),
        };
      case DELETE_TECHNICIAN:
        return {
          ...state,
          list: [...state.list.filter((technician) => technician.id !== action.id)],
        };
      default:
        return state;
    }
};
  
  export default technicianReducer;

