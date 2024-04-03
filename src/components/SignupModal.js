import React, { useState, setState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { XMarkIcon } from '@heroicons/react/24/solid'
import Login from './LoginModal';
import { RegisterUser } from '../function'
import Alert from 'react-bootstrap/Alert';

export default function Signup({show, handleClose, setUser}){
    const [loginShow, setLoginShow] = useState(false);
    const handleLoginClose = () => setLoginShow(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const handleShow = () => setLoginShow(true);
    const [isValid, setIsValid] = useState(true);
    
    const handleSignUp = async (event) => {
        event.preventDefault();

        if(!(username?.length > 0)){
            setError("Username cannot be blank");
            setIsValid(false);
        } else if(!(password?.length > 0)){
            setIsValid(false);
            setError("Password cannot be blank");
        } else {
            //setIsValid(true);
            const response = await RegisterUser(username, password);
            if (!response){
                setError("Unsuccessful Registration");
            } else {
                setUser(response)
            }
        }        
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header>
                    <Modal.Title>Signup</Modal.Title>
                    <div className='flex flex-1 justify-end' ><XMarkIcon className='h-6 w-6 hover:cursor-pointer hover:text-red-400' onClick={handleClose}/></div>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" className={isValid ? '': 'is-invalid'} value={username} onChange={(e) => setUsername(e.target.value)} required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" className={isValid ? '': 'is-invalid'} value={password} onChange={(e) => setPassword(e.target.value)} required/>
                        </Form.Group>
                        <Button type='submit' variant="outline-secondary" onClick={(e) => handleSignUp(e)}>
                            Register
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    Already have an account? Click <span className='hover:cursor-pointer underline underline-offset-1 hover:text-cyan-600' onClick={() => setLoginShow(true)}>here</span> to login!
                </Modal.Footer>
            </Modal>
            <Login show={loginShow} setUser={setUser} handleClose={handleLoginClose} /> 
        </>
    )
}