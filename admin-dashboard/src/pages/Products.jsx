import React, { useState } from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import AddProductModal from '../component/AddProductModal';

const Products = () => {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const products = [
    {
      id: 1,
      image: 'https://4.imimg.com/data4/AL/SN/MY-13188030/men-s-stylish-shirt-500x500.jpg',
      title: 'Stylish Shirt',
      brand: 'FashionBrand',
      category: 'Men',
      price: 1200,
      discountedPrice: 899,
      stock: 20,
      variants: ['M', 'L', 'XL'],
      status: 'Active',
    },
    // Add more products as needed...
  ];


  return (
   <>
    <div className="container mt-4">
      {/* Heading + Add Button */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 fw-semibold mb-0">Products</h1>
        <Button variant="primary" onClick={handleShow}>
          + Add Product
        </Button>
      </div>
      <div className="table-responsive">
        <table className="table table-bordered  align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>Image</th>
              <th>Title / Name</th>
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
            {products.map((prod) => (
              <tr key={prod.id}>
                <td>
                  <img src={prod.image} alt={prod.title} width="50" height="50" className="img-fluid" />
                </td>
                <td>{prod.title}</td>
                <td>{prod.brand}</td>
                <td>{prod.category}</td>
                <td>
                  <span className="text-muted text-decoration-line-through me-2">₹{prod.price}</span>
                  <span className="fw-bold text-success">₹{prod.discountedPrice}</span>
                </td>
                <td>{prod.stock}</td>
                <td>{prod.variants.join(', ')}</td>
                <td>
                  <span className={`badge ${prod.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>
                    {prod.status}
                  </span>
                </td>
                <td>
                  <div className="d-flex justify-content-center align-items-center gap-2">
                    <Button variant="info" size="sm">
                      <FaEye />
                    </Button>
                    <Button variant="warning" size="sm">
                      <FaEdit />
                    </Button>
                    <Button variant="danger" size="sm">
                      <FaTrash />
                    </Button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
       <AddProductModal show={show} handleClose={handleClose} />
   </>
    
  );
};

export default Products;
