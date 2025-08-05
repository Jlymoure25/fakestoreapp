import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

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

const ProductListing: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch products and categories in parallel
        const [productsResponse, categoriesResponse] = await Promise.all([
          fetch('https://fakestoreapi.com/products'),
          fetch('https://fakestoreapi.com/products/categories')
        ]);

        if (!productsResponse.ok || !categoriesResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const productsData = await productsResponse.json();
        const categoriesData = await categoriesResponse.json();
        
        setAllProducts(productsData);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleViewDetails = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setProducts(allProducts);
    } else {
      const filteredProducts = allProducts.filter(product => product.category === category);
      setProducts(filteredProducts);
    }
  };

  const formatCategoryName = (category: string) => {
    return category.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <Spinner animation="border" role="status" className="mb-3">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p>Loading products...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          <Alert.Heading>Error Loading Products</Alert.Heading>
          <p>{error}</p>
          <Button variant="outline-danger" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center mb-4">Our Products</h1>
          <p className="text-center text-muted mb-4">
            Discover our amazing collection of products
          </p>
          
          {/* Category Filter */}
          <div className="d-flex justify-content-center mb-4">
            <Dropdown as={ButtonGroup}>
              <Button variant="outline-primary">
                {selectedCategory === 'all' ? 'All Categories' : formatCategoryName(selectedCategory)}
              </Button>
              <Dropdown.Toggle split variant="outline-primary" id="dropdown-split-basic" />
              <Dropdown.Menu>
                <Dropdown.Item 
                  onClick={() => handleCategoryFilter('all')}
                  active={selectedCategory === 'all'}
                >
                  All Categories ({allProducts.length})
                </Dropdown.Item>
                <Dropdown.Divider />
                {categories.map((category) => (
                  <Dropdown.Item
                    key={category}
                    onClick={() => handleCategoryFilter(category)}
                    active={selectedCategory === category}
                  >
                    {formatCategoryName(category)} ({allProducts.filter(p => p.category === category).length})
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          
          {/* Results Info */}
          <div className="text-center mb-3">
            <small className="text-muted">
              Showing {products.length} products
              {selectedCategory !== 'all' && ` in "${formatCategoryName(selectedCategory)}"`}
            </small>
          </div>
        </Col>
      </Row>
      <Row>
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={product.image}
                alt={product.title}
                style={{
                  height: '200px',
                  objectFit: 'contain',
                  padding: '10px'
                }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title 
                  className="mb-2"
                  style={{
                    fontSize: '1rem',
                    height: '3rem',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}
                >
                  {product.title}
                </Card.Title>
                <Card.Text className="text-muted small mb-2">
                  {product.category}
                </Card.Text>
                <div className="mt-auto">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="h5 mb-0 text-primary">
                      ${product.price.toFixed(2)}
                    </span>
                    <small className="text-muted">
                      ⭐ {product.rating.rate} ({product.rating.count})
                    </small>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-100"
                    onClick={() => handleViewDetails(product.id)}
                  >
                    View Details
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductListing;
