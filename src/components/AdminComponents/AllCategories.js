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
        upCategory: 0,
        ImageURL: '',
        Image :''
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
        const formData= new FormData();
        // formData.append('categoryID',0);
        formData.append('nameHe', newC.nameHe);
        formData.append('descriptionHe', newC.descriptionHe);
        formData.append('nameEn', newC.nameEn);
        formData.append('descriptionEn', newC.descriptionEn);
        formData.append('upCategory', newC.upCategory);
        formData.append('createAt', "2024-07-03T09:45:43.322Z");
        formData.append('ImageURL', "/images/"+newC.Image.name );
        formData.append('Image', newC.Image);
        
        // alert(newCategory)
        debugger
        ///= כאן לקרוא לשרת
        try {
            var myResult = await addCategory(formData);
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
            upCategory: 0,
            ImageURL: '',
            Image: ''
        });
        setShowAddForm(false);
    };
    // const handleChange = (e) => {
    //     setNewC({
    //         ...newC,
    //         [newC.Image]: e.target.files[0]
    //     });
    // };
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "Image") {
            setNewC({
                ...newC,
                [name]: files[0]
            });
        } else {
            setNewC({
                ...newC,
                [name]: value
            });
        }
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
            upCategory: category.upCategory,
            ImageURL: category.ImageURL  ,
            Image: category.Image
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
                upCategory: newC.upCategory,
                ImageURL: newC.ImageURL,
                Image: newC.Image
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
            upCategory: 0,
            ImageURL: '',
            Image: ''
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
                        <p>{category.ImageURL}</p>
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
                        <Form.Group>
    <Form.Label>תמונה</Form.Label>
    <Form.Control
        type="file"
        name="Image"
        onChange={handleChange}
        required
    />
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
                        <Form.Group>
    <Form.Label>תמונה</Form.Label>
    <Form.Control
        type="file"
        name="Image"
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


// import { useTranslation } from 'react-i18next';
// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { setCategoryList } from '../../redux/DataActions/DataAction.Category';
// import { GetAllCategories, addCategory, updateCategory, deleteCategory } from '../../axios/CategoryAxios';
// import { Button, Modal, Form, Card, Collapse, ListGroup } from 'react-bootstrap';
// import { addProductToCategory, GetAllProducts, GetProductsByCategory ,deleteProductInCategory} from '../../axios/ProductAxios';

// const AllCategories = () => {
//     const { t, i18n } = useTranslation();
//     const myCategory = useSelector(c => c.DataReducer_Categry.Categorylist);
//     const [data, setData] = useState([]);
//     const dispatch = useDispatch();
//     const [showAddForm, setShowAddForm] = useState(false);
//     const [showSuccess, setShowSuccess] = useState(false);
//     const [addedCategory, setAddedCategory] = useState('');
//     const [newC, setNewC] = useState({
//         nameHe: '',
//         descriptionHe: '',
//         nameEn: '',
//         descriptionEn: '',
//         upCategory: 0,
//         ImageURL: '',
//         Image: null // Updated to null for file input
//     });

//     const [expandedCategories, setExpandedCategories] = useState([]);
//     const [products, setProducts] = useState([]);
//     const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//     const [productToDelete, setProductToDelete] = useState(null);
//     const [showEditForm, setShowEditForm] = useState(false);
//     const [currentCategory, setCurrentCategory] = useState(null);
//     const [allProducts, setAllProducts] = useState([]);
//     const [showModal, setShowModal] = useState(false);
//     const [modalCategory, setModalCategory] = useState(null);
//     const [selectedProducts, setSelectedProducts] = useState([]);
//     const [showSuccessModal, setShowSuccessModal] = useState(false);
//     const [addedProducts, setAddedProducts] = useState([]);
//     const [currentProduct, setCurrentProduct] = useState(null);
//     const [showDetailsModal, setShowDetailsModal] = useState(false);

//     useEffect(() => {
//         fetchData();
//     }, []);

//     async function fetchData() {
//         try {
//             const dataFromServer = await GetAllCategories();
//             setData(dataFromServer);
//             dispatch(setCategoryList(dataFromServer));
//         } catch (error) {
//             console.error("Error fetching categories:", error);
//             alert("An error occurred while fetching categories.");
//         }
//     }

//     const handleAddCategory = async (e) => {
//         e.preventDefault();
//         let formData = new FormData();
//         formData.append('nameHe', newC.nameHe);
//         formData.append('descriptionHe', newC.descriptionHe);
//         formData.append('nameEn', newC.nameEn);
//         formData.append('descriptionEn', newC.descriptionEn);
//         formData.append('upCategory', newC.upCategory);
//         formData.append('Image', newC.Image);

//         try {
//             const myResult = await addCategory(formData);
//             if (myResult.data) {
//                 setAddedCategory(newC.nameHe);
//                 setShowSuccess(true);
//                 await fetchData();
//             } else {
//                 alert("Failed to add category");
//             }
//         } catch (error) {
//             console.error("Error adding category:", error);
//             alert("An error occurred while adding the category.");
//         }

//         setNewC({
//             nameHe: '',
//             descriptionHe: '',
//             nameEn: '',
//             descriptionEn: '',
//             upCategory: 0,
//             ImageURL: '',
//             Image: null
//         });
//         setShowAddForm(false);
//     };

//     const handleChange = (e) => {
//         const { name, value, files } = e.target;
//         if (name === 'Image') {
//             setNewC({
//                 ...newC,
//                 Image: files[0]
//             });
//         } else {
//             setNewC({
//                 ...newC,
//                 [name]: value
//             });
//         }
//     };

//     const showProducts = async (categoryId) => {
//         try {
//             const products = await GetProductsByCategory(categoryId);
//             setProducts(prevProducts => ({
//                 ...prevProducts,
//                 [categoryId]: products
//             }));
//             setExpandedCategories(prevExpanded => [...prevExpanded, categoryId]);
//         } catch (error) {
//             console.error("Error fetching products:", error);
//             alert("An error occurred while fetching the products.");
//         }
//     };

//     const handleDeleteProduct = async () => {
//         if (!productToDelete) return;

//         try {
//             await deleteProductInCategory(productToDelete.categoryId, productToDelete.productId);
//             const updatedProducts = await GetProductsByCategory(productToDelete.categoryId);
//             setProducts(prevProducts => ({
//                 ...prevProducts,
//                 [productToDelete.categoryId]: updatedProducts
//             }));
//             setShowDeleteConfirm(false);
//             setProductToDelete(null);
//         } catch (error) {
//             console.error("Error deleting product:", error);
//             alert("An error occurred while deleting the product.");
//         }
//     };

//     const confirmDeleteProduct = (categoryId, productId) => {
//         setProductToDelete({ categoryId, productId });
//         setShowDeleteConfirm(true);
//     };

//     const handleEditCategory = (category) => {
//         setCurrentCategory(category);
//         setNewC({
//             nameHe: category.nameHe,
//             descriptionHe: category.descriptionHe,
//             nameEn: category.nameEn,
//             descriptionEn: category.descriptionEn,
//             upCategory: category.upCategory,
//             ImageURL: category.ImageURL,
//             Image: null // Updated to null for file input
//         });
//         setShowEditForm(true);
//     };

//     const handleUpdateCategory = async (e) => {
//         e.preventDefault();
//         try {
//             let formData = new FormData();
//             formData.append('nameHe', newC.nameHe);
//             formData.append('descriptionHe', newC.descriptionHe);
//             formData.append('nameEn', newC.nameEn);
//             formData.append('descriptionEn', newC.descriptionEn);
//             formData.append('upCategory', newC.upCategory);
//             formData.append('Image', newC.Image);

//             await updateCategory(currentCategory.categoryID, formData);
//             fetchData();
//             setShowEditForm(false);
//             setShowSuccess(true);
//         } catch (error) {
//             console.error("Error updating category:", error);
//             alert("An error occurred while updating the category.");
//         }
//         setNewC({
//             nameHe: '',
//             descriptionHe: '',
//             nameEn: '',
//             descriptionEn: '',
//             upCategory: 0,
//             ImageURL: '',
//             Image: null
//         });
//     };

//     const handleShowModal = (categoryID) => {
//         setModalCategory(categoryID);
//         loadAllProducts();
//         setShowModal(true);
//     };

//     const handleSelectProduct = (productID) => {
//         setSelectedProducts(prev =>
//             prev.includes(productID) ? prev.filter(id => id !== productID) : [...prev, productID]
//         );
//     };

//     const handleAddProductsToCategory = async () => {
//         const addedProducts = [];
//         for (let productID of selectedProducts) {
//             await addProductToCategory(modalCategory, productID);
//             addedProducts.push(allProducts.find(product => product.productID === productID));
//         }
//         setAddedProducts(addedProducts);
//         setShowModal(false);
//         setSelectedProducts([]);
//         setShowSuccessModal(true);
//         showProducts(modalCategory);
//     };

//     const handleShowDetailsModal = (product) => {
//         setCurrentProduct(product);
//         setShowDetailsModal(true);
//     };

//     const loadAllProducts = async () => {
//         try {
//             const products = await GetAllProducts();
//             setAllProducts(products);
//         } catch (error) {
//             console.error("Error fetching all products:", error);
//             alert("An error occurred while fetching all products.");
//         }
//     };

//     const handleDeleteCategory = async (categoryId) => {
//         try {
//             await deleteCategory(categoryId);
//             setData(prevData => prevData.filter(category => category.categoryID !== categoryId));
//             setExpandedCategories(prevExpanded => prevExpanded.filter(id => id !== categoryId));
//             setShowSuccess(true);
//         } catch (error) {
//             console.error("Error deleting category:", error);
//             alert("An error occurred while deleting the category.");
//         }
//     };

//     // const confirmDeleteCategory = (categoryId) => {
//     //     if (window.confirm("Are you sure you want to delete this category?")) {
//     //         handleDeleteCategory(categoryId);
//     //     }
//     // };

//     return (
//         <div className="container mt-4">
//             <div className="d-flex justify-content-between align-items-center mb-3">
//                 <h2>All Categories</h2>
//                 <Button variant="primary" onClick={() => setShowAddForm(true)}>הוספת קטגוריה</Button>
//             </div>
//             <ul className="list-group">
//                 {data.map(category => (
//                     <li key={category.categoryID} className="list-group-item">
//                         <h5>{category.nameHe} ({category.nameEn})</h5>
//                         <p>{category.descriptionHe} ({category.descriptionEn})</p>
//                         <small>Up Category: {category.upCategory} | Created At: {category.createAt}</small>
//                         <p>{category.ImageURL}</p>
//                         <div className="mt-3">
//                             <button className="btn btn-primary me-2" onClick={() => showProducts(category.categoryID)}>
//                                 {expandedCategories.includes(category.categoryID) ? 'הסתר מוצרים' : 'הצג מוצרים'}
//                             </button>
//                             <button className="btn btn-warning me-2" onClick={() => handleEditCategory(category)}>עריכה</button>
//                         </div>
//                         <Collapse in={expandedCategories.includes(category.categoryID)}>
//                             <div className="mt-3">
//                                 {products[category.categoryID] && products[category.categoryID].length > 0 ? (
//                                     <ListGroup>
//                                         {products[category.categoryID].map(product => (
//                                             <ListGroup.Item key={product.productID}>
//                                                 <div className="d-flex justify-content-between align-items-center">
//                                                     <div>
//                                                         <h6>{product.nameHe} ({product.nameEn})</h6>
//                                                         <p>{product.descriptionHe} ({product.descriptionEn})</p>
//                                                         <small>Price: {product.price}</small>
//                                                     </div>
//                                                     <div>
//                                                         <Button variant="danger" size="sm" onClick={() => confirmDeleteProduct(category.categoryID, product.productID)}>
//                                                             מחיקה
//                                                         </Button>
//                                                         <Button variant="info" size="sm" className="ms-2" onClick={() => handleShowDetailsModal(product)}>
//                                                             פרטים
//                                                         </Button>
//                                                     </div>
//                                                 </div>
//                                             </ListGroup.Item>
//                                         ))}
//                                     </ListGroup>
//                                 ) : (
//                                     <p>אין מוצרים להצגה בקטגוריה זו.</p>
//                                 )}
//                             </div>
//                         </Collapse>
//                     </li>
//                 ))}
//             </ul>

//             <Modal show={showAddForm} onHide={() => setShowAddForm(false)}>
//                 <Form onSubmit={handleAddCategory}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>הוספת קטגוריה חדשה</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <Form.Group className="mb-3" controlId="formBasicNameHe">
//                             <Form.Label>שם בעברית</Form.Label>
//                             <Form.Control type="text" placeholder="הזן שם בעברית" name="nameHe" value={newC.nameHe} onChange={handleChange} required />
//                         </Form.Group>

//                         <Form.Group className="mb-3" controlId="formBasicDescriptionHe">
//                             <Form.Label>תיאור בעברית</Form.Label>
//                             <Form.Control as="textarea" rows={3} placeholder="הזן תיאור בעברית" name="descriptionHe" value={newC.descriptionHe} onChange={handleChange} required />
//                         </Form.Group>

//                         <Form.Group className="mb-3" controlId="formBasicNameEn">
//                             <Form.Label>שם באנגלית</Form.Label>
//                             <Form.Control type="text" placeholder="Enter name in English" name="nameEn" value={newC.nameEn} onChange={handleChange} required />
//                         </Form.Group>

//                         <Form.Group className="mb-3" controlId="formBasicDescriptionEn">
//                             <Form.Label>תיאור באנגלית</Form.Label>
//                             <Form.Control as="textarea" rows={3} placeholder="Enter description in English" name="descriptionEn" value={newC.descriptionEn} onChange={handleChange} required />
//                         </Form.Group>

//                         <Form.Group className="mb-3" controlId="formBasicUpCategory">
//                             <Form.Label>קטגוריה עליונה</Form.Label>
//                             <Form.Control type="number" placeholder="הזן מספר קטגוריה עליונה" name="upCategory" value={newC.upCategory} onChange={handleChange} />
//                         </Form.Group>

//                         <Form.Group className="mb-3" controlId="formBasicImage">
//                             <Form.Label>תמונה</Form.Label>
//                             <Form.Control type="file" name="Image" onChange={handleChange} />
//                         </Form.Group>
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={() => setShowAddForm(false)}>
//                             ביטול
//                         </Button>
//                         <Button variant="primary" type="submit">
//                             הוספה
//                         </Button>
//                     </Modal.Footer>
//                 </Form>
//             </Modal>

//             <Modal show={showEditForm} onHide={() => setShowEditForm(false)}>
//                 <Form onSubmit={handleUpdateCategory}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>עריכת קטגוריה</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <Form.Group className="mb-3" controlId="formBasicNameHe">
//                             <Form.Label>שם בעברית</Form.Label>
//                             <Form.Control type="text" placeholder="הזן שם בעברית" name="nameHe" value={newC.nameHe} onChange={handleChange} required />
//                         </Form.Group>

//                         <Form.Group className="mb-3" controlId="formBasicDescriptionHe">
//                             <Form.Label>תיאור בעברית</Form.Label>
//                             <Form.Control as="textarea" rows={3} placeholder="הזן תיאור בעברית" name="descriptionHe" value={newC.descriptionHe} onChange={handleChange} required />
//                         </Form.Group>

//                         <Form.Group className="mb-3" controlId="formBasicNameEn">
//                             <Form.Label>שם באנגלית</Form.Label>
//                             <Form.Control type="text" placeholder="Enter name in English" name="nameEn" value={newC.nameEn} onChange={handleChange} required />
//                         </Form.Group>

//                         <Form.Group className="mb-3" controlId="formBasicDescriptionEn">
//                             <Form.Label>תיאור באנגלית</Form.Label>
//                             <Form.Control as="textarea" rows={3} placeholder="Enter description in English" name="descriptionEn" value={newC.descriptionEn} onChange={handleChange} required />
//                         </Form.Group>

//                         <Form.Group className="mb-3" controlId="formBasicUpCategory">
//                             <Form.Label>קטגוריה עליונה</Form.Label>
//                             <Form.Control type="number" placeholder="הזן מספר קטגוריה עליונה" name="upCategory" value={newC.upCategory} onChange={handleChange} />
//                         </Form.Group>

//                         <Form.Group className="mb-3" controlId="formBasicImage">
//                             <Form.Label>תמונה</Form.Label>
//                             <Form.Control type="file" name="Image" onChange={handleChange} />
//                         </Form.Group>
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={() => setShowEditForm(false)}>
//                             ביטול
//                         </Button>
//                         <Button variant="primary" type="submit">
//                             עדכון
//                         </Button>
//                     </Modal.Footer>
//                 </Form>
//             </Modal>

//             <Modal show={showModal} onHide={() => setShowModal(false)}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>הוספת מוצרים לקטגוריה</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <ListGroup>
//                         {allProducts.map(product => (
//                             <ListGroup.Item key={product.productID}>
//                                 <div className="d-flex justify-content-between align-items-center">
//                                     <div>
//                                         <h6>{product.nameHe} ({product.nameEn})</h6>
//                                         <p>{product.descriptionHe} ({product.descriptionEn})</p>
//                                         <small>Price: {product.price}</small>
//                                     </div>
//                                     <Form.Check
//                                         type="checkbox"
//                                         id={`product-${product.productID}`}
//                                         label="בחר מוצר"
//                                         checked={selectedProducts.includes(product.productID)}
//                                         onChange={() => handleSelectProduct(product.productID)}
//                                     />
//                                 </div>
//                             </ListGroup.Item>
//                         ))}
//                     </ListGroup>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setShowModal(false)}>
//                         ביטול
//                     </Button>
//                     <Button variant="primary" onClick={handleAddProductsToCategory}>
//                         הוספה
//                     </Button>
//                 </Modal.Footer>
//             </Modal>

//             <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>מחיקת מוצר</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <p>האם אתה בטוח שברצונך למחוק את המוצר הזה?</p>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
//                         ביטול
//                     </Button>
//                     <Button variant="danger" onClick={handleDeleteProduct}>
//                         מחיקה
//                     </Button>
//                 </Modal.Footer>
//             </Modal>

//             <Modal show={showSuccess} onHide={() => setShowSuccess(false)}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>פעולה בוצעה בהצלחה</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     {addedCategory && (
//                         <p>הקטגוריה "{addedCategory}" הוספה בהצלחה.</p>
//                     )}
//                     {addedProducts.length > 0 && (
//                         <p>המוצרים הבאים הוספו בהצלחה לקטגוריה.</p>
//                     )}
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="primary" onClick={() => setShowSuccess(false)}>
//                         סגירה
//                     </Button>
//                 </Modal.Footer>
//             </Modal>

//             <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>פעולה בוצעה בהצלחה</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <p>המוצרים הבאים הוספו בהצלחה לקטגוריה.</p>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="primary" onClick={() => setShowSuccessModal(false)}>
//                         סגירה
//                     </Button>
//                 </Modal.Footer>
//             </Modal>

//             <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>פרטי מוצר</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     {currentProduct && (
//                         <>
//                             <h5>{currentProduct.nameHe} ({currentProduct.nameEn})</h5>
//                             <p>{currentProduct.descriptionHe} ({currentProduct.descriptionEn})</p>
//                             <p>מחיר: {currentProduct.price}</p>
//                         </>
//                     )}
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
//                         סגירה
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     );
// };

// export default AllCategories;
