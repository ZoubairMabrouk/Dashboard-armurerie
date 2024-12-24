import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { FilePond, registerPlugin } from "react-filepond";
import axios from "axios";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { fetchcategories } from "../../services/categoryservice";
import { addproduct } from "../../services/productservice";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
const AddProduct = ({ show, handleClose, fetchProducts, limit,adminID }) => {
  const [product, setProduct] = useState({});
  const [categories, setcategories] = useState([]);
  const [files, setFiles] = useState([]);
  const loadcategories = async () => {
    try {
      const res = await fetchcategories();

      console.log(res);
      setcategories(res.data);
      console.log(res.data);
      
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    
    setProduct({...product,'adminID':adminID});
    loadcategories();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    setProduct({...product,'categoriesID':1});
    console.log(product);
    await addproduct(product);
    fetchProducts(1, limit, "");
    handleClose();
    setProduct({});
  };
  const serverOptions = () => {
    console.log("server pond");
    return {
      process: (fieldName, file, metadata, load, error, progress, abort) => {
        console.log(file);
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "ecommerce");
        data.append("cloud_name", "dxjip85ip");
        data.append("publicid", file.name);
        axios
          .post("https://api.cloudinary.com/v1_1/dxjip85ip/image/upload", data)
          .then((response) => response.data)
          .then((data) => {
            console.log(data);
            setProduct({ ...product, image: data.url });
            load(data);
          })
          .catch((error) => {
            console.error("Error uploading file:", error);
            error("Upload failed");
            abort();
          });
      },
    };
  };

  return (
    <div className="form-container">
      <Modal show={show} onHide={handleClose}>
        <form className="product-form">
          <Modal.Header closeButton>
            <h2>Ajouter product</h2>
          </Modal.Header>
          <Modal.Body>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="title">Référence</label>
                <input
                  type="text"
                  id="reference"
                  value={product.reference}
                  onChange={(e) =>
                    setProduct({ ...product, reference: e.target.value })
                  }
                  className="form-input"
                  placeholder="Entrez référence product"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Désignation</label>
                <input
                  type="text"
                  id="designation"
                  value={product.designation}
                  onChange={(e) =>
                    setProduct({ ...product, designation: e.target.value })
                  }
                  className="form-input"
                  placeholder="Entrez la désignation produit"
                />
              </div>
              <div className="form-group">
                <label htmlFor="marque">Marque</label>
                <input
                  type="text"
                  id="marque"
                  value={product.marque}
                  onChange={(e) =>
                    setProduct({ ...product, marque: e.target.value })
                  }
                  className="form-input"
                  placeholder="Entrez marque"
                />
              </div>
              <div className="form-group">
                <label htmlFor="quantite">Quantité</label>
                <input
                  type="number"
                  id="qtestock"
                  value={product.qtestock}
                  onChange={(e) =>
                    setProduct({ ...product, qtestock: e.target.value })
                  }
                  className="form-input"
                  placeholder="Entrez quantité stock"
                />
              </div>
              <div className="form-group">
                <label htmlFor="prix">Prix</label>
                <input
                  type="number"
                  required
                  id="prix"
                  value={product.prix}
                  onChange={(e) =>
                    setProduct({ ...product, prix: e.target.value })
                  }
                  className="form-input"
                  placeholder="Entrez Quantité stock"
                />
              </div>
              <div className="form-group">
                <label htmlFor="prix">Catégorie</label>
                <select
                  id="category"
                  className="form-control"
                  value={product.categoriesID||1}
                  onChange={(e) =>
                    setProduct({ ...product, categoriesID:e.target.value })
                  }
                >
                  {Array.isArray(categories) &&
                    categories.map((cat, index) => (
                      <option key={index} value={cat.id}>
                        {cat.nom}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="prix">Image</label>
                <input
                  type="text"
                  required
                  id="image"
                  value={product.image}
                  onChange={(e) =>
                    setProduct({ ...product, image: e.target.value })
                  }
                  className="form-input"
                  placeholder="Image"
                />
              </div>
              <div className="form-group">
                <label htmlFor="prix">Image</label>
                <div style={{ width: "80%", margin: "auto", padding: "1%" }}>
                  <FilePond
                    files={files}
                    acceptedFileTypes="image/*"
                    onupdatefiles={setFiles}
                    allowMultiple={true}
                    server={serverOptions()}
                    name="file"
                  />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="form-submit-button"
              onClick={(e) => handleSubmit(e)}
            >
              Enregistrer
            </button>
            <button
              type="reset"
              className="form-reset-button"
              onClick={() => handleClose()}
            >
              Annuler
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};
export default AddProduct;
