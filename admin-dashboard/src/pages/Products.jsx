import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import AddProductModal from '../component/AddProductModal';
import { allProductApi, deleteProductApi } from '../services/allApi';
import { serverUrl } from '../services/serverUrl';
import ViewProductDetailsModal from '../component/ViewProductDetailsModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditProductModal from '../component/EditProductModal';



const Products = () => {
  const [show, setShow] = useState(false);
  const [allProduct, setAllProduct] = useState([]);
  const [isToken, setIsToken] = useState('');
  const [viewProductDetails, setViewProductDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleProductViewClose = () => setViewProductDetails(false);

  const handleProductViewShow = (product) => {
    setSelectedProduct(product); // Store full product object
    setViewProductDetails(true); // Open modal
  };

  const handleEditProductDetails = (product) => {
    setEditProduct(product)
    setEditModalShow(true)
  }

  const getAllProducts = async () => {
    const token = sessionStorage.getItem('token');
    if (!token) return;

    const reqHeader = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    try {
      const result = await allProductApi(reqHeader);
      console.log(result);

      if (result.status === 200) {
        setAllProduct(result.data);
      } else {
        console.error('Failed to fetch products');
      }
    } catch (err) {
      console.error('API error:', err);
    }
  };


  const handleDelete = async (id) => {
    const result = await deleteProductApi(id)
    console.log(result.data);
    toast.success("Product Deleted successfully")
    getAllProducts();

  }


  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) setIsToken(token);
    getAllProducts();
  }, []);

  return (
    <>
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="h4 fw-semibold mb-0">Products</h1>
          <Button variant="primary" onClick={handleShow}>
            + Add Product
          </Button>
        </div>

        <div
          className="table-responsive rounded shadow"
          style={{ maxHeight: '500px', overflowY: 'auto' }}
        >
          <table className="table align-middle text-center mb-0">
            <thead className="table-primary" style={{ position: 'sticky', top: 0, zIndex: 1 }}>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Variants</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allProduct.map((prod, index) => {
                const firstImage = prod.variants?.[0]?.images?.[0] || prod.image || '';
                console.log(firstImage);
                const brandName = prod?.brand?.name || '—';
                const allSizes = prod?.variants?.map(v => v.size).join(', ') || '—';
                const originalPrice = prod?.variants?.[0]?.price || 0;
                const discountValue = prod?.discount?.value || 0;
                const discountType = prod?.discount?.type || 'flat';
                const discountedPrice =
                  discountType === 'percentage'
                    ? originalPrice - (originalPrice * discountValue) / 100
                    : originalPrice - discountValue;

                const totalStock = prod?.variants?.reduce((sum, v) => sum + Number(v.stock || 0), 0);

                return (
                  <tr key={index}>
                    <td>
                      {firstImage && (
                        <img
                          src={
                            firstImage.startsWith('/')
                              ? `${serverUrl}${firstImage}`
                              : `${serverUrl}/${firstImage}`
                          }
                          alt={prod.title}
                          width="50"
                          height="50"
                          className="img-fluid"
                        />
                      )}
                    </td>
                    <td>{prod.title}</td>
                    <td>{brandName}</td>
                    <td>{prod.category}</td>
                    <td>
                      <span className="text-muted text-decoration-line-through me-2">
                        ₹{originalPrice}
                      </span>
                      <span className="fw-bold text-success">
                        ₹{Math.round(discountedPrice)}
                      </span>
                    </td>
                    <td>{totalStock}</td>
                    <td>{allSizes}</td>
                    <td>
                      <span className={`badge ${prod.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>
                        {prod.status || 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <Button variant="info" size="sm" onClick={() => handleProductViewShow(prod)}>
                          <FaEye />
                        </Button>
                        <Button variant="warning" size="sm" onClick={() => handleEditProductDetails(prod)}>
                          <FaEdit />
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => handleDelete(prod._id)}>
                          <FaTrash />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>


      <AddProductModal show={show} handleClose={handleClose} />
      <ViewProductDetailsModal
        show={viewProductDetails}
        handleClose={handleProductViewClose}
        product={selectedProduct}
      />
      <EditProductModal
        show={editModalShow}
        handleClose={() => setEditModalShow(false)}
        product={editProduct} />
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

export default Products;
