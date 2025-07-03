import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Row, Col, ProgressBar } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProductApi } from '../services/allApi';


function AddProductModal({ show, handleClose }) {
  const [productImage, setProductImage] = useState(null);
  const [productImagePreview, setProductImagePreview] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const initialProductDetails = {
    title: '',
    description: '',
    category: '',
    brand: { name: '' },
    gender: 'unisex',
    status: 'Active', // 👈 Add this line
    variants: [
      {
        sku: '',
        color: '',
        size: '',
        price: 0,
        stock: 0,
        images: [],
        previews: []
      }
    ],
    discount: {
      type: 'flat',
      value: 0,
      startDate: '',
      endDate: '',
      isActive: false
    }
  };

  const [productDetails, setProductDetails] = useState(initialProductDetails);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleBrandNameChange = (e) => {
    setProductDetails(prev => ({
      ...prev,
      brand: { ...prev.brand, name: e.target.value }
    }));
  };

  const handleBrandImageUpload = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
    setProductImagePreview(URL.createObjectURL(file));
  };

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...productDetails.variants];
    updatedVariants[index][field] = value;
    setProductDetails({ ...productDetails, variants: updatedVariants });
  };

  const handleVariantImageUpload = (e, index) => {
    const files = Array.from(e.target.files);
    const updatedVariants = [...productDetails.variants];
    updatedVariants[index].images = [...updatedVariants[index].images, ...files];
    updatedVariants[index].previews = [
      ...updatedVariants[index].previews,
      ...files.map(file => URL.createObjectURL(file))
    ];
    setProductDetails({ ...productDetails, variants: updatedVariants });
  };

  const removePreviewImage = (variantIndex, imgIndex) => {
    const updatedVariants = [...productDetails.variants];
    updatedVariants[variantIndex].images.splice(imgIndex, 1);
    updatedVariants[variantIndex].previews.splice(imgIndex, 1);
    setProductDetails({ ...productDetails, variants: updatedVariants });
  };

  const addVariant = () => {
    setProductDetails(prev => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          sku: '',
          color: '',
          size: '',
          price: 0,
          stock: 0,
          images: [],
          previews: []
        }
      ]
    }));
  };

  const removeVariant = (index) => {
    const updatedVariants = [...productDetails.variants];
    updatedVariants.splice(index, 1);
    setProductDetails({ ...productDetails, variants: updatedVariants });
  };

  const resetForm = () => {
    setProductDetails(initialProductDetails);
    setProductImage(null);
    setProductImagePreview('');
    setUploadProgress(0);
  };

  // Reset form when modal is closed
  useEffect(() => {
    if (!show) {
      resetForm();
    }
  }, [show]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reqBody = new FormData();

    reqBody.append('title', productDetails.title);
    reqBody.append('description', productDetails.description);
    reqBody.append('category', productDetails.category);
    reqBody.append('brandName', productDetails.brand.name);
    reqBody.append('gender', productDetails.gender);
    reqBody.append('status', productDetails.status);

    const cleanVariants = productDetails.variants.map(({ previews, ...rest }) => rest);
    reqBody.append('variants', JSON.stringify(cleanVariants));
    reqBody.append('discount', JSON.stringify(productDetails.discount));

    if (productImage) {
      reqBody.append('images', productImage);
    }

    productDetails.variants.forEach(variant => {
      variant.images.forEach(file => {
        reqBody.append('images', file);
      });
    });

    const token = sessionStorage.getItem('token');

  if (!token) {
  toast.info('Please login to continue.');
  return;
}

const reqHeader = {
  'Content-Type': 'multipart/form-data',
  Authorization: `Bearer ${token}`,
};

try {
  const result = await addProductApi(reqBody, reqHeader);

  // Check for success via HTTP status or success flag
  const isSuccess = result?.status === 200 || result?.data?.success === true;

  if (isSuccess) {
    toast.success(result?.data?.message || '✅ Product uploaded successfully!');
    resetForm();     // Clear form inputs
    handleClose();   // Close modal
  } else {
    const message = result?.data?.message || '❌ Failed to add product.';
    console.warn('Unexpected API response:', result);
    toast.error(message);
  }
} catch (err) {
  // Log the full error object for debugging
  console.error('API error:', err);

  const errorMessage =
    err?.response?.data?.message ||
    err?.message ||
    '❌ Upload failed due to an unexpected error.';
    
  toast.error(errorMessage);
} finally {
  setUploadProgress(0); // Reset upload progress bar
}


  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={productDetails.title} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" name="description" value={productDetails.description} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control type="text" name="category" value={productDetails.category} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Brand Name</Form.Label>
              <Form.Control type="text" value={productDetails.brand.name} onChange={handleBrandNameChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Brand Logo</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleBrandImageUpload} />
              {productImagePreview && <img src={productImagePreview} alt="brand" className="mt-2" style={{ width: '100px' }} />}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Select name="gender" value={productDetails.gender} onChange={handleInputChange}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="unisex">Unisex</option>
                <option value="kids">Kids</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">

              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={productDetails.status}
                onChange={(e) => setProductDetails({ ...productDetails, status: e.target.value })}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Select>
            </Form.Group>



            <h5 className="mt-4">Variants</h5>
            {productDetails.variants.map((variant, index) => (
              <div key={index} className="p-3 mb-3 border bg-light rounded">
                <Row>
                  <Col><Form.Control placeholder="SKU" value={variant.sku} onChange={(e) => handleVariantChange(index, 'sku', e.target.value)} /></Col>
                  <Col><Form.Control placeholder="Color" value={variant.color} onChange={(e) => handleVariantChange(index, 'color', e.target.value)} /></Col>
                  <Col><Form.Control placeholder="Size" value={variant.size} onChange={(e) => handleVariantChange(index, 'size', e.target.value)} /></Col>
                </Row>
                <Row className="mt-2">
                  <Col><Form.Control type="number" placeholder="Price" value={variant.price} onChange={(e) => handleVariantChange(index, 'price', e.target.value)} /></Col>
                  <Col><Form.Control type="number" placeholder="Stock" value={variant.stock} onChange={(e) => handleVariantChange(index, 'stock', e.target.value)} /></Col>
                </Row>
                <Form.Group className="mt-2">
                  <Form.Label>Variant Images</Form.Label>
                  <Form.Control type="file" multiple accept="image/*" onChange={(e) => handleVariantImageUpload(e, index)} />
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {variant.previews.map((img, i) => (
                      <div key={i} style={{ position: 'relative' }}>
                        <img src={img} alt="preview" style={{ width: '60px' }} />
                        <Button variant="danger" size="sm" style={{ position: 'absolute', top: '-5px', right: '-5px', borderRadius: '50%' }} onClick={() => removePreviewImage(index, i)}>×</Button>
                      </div>
                    ))}
                  </div>
                </Form.Group>
                {productDetails.variants.length > 1 && (
                  <Button variant="danger" size="sm" className="mt-2" onClick={() => removeVariant(index)}>Remove Variant</Button>
                )}
              </div>
            ))}
            <Button variant="success" onClick={addVariant}>+ Add Variant</Button>

            <h5 className="mt-4">Discount</h5>
            <Row>
              <Col>
                <Form.Select value={productDetails.discount.type} onChange={(e) => setProductDetails({ ...productDetails, discount: { ...productDetails.discount, type: e.target.value } })}>
                  <option value="flat">Flat</option>
                  <option value="percentage">Percentage</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Control type="number" placeholder="Value" value={productDetails.discount.value} onChange={(e) => setProductDetails({ ...productDetails, discount: { ...productDetails.discount, value: e.target.value } })} />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col><Form.Control type="date" value={productDetails.discount.startDate} onChange={(e) => setProductDetails({ ...productDetails, discount: { ...productDetails.discount, startDate: e.target.value } })} /></Col>
              <Col><Form.Control type="date" value={productDetails.discount.endDate} onChange={(e) => setProductDetails({ ...productDetails, discount: { ...productDetails.discount, endDate: e.target.value } })} /></Col>
            </Row>
            <Form.Check className="mt-2" type="checkbox" label="Is Active" checked={productDetails.discount.isActive} onChange={(e) => setProductDetails({ ...productDetails, discount: { ...productDetails.discount, isActive: e.target.checked } })} />

            {uploadProgress > 0 && <ProgressBar className="mt-3" now={uploadProgress} label={`${uploadProgress}%`} />}

            <Button type="submit" variant="primary" className="mt-4">Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>

      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default AddProductModal;
