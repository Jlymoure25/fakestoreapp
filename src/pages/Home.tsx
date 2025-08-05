import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: 'calc(100vh - 120px)' }}>
      <Row className="w-100 justify-content-center">
        <Col md={8} lg={6}>
          <Card className="text-center shadow">
            <Card.Body>
              <Card.Title as="h1">Welcome to the Fake Store</Card.Title>
              <Card.Text>
                Discover a wide variety of products at unbeatable prices. Browse our collection and enjoy a seamless shopping experience!
              </Card.Text>
              <Button variant="primary" size="lg" onClick={() => navigate('/products')}>
                View Products
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;