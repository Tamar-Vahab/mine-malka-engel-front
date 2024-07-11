import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryList } from '../../redux/DataActions/DataAction.Category';
import { GetAllCategories, addCategory, updateCategory } from '../../axios/CategoryAxios';
import { Button, Modal, Form, Card, Collapse, ListGroup, Row, Col } from 'react-bootstrap';
import { addProductToCategory, deleteProductInCategory, GetAllProducts, GetProductsByCategory } from '../../axios/ProductAxios';
// import { GetAllProducts } from '../../axios/ProductAxios';
// צריכה לאפס ארת הנתונים בטופס!
// צריכהךלרםפש בצורה יותר יעילה
const AllCategories = () =>  {
    const { t, i18n } = useTranslation();
    const myCategory = useSelector(c => c.DataReducer_Categry.Categorylist);
    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    const [showAddForm, setShowAddForm] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [addedCategory, setAddedCategory] = useState('');
    const [newC, setNewC] = useState({
        nameHe: '',
        descriptionHe: '',
        nameEn: '',
        descriptionEn: '',
        upCategory: 0
    });
    async function fetchData() {
        // if (myCategory.length === 0) {
        var dataFromServer = await GetAllCategories();
        setData(dataFromServer);
        dispatch(setCategoryList(dataFromServer));
        // } else {
        //     setData(myCategory);
        // }
    }

    useEffect(() => {
        fetchData();
    }, []);


    const handleAddCategory = async (e) => {
        debugger
        e.preventDefault();
        // קוד להוספת קטגוריה חדשה
        let newCategory = {

            "categoryID": 0,
            "nameHe": newC.nameHe,
            "descriptionHe": newC.descriptionHe,
            "nameEn": newC.nameEn,
            "descriptionEn": newC.descriptionEn,
            "upCategory": newC.upCategory,
            "createAt": "2024-07-03T09:45:43.322Z"
        }
        // alert(newCategory)
        debugger
        ///= כאן לקרוא לשרת
        try {
            var myResult = await addCategory(newCategory);
            if (myResult.data) {
                setAddedCategory(newC.nameHe);
                setShowSuccess(true);
                await fetchData();
            } else {
                alert("Failed to add category");
            }
        } catch (error) {
            console.error("Error adding category:", error);
            alert("An error occurred while adding the category.");
        }
        // אפס את תיבות הטופס
        setNewC({
            nameHe: '',
            descriptionHe: '',
            nameEn: '',
            descriptionEn: '',
            upCategory: 0
        });
        setShowAddForm(false);
    };
    const handleChange = (e) => {
        setNewC({
            ...newC,
            [e.target.name]: e.target.value
        });
    };

    //----------- getProductByCategory

    const [expandedCategory, setExpandedCategory] = useState(null);
    const [products, setProducts] = useState([]);
    const [expandedCategories, setExpandedCategories] = useState([]);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    const showProducts = async (categoryId) => {
        debugger
        if (expandedCategories.includes(categoryId)) {
            setExpandedCategories(expandedCategories.filter(id => id !== categoryId));
        } else {
            try {
                const products = await GetProductsByCategory(categoryId);
                setProducts(prevProducts => ({
                    ...prevProducts,
                    [categoryId]: products
                }));
                setExpandedCategories([...expandedCategories, categoryId]);
            } catch (error) {
                console.error("Error fetching products:", error);
                alert("An error occurred while fetching the products.");
            }
        }

    };
    //----------------------delete products--------------------
    const handleDeleteProduct = async () => {
        if (!productToDelete) return;

        try {
            await deleteProductInCategory(productToDelete.categoryId, productToDelete.productId);
            const updatedProducts = await GetProductsByCategory(productToDelete.categoryId);
            setProducts(prevProducts => ({
                ...prevProducts,
                [productToDelete.categoryId]: updatedProducts
            }));
            setShowDeleteConfirm(false);
            setProductToDelete(null);
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("An error occurred while deleting the product.");
        }
    };

    const confirmDeleteProduct = (categoryId, productId) => {
        setProductToDelete({ categoryId, productId });
        setShowDeleteConfirm(true);
    };
    //------------- update category
    const [showEditForm, setShowEditForm] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);
    const [newProduct, setNewProduct] = useState({
        productName: '',
        productDescription: ''
    });
    const handleEditCategory = (category) => {
        setCurrentCategory(category);
        setNewC({
            nameHe: category.nameHe,
            descriptionHe: category.descriptionHe,
            nameEn: category.nameEn,
            descriptionEn: category.descriptionEn,
            upCategory: category.upCategory
        });
        setShowEditForm(true);

    };

    const handleUpdateCategory = async (e) => {
        e.preventDefault();
        try {
            const updatedCategory = {
                ...currentCategory,
                nameHe: newC.nameHe,
                descriptionHe: newC.descriptionHe,
                nameEn: newC.nameEn,
                descriptionEn: newC.descriptionEn,
                upCategory: newC.upCategory
            };
            await updateCategory(currentCategory.categoryID, updatedCategory);
            fetchData();
            setShowEditForm(false);
            setShowSuccess(true);
        } catch (error) {
            console.error("Error updating category:", error);
            alert("An error occurred while updating the category.");
        }
        setNewC({
            nameHe: '',
            descriptionHe: '',
            nameEn: '',
            descriptionEn: '',
            upCategory: 0
        });
        // setShowAddForm(false);
    };
    //---------------------------add productto category

    const [allProducts, setAllProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalCategory, setModalCategory] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [addedProducts, setAddedProducts] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    // אחכ לעשות עם שליפה מהרדוסר
    // טעינת כל המוצרים מהשרת
    const loadAllProducts = async () => {
        debugger
        const products = await GetAllProducts();
        setAllProducts(products);
    };

    const handleShowModal = (categoryID) => {
        setModalCategory(categoryID);
        loadAllProducts();
        setShowModal(true);
    };

    const handleSelectProduct = (productID) => {
        setSelectedProducts(prev =>
            prev.includes(productID) ? prev.filter(id => id !== productID) : [...prev, productID]
        );
    };
    const handleAddProductsToCategory = async () => {
        const addedProducts = [];
        for (let productID of selectedProducts) {
            await addProductToCategory(modalCategory, productID);
            addedProducts.push(allProducts.find(product => product.productID === productID));
        }
        setAddedProducts(addedProducts);
        setShowModal(false);
        setSelectedProducts([]);
        setShowSuccessModal(true);
        showProducts(modalCategory); // רענון רשימת המוצרים בקטגוריה
    };

    const handleShowDetailsModal = (product) => {
        setCurrentProduct(product);
        setShowDetailsModal(true);
    };
    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">

                <h2>All Categories</h2>
                <Button variant="primary" onClick={() => setShowAddForm(true)}>הוספת קטגוריה</Button>
            </div>
            <ul className="list-group">
                {data.map(category => (
                    <li key={category.categoryID} className="list-group-item">
                        <h5>{category.nameHe} ({category.nameEn})</h5>
                        <p>{category.descriptionHe} ({category.descriptionEn})</p>
                        <small>Up Category: {category.upCategory} | Created At: {category.createAt}</small>
                        <div className="mt-3">
                            <button className="btn btn-primary me-2" onClick={() => showProducts(category.categoryID)}>
                                {expandedCategories.includes(category.categoryID) ? 'הסתר מוצרים' : 'הצג מוצרים לקטגוריה'}
                            </button>
                            <button className="btn btn-success me-2" onClick={() => handleShowModal(category.categoryID)}>הוסף מוצר לקטגוריה</button>
                            <button className="btn btn-warning me-2" onClick={() => handleEditCategory(category)}>ערוך קטגוריה</button>
                        </div>

                        <Collapse in={expandedCategories.includes(category.categoryID)}>
                            <div className="mt-3">
                                {products[category.categoryID]?.length > 0 ? (
                                    <Row>
                                        {products[category.categoryID].map(product => (
                                            <Col key={product.productID} md={3}>
                                                <Card className="mb-2">
                                                    <Card.Body>
                                                        <Card.Title>{product.nameHe}</Card.Title>
                                                        <Button variant="info" onClick={() => handleShowDetailsModal(product)}>פרטים נוספים</Button>
                                                        {/* <Button variant="info" onClick={() => alert(`פרטים נוספים:\n${product.descriptionHe}\nמחיר: ${product.price}\nמחיר במבצע: ${product.salePrice}\nשם באנגלית: ${product.nameEn}\nתיאור באנגלית: ${product.descriptionEn}\nנוצר בתאריך: ${product.createdAt}`)}>פרטים נוספים</Button> */}
                                                        <Button variant="danger" onClick={() => confirmDeleteProduct(category.categoryID, product.productID)}>מחק מוצר</Button>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                ) : (<p className="alert-danger">אין מוצרים לקטגוריה</p>)
                                }
                            </div>
                        </Collapse>
                    </li>
                ))}
            </ul>

            <Modal show={showAddForm} onHide={() => setShowAddForm(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>הוספת קטגוריה חדשה</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAddCategory}>
                        <Form.Group>
                            <Form.Label>שם  </Form.Label>
                            <Form.Control
                                type="text"
                                name="nameHe"
                                placeholder="הכנס שם קטגוריה בעברית"
                                value={newC.nameHe}
                                onChange={handleChange}
                                required />
                            {/* <Form.Control type="text" placeholder="הכנס שם קטגוריה בעברית" required /> */}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>תיאור  </Form.Label>
                            <Form.Control
                                type="text"
                                name="descriptionHe"
                                placeholder="הכנס תיאור קטגוריה בעברית"
                                value={newC.descriptionHe}
                                onChange={handleChange}
                                required
                            />
                            {/* <Form.Control type="text" placeholder="הכנס תיאור קטגוריה בעברית" required /> */}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>  שם באנגלית  </Form.Label>
                            <Form.Control
                                type="text"
                                name="nameEn"
                                placeholder="Enter category name in English"
                                value={newC.nameEn}
                                onChange={handleChange}
                                required
                            />
                            {/* <Form.Control type="text" placeholder="Enter category name in English" required /> */}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>תיאור באנגלית</Form.Label>
                            <Form.Control
                                type="text"
                                name="descriptionEn"
                                placeholder="Enter category description in English"
                                value={newC.descriptionEn}
                                onChange={handleChange}
                                required
                            />

                            {/* <Form.Control type="text" placeholder="Enter category description in English" required /> */}
                        </Form.Group>
                        <Button variant="primary" type="submit" >הוסף קטגוריה</Button>
                    </Form>
                </Modal.Body>
            </Modal>



            <Modal show={showSuccess} onHide={() => setShowSuccess(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>הצלחה!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    הקטגוריה: {addedCategory} נוספה בהצלחה!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowSuccess(false)}>סגור</Button>
                </Modal.Footer>
            </Modal>

            {/* <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>הוספת מוצרים לקטגוריה</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        {allProducts.map(product => (
                            <ListGroup.Item key={product.productID}>
                                <Form.Check
                                    type="checkbox"
                                    label={product.nameHe}
                                    checked={selectedProducts.includes(product.productID)}
                                    onChange={() => handleSelectProduct(product.productID)}
                                    disabled={products[modalCategory] ?.some(p => p.productID === product.productID)}
                                />
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>ביטול</Button>
                    <Button variant="primary" onClick={handleAddProductsToCategory}>הוסף מוצרים</Button>
                </Modal.Footer>
            </Modal> */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>הוספת מוצרים לקטגוריה</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        {allProducts.map(product => {
                            const isProductInCategory = products[modalCategory]?.some(p => p.productID === product.productID);
                            return (
                                <ListGroup.Item key={product.productID} style={{ backgroundColor: isProductInCategory ? 'darkgray' : '' }}>
                                    <Form.Check
                                        type="checkbox"
                                        label={product.nameHe}
                                        checked={isProductInCategory || selectedProducts.includes(product.productID)}
                                        onChange={() => handleSelectProduct(product.productID)}
                                        disabled={isProductInCategory}
                                    />
                                </ListGroup.Item>
                            );
                        })}
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>ביטול</Button>
                    <Button variant="primary" onClick={handleAddProductsToCategory}>הוסף מוצרים</Button>
                </Modal.Footer>
            </Modal>






            <Modal show={showEditForm} onHide={() => setShowEditForm(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>ערוך קטגוריה</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleUpdateCategory}>
                        <Form.Group>
                            <Form.Label>שם בעברית</Form.Label>
                            <Form.Control
                                type="text"
                                name="nameHe"
                                placeholder="הכנס שם קטגוריה בעברית"
                                value={newC.nameHe}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>תיאור בעברית</Form.Label>
                            <Form.Control
                                type="text"
                                name="descriptionHe"
                                placeholder="הכנס תיאור קטגוריה בעברית"
                                value={newC.descriptionHe}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>שם באנגלית</Form.Label>
                            <Form.Control
                                type="text"
                                name="nameEn"
                                placeholder="Enter category name in English"
                                value={newC.nameEn}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>תיאור באנגלית</Form.Label>
                            <Form.Control
                                type="text"
                                name="descriptionEn"
                                placeholder="Enter category description in English"
                                value={newC.descriptionEn}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">עדכן קטגוריה</Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>אישור מחיקה</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>האם את בטוחה שאת רוצה להוציא את המוצר מהקטגוריה?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>ביטול</Button>
                    <Button variant="danger" onClick={handleDeleteProduct}>אישור</Button>
                </Modal.Footer>
            </Modal>


            {/* <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>מוצרים נוספו בהצלחה</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>המוצרים הבאים נוספו בהצלחה:</p>
                    <ListGroup>
                        {selectedProducts.map(productID => {
                            const product = allProducts.find(product => product.productID === productID);
                            return <ListGroup.Item key={productID}>{product.nameHe}</ListGroup.Item>;
                        })}
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowSuccessModal(false)}>אישור</Button>
                </Modal.Footer>
            </Modal> */}

            <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>מוצרים נוספו בהצלחה</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>המוצרים הבאים נוספו בהצלחה:</p>
                    <ListGroup>
                        {addedProducts.map(product => (
                            <ListGroup.Item key={product.productID}>{product.nameHe}</ListGroup.Item>
                        ))}
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowSuccessModal(false)}>אישור</Button>
                </Modal.Footer>
            </Modal>


            <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>פרטים נוספים</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentProduct && (
                        <>
                            <p>תיאור: {currentProduct.descriptionHe}</p>
                            <p>מחיר: {currentProduct.price}</p>
                            <p>מחיר במבצע: {currentProduct.salePrice}</p>
                            <p>שם באנגלית: {currentProduct.nameEn}</p>
                            <p>תיאור באנגלית: {currentProduct.descriptionEn}</p>
                            <p>נוצר בתאריך: {currentProduct.createdAt}</p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>סגור</Button>
                </Modal.Footer>
            </Modal>



        </div>


    );
};
export default AllCategories;
// צבע לבחירה ::selection {
// 	color: #0B1126;
// 	background-color: #05FD75;
// }