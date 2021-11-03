import { v4 as uuidv4 } from 'uuid';
import {
    GET_BOILERS,
    ADD_BOILER,
    UPDATE_BOILER,
    DELETE_BOILER,
} from '../Types/boilerTypes';
import boilersData from '../../data/boiler.json';

let boilers = boilersData;

export const getBoilers = () => ({
  type: GET_BOILERS,
  boilers,
});

export const addBoiler = (boiler) => ({
  type: ADD_BOILER,
  id: uuidv4(),
  boiler,
});

export const updateBoiler = (boiler) => ({
  type: UPDATE_BOILER,
  boiler,
});

export const deleteBoiler = (id) => ({
  type: DELETE_BOILER,
  id,
});