import React, { useState } from 'react';
import { Modal, Button, Form, ProgressBar } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addAdApi } from '../services/allApi';

function AddAdModal({ show, handleClose }) {
  const [adData, setAdData] = useState({
    title: '',
    link: '',
    isActive: true,
    expiresAt: ''
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
//   const [uploadProgress, setUploadProgress] = useState(0);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAdData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setAdData({
      title: '',
      link: '',
      isActive: true,
      expiresAt: ''
    });
    setImage(null);
    setPreview('');
    // setUploadProgress(0);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Validation
  if (!adData.title || !image) {
    toast.warn('Title and image are required');
    return;
  }

  // Create form data
  const formData = new FormData();
  formData.append('title', adData.title);
  formData.append('link', adData.link);
  formData.append('isActive', adData.isActive);
  formData.append('expiresAt', adData.expiresAt);
  formData.append('image', image);

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
  const result = await addAdApi(formData, reqHeader);

  console.log('📤 Upload Result:', result); // 👈 Helpful for debugging

  if (result.status === 201) {
    toast.success('Advertisement uploaded successfully!');
    resetForm();
    handleClose();
    if (typeof onAdAdded === 'function') {
      onAdAdded(); // Refresh ad list
    }
  } else {
    toast.error(result?.data?.message || 'Failed to upload advertisement.');
  }
} catch (error) {
  console.error('Upload Error:', error);
  toast.error(error?.response?.data?.error || 'Unexpected error occurred');
}

};


  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Advertisement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control name="title" value={adData.title} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Link (optional)</Form.Label>
              <Form.Control name="link" value={adData.link} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Expires At</Form.Label>
              <Form.Control type="date" name="expiresAt" value={adData.expiresAt} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Is Active"
                name="isActive"
                checked={adData.isActive}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ad Banner Image</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
              {preview && <img src={preview} alt="Ad Preview" className="mt-2" style={{ width: '100%' }} />}
            </Form.Group>

            {/* {uploadProgress > 0 && (
              <ProgressBar now={uploadProgress} label={`${uploadProgress}%`} className="mt-3" />
            )} */}

            <Button type="submit" variant="primary" className="mt-3">Submit</Button>
          </Form>
        </Modal.Body>
        <ToastContainer position="top-center" autoClose={3000} />
      </Modal>
    </>
  );
}

export default AddAdModal;
