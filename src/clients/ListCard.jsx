import { Container, Stack } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { fetchCard } from "../services/productservice";
import Pagination from "../components/Pagination";
import AffCard from "./AffCard";
import Navbar from "../components/NavBar";
import './pannier.css'


const ListCard = () => {
  const [products, setProducts] = useState([]);

  const [limit, setLimit] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [userID, setUserID] = useState(null);

  const fetchProducts = async (page, limit,search) => {
    try {
      const res = await fetchCard(page, limit, search);
      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
      console.log(totalPages);
      console.log(res.data.products); // Debugging purpose to check the fetched data.
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage,limit, search);
  }, [currentPage,limit,search]);
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
    setCurrentPage(1); // Reset to first page when limit changes
  };
  
  const handleFiltreChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    
        <div className="card-container">
            <Navbar/>
      {products.map((prod, i) => (
        <AffCard key={i} products={prod} />
      ))}
      
      <Pagination
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        handlePageChange={handlePageChange}
        totalPages={totalPages}
        currentPage={currentPage}
      />
      </div>
    
  );
};
export default ListCard;
