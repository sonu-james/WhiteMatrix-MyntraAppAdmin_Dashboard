import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { updateProductApi } from '../services/allApi';

const EditProductModal = ({ show, handleClose, product, refreshProducts }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    brandName: '',
    gender: '',
    description: '',
    status: 'Active',
    variants: [],
    discount: {
      type: 'flat',
      value: 0,
      startDate: '',
      endDate: '',
      isActive: false,
    },
  });

  // Populate form with product data on load
  useEffect(() => {
    if (product) {
      const updatedVariants = product.variants?.map((v) => ({
        ...v,
        previews: v.images?.map((img) => img),
        images: [],
      }));

      setFormData({
        title: product.title,
        category: product.category,
        brandName: product.brand?.name || '',
        gender: product.gender || '',
        description: product.description || '',
        status: product.status || 'Active',
        variants: updatedVariants || [],
        discount: {
          ...product.discount,
          startDate: product.discount?.startDate?.substring(0, 10) || '',
          endDate: product.discount?.endDate?.substring(0, 10) || '',
          isActive: product.discount?.isActive || false,
        },
      });
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[index][field] =
      ['price', 'stock'].includes(field) ? Number(value) : value;
    setFormData((prev) => ({ ...prev, variants: updatedVariants }));
  };

  const handleVariantImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const updatedVariants = [...formData.variants];
    updatedVariants[index].images = [file];
    updatedVariants[index].previews = [URL.createObjectURL(file)];
    setFormData((prev) => ({ ...prev, variants: updatedVariants }));
  };

  const removeVariantImagePreview = (vIdx) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[vIdx].images = [];
    updatedVariants[vIdx].previews = [];
    setFormData((prev) => ({ ...prev, variants: updatedVariants }));
  };

  const addVariant = () => {
    setFormData((prev) => ({
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
          previews: [],
        },
      ],
    }));
  };

  const removeVariant = (index) => {
    const updatedVariants = [...formData.variants];
    updatedVariants.splice(index, 1);
    setFormData((prev) => ({ ...prev, variants: updatedVariants }));
  };

  const handleDiscountChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      discount: {
        ...prev.discount,
        [field]: field === 'value' ? Number(value) : value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token');
    if (!token) return toast.error('Unauthorized');

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    const reqBody = new FormData();
    reqBody.append('title', formData.title);
    reqBody.append('category', formData.category);
    reqBody.append('brandName', formData.brandName);
    reqBody.append('gender', formData.gender);
    reqBody.append('description', formData.description);
    reqBody.append('status', formData.status);
    reqBody.append('discount', JSON.stringify(formData.discount));

    const cleanVariants = formData.variants.map((variant) => {
      const retained = variant.previews.find(
        (img) => typeof img === 'string' && !img.startsWith('blob:')
      );

      return {
        sku: variant.sku,
        color: variant.color,
        size: variant.size,
        price: variant.price,
        stock: variant.stock,
        images: retained ? [retained] : [],
        newImageCount: variant.images.length > 0 ? 1 : 0,
      };
    });

    reqBody.append('variants', JSON.stringify(cleanVariants));

    formData.variants.forEach((variant) => {
      if (variant.images[0] instanceof File) {
        reqBody.append('images', variant.images[0]);
      }
    });

    try {
      const result = await updateProductApi(product._id, reqBody, reqHeader);
      if (result.status === 200) {
        toast.success('Product updated successfully');
        handleClose();
        refreshProducts();
      } else {
        toast.error(result.data?.message || 'Update failed');
      }
    } catch (err) {
      console.error('Update Error:', err);
      // toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Basic Product Details */}
          <Row>
            <Col md={6}>
              <Form.Label>Title</Form.Label>
              <Form.Control name="title" value={formData.title} onChange={handleInputChange} required />
            </Col>
            <Col md={6}>
              <Form.Label>Category</Form.Label>
              <Form.Control name="category" value={formData.category} onChange={handleInputChange} required />
            </Col>
            <Col md={6}>
              <Form.Label>Brand</Form.Label>
              <Form.Control name="brandName" value={formData.brandName} onChange={handleInputChange} />
            </Col>
            <Col md={6}>
              <Form.Label>Gender</Form.Label>
              <Form.Select name="gender" value={formData.gender} onChange={handleInputChange}>
                <option value="">Select</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Unisex">Unisex</option>
              </Form.Select>
            </Col>
            <Col md={12}>
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                as="textarea"
                rows={3}
              />
            </Col>
            <Col md={6}>
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" value={formData.status} onChange={handleInputChange}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Select>
            </Col>
          </Row>

          {/* Variants */}
          <hr />
          <h6>Variants</h6>
          {formData.variants.map((variant, index) => (
            <div key={index} className="border p-3 mb-3 bg-light rounded">
              <Row>
                <Col md={3}><Form.Control placeholder="SKU" value={variant.sku} onChange={(e) => handleVariantChange(index, 'sku', e.target.value)} /></Col>
                <Col md={3}><Form.Control placeholder="Color" value={variant.color} onChange={(e) => handleVariantChange(index, 'color', e.target.value)} /></Col>
                <Col md={2}><Form.Control placeholder="Size" value={variant.size} onChange={(e) => handleVariantChange(index, 'size', e.target.value)} /></Col>
                <Col md={2}><Form.Control placeholder="Price" type="number" value={variant.price} onChange={(e) => handleVariantChange(index, 'price', e.target.value)} /></Col>
                <Col md={2}><Form.Control placeholder="Stock" type="number" value={variant.stock} onChange={(e) => handleVariantChange(index, 'stock', e.target.value)} /></Col>
              </Row>

              {/* Image Upload */}
              <Form.Group className="mt-2">
                <Form.Label>Variant Image</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={(e) => handleVariantImageUpload(e, index)} />
                <div className="d-flex flex-wrap gap-2 mt-2">
                  {variant.previews?.map((img, i) => (
                    <div key={i} style={{ position: 'relative' }}>
                      <img src={img} alt="preview" width="60" className="img-thumbnail" />
                      <Button variant="danger" size="sm" style={{ position: 'absolute', top: '-5px', right: '-5px', borderRadius: '50%' }} onClick={() => removeVariantImagePreview(index)}>×</Button>
                    </div>
                  ))}
                </div>
              </Form.Group>

              {formData.variants.length > 1 && (
                <Button variant="danger" size="sm" className="mt-2" onClick={() => removeVariant(index)}>
                  Remove Variant
                </Button>
              )}
            </div>
          ))}
          <Button variant="success" onClick={addVariant}>+ Add Variant</Button>

          {/* Discount Section */}
          <hr />
          <h6>Discount</h6>
          <Row>
            <Col md={4}>
              <Form.Label>Type</Form.Label>
              <Form.Select value={formData.discount.type} onChange={(e) => handleDiscountChange('type', e.target.value)}>
                <option value="flat">Flat</option>
                <option value="percentage">Percentage</option>
              </Form.Select>
            </Col>
            <Col md={4}>
              <Form.Label>Value</Form.Label>
              <Form.Control type="number" value={formData.discount.value} onChange={(e) => handleDiscountChange('value', e.target.value)} />
            </Col>
            <Col md={4} className="pt-4">
              <Form.Check
                type="checkbox"
                label="Is Active"
                checked={formData.discount.isActive}
                onChange={(e) => handleDiscountChange('isActive', e.target.checked)}
              />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={6}>
              <Form.Label>Start Date</Form.Label>
              <Form.Control type="date" value={formData.discount.startDate} onChange={(e) => handleDiscountChange('startDate', e.target.value)} />
            </Col>
            <Col md={6}>
              <Form.Label>End Date</Form.Label>
              <Form.Control type="date" value={formData.discount.endDate} onChange={(e) => handleDiscountChange('endDate', e.target.value)} />
            </Col>
          </Row>

          {/* Submit Buttons */}
          <div className="mt-4 d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose} className="me-2">Cancel</Button>
            <Button variant="primary" type="submit">Save Changes</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditProductModal;
