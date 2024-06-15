import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import styles from "./styles.module.css"

const NavbarComponent = () => {

    const handleLogout = () => {
        // logika wylogowania użytkownika
    }

    return (
        <Navbar bg="dark" expand="lg" variant="dark">
            <div className="container px-5">
                <Navbar.Brand as={Link} to="/" className={styles.navbarBrand}>Wędkarstwo naszą pasją</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarSupportedContent" />
                <Navbar.Collapse id="navbarSupportedContent">
                    <Nav className={`me-auto mb-2 mb-lg-0 ${styles.navLinks}`} >
                        <Nav.Link as={Link} to="/home" style={{ fontSize: '1.1rem' }} className={`px-lg-3 py-3 py-lg-4`}>Strona główna</Nav.Link>
                        <Nav.Link as={Link} to="/reviews" style={{ fontSize: '1.1rem' }} className={`px-lg-3 py-3 py-lg-4`}>Opinie</Nav.Link>
                        <Nav.Link as={Link} to="/about" style={{ fontSize: '1.1rem' }} className={`px-lg-3 py-3 py-lg-4`}>O nas</Nav.Link>
                        <Nav.Link as={Link} to="/contact" style={{ fontSize: '1.1rem' }} className={`px-lg-3 py-3 py-lg-4`}>Kontakt</Nav.Link>
                    </Nav>
                    <Nav className={`ms-auto mb-2 mb-lg-0 ${styles.navLinks}`}>
                        {true ? (
                            <NavDropdown title="Username" id="navbarDropdown" style={{ fontSize: '1.1rem' }}>
                                <NavDropdown.Item as={Link} to="/profile">Edytuj profil</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogout}>Wyloguj się</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login" className={`${styles.navLink} ${styles.navLinkSmall}`}>Zaloguj</Nav.Link>
                                <Nav.Link as={Link} to="/register" className={`${styles.navLink} ${styles.navLinkSmall}`}>Zarejestruj</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
};

export default NavbarComponent;
