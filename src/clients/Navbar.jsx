import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { fetchcategories } from '../services/categoryservice';

const Navbar = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async ()=>{
    try {
        const response = await fetchcategories();
        setCategories(response.data);
        console.log(categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
  }

  useEffect(() => {
   fetchCategories()
   }, []);

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My E-commerce
        </Typography>
        <Box>
          {categories.map((category) => (
            <Button
              key={category.id}
              component={Link}
              to={`/category/${category.id}`}
              color="inherit"
            >
              {category.name}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
