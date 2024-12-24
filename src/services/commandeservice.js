import axios from "../api/axios";

const CATEGORIE_API = "/commandes";
export const fetchcommandes = async () => {
  return await axios.get(CATEGORIE_API);
};
export const fetchcommandesById = async (commandeId) => {
  return await axios.get(CATEGORIE_API + "/" + commandeId);
};
export const deletecommandes = async (commandeId) => {
  return await axios.delete(CATEGORIE_API + "/" + commandeId);
};
export const addcommandes = async (commande) => {
  return await axios.post(CATEGORIE_API, commande);
};
export const editcommandes = (commande) => {
  return axios.put(CATEGORIE_API + "/" + commande.id, commande);
};

