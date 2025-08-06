import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

const AppNavbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  const handleNavigation = (path: string) => {
    navigate(path);
    setExpanded(false); // Close menu after navigation
  };

  return (
    <Navbar 
      bg="dark" 
      variant="dark" 
      expand="lg" 
      className="mb-4"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    >
      <Container>
        <Navbar.Brand 
          onClick={() => handleNavigation('/')} 
          style={{ cursor: 'pointer' }}
        >
          🛒 Fake Store
        </Navbar.Brand>
        
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav" 
          onClick={() => setExpanded(!expanded)}
        />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              onClick={() => handleNavigation('/')}
              active={location.pathname === '/'}
              style={{ cursor: 'pointer' }}
            >
              Home
            </Nav.Link>
            <Nav.Link 
              onClick={() => handleNavigation('/products')}
              active={location.pathname === '/products'}
              style={{ cursor: 'pointer' }}
            >
              Products
            </Nav.Link>
            <Nav.Link 
              onClick={() => handleNavigation('/add-product')}
              active={location.pathname === '/add-product'}
              style={{ cursor: 'pointer' }}
            >
              Add Product
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
