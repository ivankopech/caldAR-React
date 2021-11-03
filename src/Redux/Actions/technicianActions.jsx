import { v4 as uuidv4 } from 'uuid';
import {
    GET_TECHNICIANS,
    ADD_TECHNICIAN,
    UPDATE_TECHNICIAN,
    DELETE_TECHNICIAN,
} from '../Types/technicianTypes';
import techniciansData from '../../data/technician.json';

let technicians = techniciansData;

export const getTechnicians = () => ({
  type: GET_TECHNICIANS,
  technicians,
});

export const addTechnician = (technician) => ({
  type: ADD_TECHNICIAN,
  id: uuidv4(),
  technician,
});

export const updateTechnician = (technician) => ({
  type: UPDATE_TECHNICIAN,
  technician,
});

export const deleteTechnician = (id) => ({
  type: DELETE_TECHNICIAN,
  id,
});
