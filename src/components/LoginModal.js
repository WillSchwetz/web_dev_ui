import React, { useState, setState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { LoginUser } from '../function'

export default function Login({show, handleClose, setUser}){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const handleLogin = async () => {
        const response = await LoginUser(username, password);
        setUser(response);
        handleClose();
    }


    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
            className='backdrop-blur-sm'
        >
            <Modal.Header>
                <Modal.Title>Login</Modal.Title>
                <div className='flex flex-1 justify-end'>
                    <XMarkIcon className='h-6 w-6 hover:cursor-pointer hover:text-red-400' onClick={handleClose}/>
                </div>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </Form.Group>
                </Form>
                <Button variant="outline-secondary" onClick={() => handleLogin()}>
                    Login
                </Button>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={handleClose}>
                    Exit
                </Button>
            </Modal.Footer>
        </Modal>
    )
}