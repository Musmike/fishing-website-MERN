import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const NavbarComponent = () => {

    const handleLogout = () => {
        // logika wylogowania użytkownika
    }

    return (
        <Navbar bg="dark" expand="lg" variant="dark">

            <div className="container px-5">
                <Navbar.Brand as={Link} to="/">Wędkarstwo naszą pasją</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarSupportedContent" />
                <Navbar.Collapse id="navbarSupportedContent">

                    <Nav className="me-auto mb-2 mb-lg-0">
                        <Nav.Link as={Link} to="/home" className="px-lg-3 py-3 py-lg-4">Strona główna</Nav.Link>
                        <Nav.Link as={Link} to="/reviews" className="px-lg-3 py-3 py-lg-4">Opinie</Nav.Link>
                        <Nav.Link as={Link} to="/about" className="px-lg-3 py-3 py-lg-4">O nas</Nav.Link>
                        <Nav.Link as={Link} to="/kontakt" className="px-lg-3 py-3 py-lg-4">Kontakt</Nav.Link>
                    </Nav>

                    <Nav className="ms-auto mb-2 mb-lg-0">
                        {true ? ( 
                            <NavDropdown title="Username" id="navbarDropdown">
                                <NavDropdown.Item as={Link} to="/profile">Edytuj profil</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogout}>Wyloguj się</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login" className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">Zaloguj</Nav.Link>
                                <Nav.Link as={Link} to="/register" className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">Zarejestruj</Nav.Link>
                            </>
                        )}
                    </Nav>

                </Navbar.Collapse>
            </div>

        </Navbar>
    );
};

export default NavbarComponent;
