import boilersData from '../data/boiler.json';
import { v4 as uuidv4 } from 'uuid';

let boilers = boilersData;
export const getBoilers = () => {
  return boilers;
};
export const getBoiler = (id) => {
  return boilers.find((boi) => boi.id === id);
};
export const addBoiler = (boiler) => {
  boilers.unshift({ ...boiler, id: uuidv4() });
};
export const deleteBoiler = (id) => {
  boilers = boilers.filter((boi) => boi.id !== id);
};
export const modifyBoiler = (boiler) => {
  boilers = boilers.map((boi) =>
    boi.id === boiler.id ? boiler : boi
  );
};