import axios from "../api/axios";

const CATEGORIE_API = "/users";
export const fetchusers = async () => {
  return await axios.get(CATEGORIE_API);
};
export const fetchuserById = async (categorieId) => {
  return await axios.get(CATEGORIE_API + "/" + categorieId);
};
export const deleteuser = async (categorieId) => {
  return await axios.delete(CATEGORIE_API + "/" + categorieId);
};
export const edituser = (categorie) => {
  return axios.put(CATEGORIE_API + "/" + categorie.id, categorie);
};

