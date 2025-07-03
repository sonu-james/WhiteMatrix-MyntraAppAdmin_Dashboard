import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaAd } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getAllAdsApi, deleteAdApi } from '../services/allApi';
import AddAdModal from '../component/AddAdModal';

const AdManager = () => {
  const [ads, setAds] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const getAllAds = async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      toast.info('Please login to view ads.');
      return;
    }

    const reqHeader = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    try {
      const result = await getAllAdsApi(reqHeader);
      const adList = result.data.ads || result.data;
      if (Array.isArray(adList)) {
        setAds(adList);
      } else {
        toast.error('Invalid ad data format received.');
        setAds([]);
      }
    } catch (err) {
      console.error('API error:', err);
      toast.error('Error fetching ads');
      setAds([]);
    }
  };

  useEffect(() => {
    getAllAds();
  }, []);

const handleDelete = async (id) => {
  try {
    const result = await deleteAdApi(id); // Call your delete API
    console.log(result.data); // Log the response
    toast.success("Advertisement deleted successfully"); // Show toast
    getAllAds(); // Refresh the list
  } catch (error) {
    console.error("Delete Ad Error:", error);
    toast.error("Failed to delete advertisement");
  }
};


  return (
    <div className="container-fluid" style={{ height: '80vh', overflow: 'hidden' }}>
      <div className="py-3 px-4">
       <div className="d-flex justify-content-between align-items-center mb-3">
  <h5 className="mb-0 d-flex align-items-center">
    <FaAd className="me-2" />
    Advertisement Manager
  </h5>
  <Button variant="primary" onClick={() => setShowModal(true)}>
    + Add Advertisement
  </Button>
</div>


       <div className="mt-4 border rounded" style={{ maxHeight: '75vh', overflow: 'hidden' }}>
  <Table bordered hover className="mb-0 text-center align-middle">
    <thead
      className="table-primary"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 2,
        backgroundColor: '#f8f9fa' // fallback for sticky header
      }}
    >
      <tr>
        <th className="fw-semibold">Banner</th>
        <th className="fw-semibold">Title</th>
        <th className="fw-semibold">Link</th>
        <th className="fw-semibold">Status</th>
        <th className="fw-semibold">Action</th>
      </tr>
    </thead>
  </Table>

  {/* Scrollable body */}
  <div style={{ maxHeight: '65vh', overflowY: 'auto' }}>
    <Table bordered hover className="mb-0 text-center align-middle">
      <tbody>
  {ads.length === 0 ? (
    <tr>
      <td colSpan="5">No advertisements found.</td>
    </tr>
  ) : (
    ads.map((ad) => {
      const serverUrl = "http://localhost:4000"; // Replace with your actual server URL
      const imagePath = ad.image?.startsWith('/')
        ? `${serverUrl}${ad.image}`
        : `${serverUrl}/${ad.image}`;

      return (
        <tr key={ad._id}>
          <td>
            <img
              src={imagePath}
              alt={ad.title}
              className="img-fluid"
              style={{ width: '180px', height: '80px', objectFit: 'cover' }}
            />
          </td>
          <td className="text-capitalize fw-medium">{ad.title}</td>
          <td>
            {ad.link ? (
              <a
                href={ad.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-underline text-primary"
              >
                Visit
              </a>
            ) : (
              <span className="text-muted">—</span>
            )}
          </td>
          <td>
            <span
              className={`badge px-3 py-2 rounded-pill fw-semibold ${
                ad.isActive ? 'bg-success' : 'bg-secondary'
              }`}
            >
              {ad.isActive ? 'Active' : 'Inactive'}
            </span>
          </td>
          <td>
            <div className="d-flex justify-content-center gap-2">
              <Button
                variant="outline-danger"
                size="sm"
                className="rounded-pill px-3"
                onClick={() => handleDelete(ad._id)}
              >
                <i className="bi bi-trash me-1"></i> Delete
              </Button>
            </div>
          </td>
        </tr>
      );
    })
  )}
</tbody>

    </Table>
  </div>
</div>

      </div>

      {/* Add Advertisement Modal */}
      <AddAdModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        onAdAdded={getAllAds}
      />
    </div>
  );
};

export default AdManager;
