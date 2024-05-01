import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../apiClient';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const LogOut = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      await apiClient.post('/user-auth/logout/', {}, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      localStorage.removeItem('token');
      localStorage.removeItem('username');

      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <span onClick={() => setShowModal(true)} style={{cursor:'pointer', color:'red'}}>Logout</span>
      <Modal show={showModal} onHide={handleCloseModal} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LogOut;
