import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { Button, Container, Stack } from "react-bootstrap";
import AfficheProducts from "./AfficheProducts";
import {
  deleteproduct,
  editproduct,
  fetchproducts,
  fetchproductsPagination,
} from "../../services/productservice";
import Pagination from "../../components/Pagination";
import AddProduct from "./Addproducts";
import { getProfile } from "../../services/auth";

const ListProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(5);
  const [filtre, setFiltre] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [adminID, setAdminID] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const fetchProfile = async () => {
    try {
      const res = await getProfile();
      console.log(res);
      setAdminID(res.id);
      console.log(adminID);
    } catch (err) {}
  };

  const fetchProducts = async (page, limit, filtre) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchproductsPagination(page, limit, filtre);
      setProducts(res.data.products);
      console.log(products);
      setTotalPages(res.data.totalpage);
      console.log(totalPages); 
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProfile();
    fetchProducts(currentPage, limit, filtre);
  }, [currentPage, limit, filtre]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };
  const handleFiltreChange = (e) => {
    setFiltre(e.target.value);
  };
  const handleDeleteproduct = async (id, ref) => {
    confirmAlert({
      title: "Confirm delete...",
      message: " supprimer l' article: " + ref,
      buttons: [
        {
          label: "Oui",
          onClick: () =>
            deleteproduct(id)
              .then((res) => fetchProducts(currentPage, limit, ""))
              .catch((error) => console.log(error)),
        },
        {
          label: "Non",
        },
      ],
    });
  };
  const modifproduct = async (prodmod) => {
    setProducts(
      products.map((prod) => (prod.id === prodmod.id ? prodmod : prod))
    );
    await editproduct(prodmod);
  };

  return (
    <div>
      <>
        <Stack direction="horizontal" gap={1}>
          
          <div className="p-2 ms-auto">
            <Button variant="success" onClick={handleShow}>
              <i className="fa-solid fa-plus-square me-1"></i>
              Ajouter un Produit
            </Button>
          </div>
        </Stack>

        <AfficheProducts
          products={products}
          handleLimitChange={handleLimitChange}
          limit={limit}
          handleDeleteproduct={handleDeleteproduct}
          modifproduct={modifproduct}
          adminID={adminID}
        />

        <Pagination
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          handlePageChange={handlePageChange}
          totalPages={totalPages}
          currentPage={currentPage}
        />
        {show && (
          <AddProduct
            show={show}
            handleClose={handleClose}
            fetchProducts={fetchProducts}
            limit={limit}
            adminID={adminID}
          />
        )}
      </>
    </div>
  );
};
export default ListProducts;
