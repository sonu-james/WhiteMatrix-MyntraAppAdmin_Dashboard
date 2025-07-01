import React from 'react';
import { Modal, Button, Row, Col, Card, Badge } from 'react-bootstrap';
import { serverUrl } from '../services/serverUrl';

const ViewProductDetailsModal = ({ show, handleClose, product }) => {
  if (!product) return null;

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{product.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-3">
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Img
                variant="top"
                src={
                  product?.variants?.[0]?.images?.[0]
                    ? `${serverUrl}/${product.variants[0].images[0].replace(/^\/+/, '')}`
                    : 'https://via.placeholder.com/150'
                }
                alt={product.title}
                className="img-fluid"
              />
            </Card>
          </Col>
          <Col md={8}>
            <p><strong>Brand:</strong> {product.brand?.name || '—'}</p>
            <p><strong>Category:</strong> {product.category || '—'}</p>
            <p><strong>Gender:</strong> {product.gender || '—'}</p>
            <p><strong>Description:</strong> {product.description || '—'}</p>
            <p>
              <strong>Status:</strong>{' '}
              <Badge bg={product.status === 'Active' ? 'success' : 'secondary'}>
                {product.status}
              </Badge>
            </p>
          </Col>
        </Row>

        <h5 className="mt-4">Variants</h5>
        {product.variants?.map((variant, index) => (
          <Card key={index} className="mb-3 shadow-sm">
            <Card.Header className="bg-light">
              <strong>Variant {index + 1}</strong>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={4}>
                  <div className="d-flex gap-2 flex-wrap justify-content-start">
                    {variant.images.length > 0 ? (
                      variant.images.map((img, i) => (
                        <img
                          key={i}
                          src={`${serverUrl}/${img.replace(/^\/+/, '')}`}
                          alt={`variant-${index}-img-${i}`}
                          width="70"
                          height="70"
                          className="img-thumbnail"
                        />
                      ))
                    ) : (
                      <p className="text-muted">No Images</p>
                    )}
                  </div>
                </Col>

                <Col md={8}>
                  <Row className="mb-2">
                    <Col sm={6}><strong>SKU:</strong> {variant.sku || '—'}</Col>
                    <Col sm={6}><strong>Color:</strong> {variant.color || '—'}</Col>
                  </Row>
                  <Row className="mb-2">
                    <Col sm={6}><strong>Size:</strong> {variant.size || '—'}</Col>
                    <Col sm={6}><strong>Stock:</strong> {variant.stock || 0}</Col>
                  </Row>
                  <Row className="mb-2">
                    <Col sm={6}><strong>Price:</strong> ₹{variant.price || 0}</Col>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}


        {product.discount?.isActive && (
          <>
            <h5 className="mt-4">Discount</h5>
            <Row>
              <Col><p><strong>Type:</strong> {product.discount.type}</p></Col>
              <Col><p><strong>Value:</strong> {product.discount.value}</p></Col>
              <Col><p><strong>Start:</strong> {new Date(product.discount.startDate).toLocaleDateString()}</p></Col>
              <Col><p><strong>End:</strong> {new Date(product.discount.endDate).toLocaleDateString()}</p></Col>
            </Row>
          </>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewProductDetailsModal;
