import React, { useState } from 'react';
import apiClient from '../apiClient';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
const Logout = ({ setLoggedIn }) => {
    const [showModal, setShowModal] = useState(false);

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            await apiClient.post('auth/api/logout/', {}, {
                headers: {
                    Authorization: `Token ${token}`
                }
            }); 
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('username');
            setLoggedIn(false);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (
        <>
            <Button className='logoutBtn' onClick={handleShow}>
                Logout
            </Button>
            <Modal show={showModal} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to logout?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Link onClick={handleLogout} className="btn btn-primary" to={'/login'}>Logout</Link>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Logout;
