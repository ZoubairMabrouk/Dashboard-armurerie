import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Switch } from '@mui/material';
import axios from 'axios';
import { deletecommandes, fetchcommandes } from '../../services/commandeservice';

const Command = () => {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchcommande = async ()=> {
    try {
      const response = await fetchcommandes();
      setCommandes(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };
  

  // Fetch users from the server
  useEffect(() => {
    fetchcommande()}, []);

  

  

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Client Name</TableCell>
            <TableCell>Date de Commande</TableCell>
            <TableCell>Prix</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} align="center">Loading...</TableCell>
            </TableRow>
          ) : (
            commandes.map((com) => (
              <TableRow key={com.id}>
                <TableCell>{com.id}</TableCell>
                <TableCell>{com.client_id}</TableCell>
                <TableCell>{com.commande_date}</TableCell>
                <TableCell>{com.total_price}</TableCell>
                <TableCell>
                  
                  {com.status}
                                    
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="warning"
                  >
                    Valider
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Command;
