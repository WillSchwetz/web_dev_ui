import React, { useState, setState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// #class TopContentBar extends React.Component{
export default function TopContentBar(){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <>
            <div style={{display: "flex", "height":"75px", width:"100%", display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                <div style={{display: "flex", height:"100%"}} className='items-center'>
                    <span className='ml-3 font-bold font-sans text-2xl'>Eco Search</span>
                </div>
                <div style={{display: "flex", height:"100%"}} className='items-center'>
                    <button
                        type="button"
                        style={{marginRight:"10px"}}
                        className='text-black rounded-full border-2 border-solid border-black bg-[#FFF] hover:bg-[#000]/20 focus:ring-4 focus:outline-none focus:ring-[#1A43BF]/50 font-medium text-sm px-5 py-1.5 text-center inline-flex items-center'
                    >
                        <span>Your Garage</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>

                    </button>
                </div>
            </div>
        </>
    )
    
}
