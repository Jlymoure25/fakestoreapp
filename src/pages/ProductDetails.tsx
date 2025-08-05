import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert, Badge } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [addToCartLoading, setAddToCartLoading] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<string | null>(null);
  const [cartEntry, setCartEntry] = useState<any>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError('Product ID is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      setAddToCartLoading(true);
      // Simulate adding to cart with a POST request to the API
      const response = await fetch('https://fakestoreapi.com/carts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 1,
          date: new Date().toISOString().split('T')[0],
          products: [{ productId: product.id, quantity: 1 }]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to add product to cart');
      }

      const cartResponse = await response.json();
      setCartEntry(cartResponse);
      setShowSuccessMessage('Product added to cart successfully! Check the cart details below.');
      setTimeout(() => setShowSuccessMessage(null), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add to cart');
    } finally {
      setAddToCartLoading(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!product) return;

    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    try {
      setDeleteLoading(true);
      const response = await fetch(`https://fakestoreapi.com/products/${product.id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      setShowSuccessMessage('Product deleted successfully! (Note: This is a mock API, product is not actually removed)');
      setTimeout(() => {
        navigate('/products');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete product');
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <Spinner animation="border" role="status" className="mb-3">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p>Loading product details...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          <Alert.Heading>Error Loading Product</Alert.Heading>
          <p>{error}</p>
          <Button variant="outline-danger" onClick={() => navigate('/products')}>
            Back to Products
          </Button>
        </Alert>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="mt-5">
        <Alert variant="warning">
          <Alert.Heading>Product Not Found</Alert.Heading>
          <p>The requested product could not be found.</p>
          <Button variant="outline-warning" onClick={() => navigate('/products')}>
            Back to Products
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {showSuccessMessage && (
        <Alert variant="success" className="mb-4" dismissible onClose={() => setShowSuccessMessage(null)}>
          {showSuccessMessage}
        </Alert>
      )}

      {cartEntry && (
        <Alert variant="info" className="mb-4" dismissible onClose={() => setCartEntry(null)}>
          <Alert.Heading>🛒 Mock Cart Entry Created</Alert.Heading>
          <p><strong>Cart ID:</strong> {cartEntry.id}</p>
          <p><strong>User ID:</strong> {cartEntry.userId}</p>
          <p><strong>Date:</strong> {cartEntry.date}</p>
          <p><strong>Products:</strong></p>
          <ul className="mb-0">
            {cartEntry.products?.map((item: any, index: number) => (
              <li key={index}>
                Product ID: {item.productId}, Quantity: {item.quantity}
                {item.productId === product?.id && ` (${product.title})`}
              </li>
            ))}
          </ul>
          <small className="text-muted">
            Note: This is a mock API response. The cart is not persisted.
          </small>
        </Alert>
      )}
      
      <Row className="mb-3">
        <Col>
          <Button variant="outline-secondary" onClick={() => navigate('/products')} className="mb-3">
            ← Back to Products
          </Button>
        </Col>
      </Row>

      <Row>
        <Col lg={6} className="mb-4">
          <Card className="h-100">
            <Card.Img
              variant="top"
              src={product.image}
              alt={product.title}
              style={{
                height: '400px',
                objectFit: 'contain',
                padding: '20px'
              }}
            />
          </Card>
        </Col>
        
        <Col lg={6}>
          <div className="h-100 d-flex flex-column">
            <Badge bg="secondary" className="mb-2 align-self-start">
              {product.category}
            </Badge>
            
            <h1 className="mb-3">{product.title}</h1>
            
            <div className="mb-3">
              <span className="h3 text-primary me-3">${product.price.toFixed(2)}</span>
              <span className="text-muted">
                ⭐ {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>
            
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Description</Card.Title>
                <Card.Text>{product.description}</Card.Text>
              </Card.Body>
            </Card>
            
            <div className="mt-auto">
              <Row className="g-2">
                <Col sm={6}>
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-100"
                    onClick={handleAddToCart}
                    disabled={addToCartLoading}
                  >
                    {addToCartLoading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Adding...
                      </>
                    ) : (
                      '🛒 Add to Cart'
                    )}
                  </Button>
                </Col>
                <Col sm={6}>
                  <Button
                    variant="danger"
                    size="lg"
                    className="w-100"
                    onClick={handleDeleteProduct}
                    disabled={deleteLoading}
                  >
                    {deleteLoading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Deleting...
                      </>
                    ) : (
                      '🗑️ Delete Product'
                    )}
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
