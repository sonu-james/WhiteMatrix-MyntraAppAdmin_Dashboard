import React, { useState, useEffect } from 'react';
import {
  Container, Table, Button, Modal, Form, Row, Col,
} from 'react-bootstrap';
import axios from 'axios';
import {
  MapContainer, TileLayer, Marker, useMapEvents, useMap
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const LocationSelector = ({ setCoords }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setCoords([lng, lat]);
    },
  });
  return null;
};

// Map updater to recenter when coordinates change
const MapUpdater = ({ coordinates }) => {
  const map = useMap();

  useEffect(() => {
    if (coordinates) {
      map.setView([coordinates[1], coordinates[0]], 13);
    }
  }, [coordinates, map]);

  return null;
};

function Godown() {
  const [godowns, setGodowns] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingGodown, setEditingGodown] = useState(null);
  const [form, setForm] = useState({
    name: '',
    address: '',
    coordinates: null,
  });

  // Fetch godowns from backend (dummy version, plug your API)
  const fetchGodowns = async () => {
    try {
      const res = await axios.get('/api/godowns'); // Make sure this route exists
      setGodowns(res.data);
    } catch (err) {
      console.error('Failed to fetch godowns:', err);
    }
  };

  useEffect(() => {
    fetchGodowns();
  }, []);

  const handleAddressBlur = async () => {
    if (!form.address) return;

    try {
      const res = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: form.address,
          format: 'json',
          addressdetails: 1,
          limit: 1,
        },
        headers: {
          'Accept-Language': 'en',
        },
      });

      const place = res.data[0];
      if (place) {
        const lat = parseFloat(place.lat);
        const lon = parseFloat(place.lon);
        setForm((prev) => ({
          ...prev,
          coordinates: [lon, lat],
        }));
      } else {
        alert('Address not found.');
      }
    } catch (err) {
      console.error('Geocoding error:', err);
      alert('Failed to fetch location.');
    }
  };

  const handleSave = async () => {
    if (!form.name || !form.address || !form.coordinates) {
      alert('Please fill all fields.');
      return;
    }

    const payload = {
      name: form.name,
      address: form.address,
      location: {
        type: 'Point',
        coordinates: form.coordinates,
      },
    };

    try {
      if (editingGodown) {
        await axios.put(`/api/godowns/${editingGodown._id}`, payload);
      } else {
        await axios.post('/api/godowns', payload);
      }

      setShowModal(false);
      setForm({ name: '', address: '', coordinates: null });
      setEditingGodown(null);
      fetchGodowns();
    } catch (err) {
      console.error('Error saving godown:', err);
    }
  };

  const handleEdit = (godown) => {
    setEditingGodown(godown);
    setForm({
      name: godown.name,
      address: godown.address,
      coordinates: godown.location.coordinates,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this godown?')) {
      await axios.delete(`/api/godowns/${id}`);
      fetchGodowns();
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-3">Godown Management</h2>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        + Add Godown
      </Button>

      {/* <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Coordinates</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {godowns?.map((g) => (
            <tr key={g._id}>
              <td>{g.name}</td>
              <td>{g.address}</td>
              <td>{g.location.coordinates.join(', ')}</td>
              <td>
                <Button size="sm" variant="warning" onClick={() => handleEdit(g)}>Edit</Button>{' '}
                <Button size="sm" variant="danger" onClick={() => handleDelete(g._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table> */}

      {showModal && (
        <Modal size="lg" show onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{editingGodown ? 'Edit Godown' : 'Add Godown'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Godown Name</Form.Label>
                    <Form.Control
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Enter name"
                    />
                  </Form.Group>

                  <Form.Group className="mt-2">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      onBlur={handleAddressBlur}
                      placeholder="Enter address"
                    />
                  </Form.Group>

                  {form.coordinates && (
                    <div className="mt-2">
                      <strong>📍 Coordinates:</strong> {form.coordinates[1]}, {form.coordinates[0]}
                    </div>
                  )}
                </Col>

                <Col md={6}>
                  <Form.Label>Select Location</Form.Label>
                  <div style={{ height: 300 }}>
                    <MapContainer
                      center={form.coordinates ? [form.coordinates[1], form.coordinates[0]] : [12.9716, 77.5946]}
                      zoom={13}
                      style={{ height: '100%' }}
                    >
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      <LocationSelector setCoords={(c) => setForm({ ...form, coordinates: c })} />
                      <MapUpdater coordinates={form.coordinates} />
                      {form.coordinates && (
                        <Marker position={[form.coordinates[1], form.coordinates[0]]} />
                      )}
                    </MapContainer>
                  </div>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="success" onClick={handleSave}>
              {editingGodown ? 'Update' : 'Add'}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
}

export default Godown;
