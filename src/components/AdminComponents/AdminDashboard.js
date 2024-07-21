import React, { useState, useEffect } from 'react';
import { Container, Button, ListGroup, Modal, Form, Row, Col } from 'react-bootstrap';
import { setProductList } from '../../redux/DataActions/DataAction.Product';
import { GetAllProducts, PostProduct, PutProduct } from '../../axios/ProductAxios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaPen, FaTrash } from 'react-icons/fa';

const AdminDashboard = () => {
  const productsList = useSelector(s => s.DataReducer_Products?.Prodlist || []); // טיפול במצב בו productsList הוא undefined או null
  const [products, setProducts] = useState(productsList);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [prdoId, setPrdoId] = useState('');
  const [nameHe, setNameHe] = useState('');
  const [descriptionHe, setDescriptionHe] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [price, setPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [image, setImage] = useState(null);
  const [recommaned, setRecommaned] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [what, setWhat] = useState('');
  const myDispatch = useDispatch();
  const navigate = useNavigate();

  async function fetchProducts() {
    try {
      if (!productsList || productsList.length === 0) { // בדיקה אם הרשימה ריקה או לא מוגדרת
        var response = await GetAllProducts();
        if (!response) {
          setProducts([]);
        }
        else {
          setProducts(response);
          myDispatch(setProductList(response));
        }
      } else {
        setProducts(productsList);
      }
    } catch (error) {
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleShowAddModal = () => {
    debugger
    setSelectedProduct('');
    setPrdoId('');
    setNameHe('');
    setDescriptionHe('');
    setNameEn('')
    setDescriptionEn('');
    setPrice('');
    setSalePrice('');
    setRecommaned('');
    setImage('');
    setShowAddModal(true);
  };

  const handleShowUpdateModal = async (product) => {
    debugger
    setSelectedProduct(product);
    setPrdoId(product.productID);
    setNameHe(product.nameHe);
    setDescriptionHe(product.descriptionHe);
    setNameEn(product.nameEn);
    setDescriptionEn(product.descriptionEn);
    setPrice(product.price);
    setSalePrice(product.salePrice);
    setRecommaned(product.isRecommended);
    try {
      const fileName = product.imageURL.substring(product.imageURL.lastIndexOf('/') + 1);
      const response = await fetch(`${process.env.REACT_APP_API_URL}${product.imageURL}`);
      const blob = await response.blob();
      const file = new File([blob], fileName, { type: blob.type });
      setCurrentImage(file);
    } catch (error) {
      console.error("Error fetching current image:", error);
      alert("err");
    }
    setImage(null);
    setShowUpdateModal(true);
  };

  const handleCloseAddModal = () => {setShowAddModal(false)};

  const handleCloseUpdateModal = () => {setShowUpdateModal(false)};

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('NameHe', nameHe);
    formData.append('DescriptionHe', descriptionHe);
    formData.append('Price', price);
    formData.append('SalePrice', salePrice);
    formData.append('NameEn', nameEn);
    formData.append('DescriptionEn', descriptionEn);
    formData.append('IsRecommended', recommaned);
    if (image) {
      formData.append('ImageURL', image);
      formData.append('Image', image);
    }

    try {
      const response = await PostProduct(formData);
      if (response)
        if (response == true) {
          const productsfromServer = await GetAllProducts();
          myDispatch(setProductList(productsfromServer))
          setProducts(productsfromServer);
        }
    } catch (error) {
      console.error('Error adding product:', error.response || error.message);
      alert('Failed to add product');
    }
    handleCloseAddModal();
    setWhat('נוסף'); 
    setShowSuccess(true);
  };

  const handleUpdateProduct = async (e) => {
    debugger
    e.preventDefault();
    const formData = new FormData();
    formData.append('ProductID', prdoId);
    formData.append('NameHe', nameHe);
    formData.append('DescriptionHe', descriptionHe);
    formData.append('Price', price);
    formData.append('SalePrice', salePrice);
    formData.append('NameEn', nameEn);
    formData.append('DescriptionEn', descriptionEn);
    formData.append('IsRecommended', recommaned);
    if (image) {
      formData.append('ImageURL', image);
      formData.append('Image', image);
    }
    else{
      setImage(currentImage);
      formData.append('ImageURL', currentImage);
      formData.append('Image', currentImage);

    }
    try {
      const response = await PutProduct(prdoId, formData);
      //TODO
      //dispatch to the product list
      if (response == true) {
        const productsfromServer = await GetAllProducts();
        myDispatch(setProductList(productsfromServer))
        setProducts(productsfromServer);
      }
    } catch (error) {
      console.error('Error adding product:', error.response || error.message);
    }
    handleCloseUpdateModal();
    setWhat('עודכן');
    setShowSuccess(true);
  };

  return (
    <Container>
      <div className="mb-3">
        <Button variant="primary" onClick={handleShowAddModal}>Add Product</Button>
      </div>
      <ListGroup className="mb-4">
        {products.map((product, index) => (
          <ListGroup.Item key={index}>
            <Row>
              <Col md={3}>
                <img src={`${process.env.REACT_APP_API_URL}${product.imageURL}`} alt="Product" className="img-fluid" />
              </Col>
              <Col md={7}>
                <h5><b>Id: </b>{product.productID}</h5>
                <h4>{product.nameEn} - {product.nameHe}</h4>
                <p>{product.descriptionEn} - {product.descriptionHe}</p>
                <p>Price: ₪{product.price} (Sale price:{product.salePrice}₪)</p>
                <p>
                Recommended:  
                <br></br><input 
                  type="checkbox" 
                  checked={product.isRecommended} 
                  readOnly 
                  style={{ pointerEvents: 'none' }}
                />
              </p>
              </Col>
              <Col md={2} className="d-flex align-items-center justify-content-end">
                <Button variant="link" onClick={() => handleShowUpdateModal(product)}><FaPen /></Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* מודל להוספת מוצר */}
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleAddProduct}>
            <div className="mb-3">
              <label className="form-label">Name (Hebrew)</label>
              <input type="text" className="form-control" value={nameHe} onChange={(e) => setNameHe(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Description (Hebrew)</label>
              <textarea className="form-control" value={descriptionHe} onChange={(e) => setDescriptionHe(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Price</label>
              <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Sale Price</label>
              <input type="number" className="form-control" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Image</label>
              <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
            </div>
            <div className="mb-3">
              <label className="form-label">Name (English)</label>
              <input type="text" className="form-control" value={nameEn} onChange={(e) => setNameEn(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Description (English)</label>
              <textarea className="form-control" value={descriptionEn} onChange={(e) => setDescriptionEn(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Is recommended</label><br></br>
              <input
                type="checkbox"
                className="form-check-input"
                checked={recommaned}
                onChange={(e) => setRecommaned(e.target.checked)}
              />
            </div>
            <Button variant="primary" type="submit">
              Add Product
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* מודל לעדכון מוצר */}
      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleUpdateProduct}>
            <div className="mb-3">
              <label className="form-label">Name (Hebrew)</label>
              <input type="text" className="form-control" value={nameHe} onChange={(e) => setNameHe(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Description (Hebrew)</label>
              <textarea className="form-control" value={descriptionHe} onChange={(e) => setDescriptionHe(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Price</label>
              <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Sale Price</label>
              <input type="number" className="form-control" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} />
            </div>
            
            <div className="mb-3">
              <label className="form-label">Image</label>
              <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
            </div>
            <div className="mb-3">
              <label className="form-label">Name (English)</label>
              <input type="text" className="form-control" value={nameEn} onChange={(e) => setNameEn(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Description (English)</label>
              <textarea className="form-control" value={descriptionEn} onChange={(e) => setDescriptionEn(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Is recommended</label><br></br>
              <input
                type="checkbox"
                className="form-check-input"
                checked={recommaned}
                onChange={(e) => setRecommaned(e.target.checked)}
              />
            </div>
            <Button variant="primary" type="submit">
              Update Product
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUpdateModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showSuccess} onHide={() => setShowSuccess(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>הצלחה!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    המוצר: {what} בהצלחה!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowSuccess(false)}>סגור</Button>
                </Modal.Footer>
            </Modal>
    </Container>
  );
};

export default AdminDashboard;
