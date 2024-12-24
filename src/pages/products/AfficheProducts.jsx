import React, { useState } from "react";
import { Modal, Button, Table, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const AfficheProducts = ({
  products,
  handleLimitChange,
  limit,
  handleDeleteproduct,
  modifproduct,
}) => {
  const [show, setShow] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});

  const handleShow = (product) => {
    setShow(true);
    setCurrentProduct(product);
  };

  const handleClose = () => {
    setShow(false);
  };
const  handleEdit = (currentProduct) => {
    handleShow();
    setCurrentProduct(currentProduct);
    
  };

  return (
    <div className="table-responsive">
      <Table className="table table-hover table-striped align-middle">
        <thead className="table-dark">
          <tr>
            <th>Image</th>
            <th>Référence</th>
            <th>Désignation</th>
            <th>Marque</th>
            <th>Quantité</th>
            <th>Prix</th>
            <th>Modifier</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod, index) => (
            <tr key={index}>
              <td>
                <img
                  src={prod.image}
                  alt="product"
                  style={{ width: "80px", height: "80px" }}
                />
              </td>
              <td>{prod.reference}</td>
              <td>{prod.designation}</td>
              <td>{prod.marque}</td>
              <td>{prod.qtestock}</td>
              <td>{prod.prix}</td>
              <td>
                  <Button variant="warning" onClick={() => handleEdit(prod)}>
                    <i className="fa-solid fa-pen-to-square"></i> Update
                  </Button>
                
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteproduct(prod.id, prod.reference)}
                >
                  <i className="fa-solid fa-trash"></i> Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="8" className="text-center">
              <Form.Group className="d-inline-flex align-items-center">
                <Form.Label className="me-2">Afficher</Form.Label>
                <Form.Select
                  value={limit}
                  onChange={handleLimitChange}
                  style={{ width: "auto" }}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={100}>100</option>
                </Form.Select>
              </Form.Group>
            </td>
          </tr>
        </tfoot>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier l'article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Référence</Form.Label>
              <Form.Control
                type="text"
                value={currentProduct.reference || ""}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Désignation</Form.Label>
              <Form.Control
                type="text"
                value={currentProduct.designation || ""}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct,
                    designation: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Marque</Form.Label>
              <Form.Control
                type="text"
                value={currentProduct.marque || ""}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct,
                    marque: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Quantité</Form.Label>
              <Form.Control
                type="number"
                value={currentProduct.qtestock || ""}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct,
                    qtestock: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Prix</Form.Label>
              <Form.Control
                type="number"
                value={currentProduct.prix || ""}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct,
                    prix: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button
            variant="success"
            onClick={() => {
              modifproduct(currentProduct);
              handleClose();
            }}
          >
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AfficheProducts;
