import axios from "../api/axios";

const PRODUCT_API = "products";
export const fetchproducts = async () => {
  return await axios.get(PRODUCT_API);
};
export const fetchproductById = async (productId) => {
  return await axios.get(PRODUCT_API + "/" + productId);
};
export const deleteproduct = async (productId) => {
  return await axios.delete(PRODUCT_API + "/" + productId);
};
export const addproduct = async (product) => {
  try {
    const response = await axios.post("http://localhost:8000/api/products", product, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error.response?.data || error.message);
    throw error;
  }
};
export const editproduct = (product) => {
  return axios.put(PRODUCT_API + "/" + product.id, product);
};
export const fetchproductsPagination = async (page, limit, filtre) => {
  return await axios.get(
    PRODUCT_API + `/prod/pagination?filtre=${filtre}&page=${page}&pageSize=${limit}`
  );
};
export const fetchCard = async (page, limit, filtre) => {
  return await axios.get(
    PRODUCT_API + `/prod/pagination?filtre=${filtre}&page=${page}&pageSize=${limit}`
  );
};