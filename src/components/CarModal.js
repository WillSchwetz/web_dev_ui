import React, { useState, setState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import 'bootstrap/dist/css/bootstrap.min.css';
import { XMarkIcon, WrenchIcon, PlusCircleIcon } from '@heroicons/react/24/solid';
import { CardImage, CupStraw, HeartPulseFill } from 'react-bootstrap-icons';
import {  AddCarToUser } from '../function';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

import { FuelPumpFill, GearFill, CarFrontFill, CloudHaze2Fill } from 'react-bootstrap-icons';

export default function CarModal({car, imgUrl, show, handleClose, user, setUser, attribution, setShow}) {
    const dispStrings = ["Engine Displacement", "I didn't know pizza places sold engines"]

    const location = useLocation();
    
    const addCar = async() =>{      
        const response = await AddCarToUser(user, car)
        if(response){
            notify();  
            setShow(false);
        }
    }
    const notify = () => {       
        toast.success('Added Successfully!', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
           
            });
        };
    return(
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
                className='backdrop-blur-sm'
            >

                <Modal.Body style={{"font-family": `Helvetica, Arial, sans-serif`}} className='bg-gradient-to-b from-zinc-200 to-white text-neutral-500'>
                    <div className='flex flex-1 justify-end'>
                        <XMarkIcon className='h-6 w-6 hover:cursor-pointer hover:text-red-400' onClick={handleClose} />
                    </div>
                    <div className='w-full'>
                        <div style={{"font-family": `Tahoma, "Trebuchet MS", sans-serif`}} className='w-full items-center text-center mb-4 text-xl'>
                            <span>{car.year}</span> <span>{car.make}</span> <span className='font-semibold	'>{car.model}</span>
                        </div>
                        <div className='w-full flex space-x-5'>
                            <div className='w-1/2'>
                                {(imgUrl) ?
                                    <div className='relative h-full w-full rounded flex items-center bg-black'>
                                        <img src={imgUrl} className='rounded object-fill justify-center'></img>
                                        {attribution && <div dangerouslySetInnerHTML={{ __html: attribution }} className='absolute font-mono bottom-0 left-0 text-xs bg-white/80 text-black text-right w-full'>
                                        </div>}
                                    </div>
                                    :
                                    <div className='animate-pulse bg-gray-300 dark:bg-gray-700 h-full w-full justify-center flex items-center rounded px-1 py-1 '>
                                        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                                        </svg>
                                    </div>
                                }
                            </div>
                            <div className='w-1/2'>
                                <div style={{width:"100%", display:"flex", flexDirection:"row", justifyContent:"end"}}>
                                    <div className='mr-1'>Average City:</div>
                                    <div className='mr-1'>{car.city08} mpg</div>
                                </div>
                                <div style={{width:"100%", display:"flex", flexDirection:"row", justifyContent:"end"}}>
                                    <div className='mr-1'>Average Highway:</div>
                                    <div className='mr-1'>{car.highway08} mpg</div>
                                </div>
                                <div style={{width:"100%", display:"flex", flexDirection:"row", justifyContent:"end"}}>
                                    <div className='mr-1'>Combined:</div>
                                    <div className='mr-1'>{`${car.comb08}`} mpg</div>
                                </div>
                                <div style={{width:"100%", display:"flex", flexDirection:"row", justifyContent:"end"}}>
                                    <div className='mr-1'>Average fuel savings:</div>
                                    <div className='mr-1'>{`$${car.yousavespend}`}</div>
                                </div>
                            </div>
                            
                        </div>
                        <div className='h-8'></div>
                        <div className='flex flex-wrap justify-between'>
                            <div className='flex'>
                                <div className='px-2'>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip id="icon-tooltip-1">Fuel Type</Tooltip>}
                                    >
                                        <FuelPumpFill size={20}/>
                                    </OverlayTrigger>
                                </div>
                                <div>{car.fueltype}</div>
                            </div>
                            <div className='flex'>
                                <div className='px-2'>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip id="icon-tooltip-2">Drivetrain</Tooltip>}
                                    >
                                        <CarFrontFill size={20}/>
                                    </OverlayTrigger>
                                </div>
                                <div>{car.drive}</div>
                            </div>
                            <div className='flex'>
                                <div className='px-2'>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip id="icon-tooltip-3">Transmission</Tooltip>}
                                    >
                                        <GearFill size={20}/>
                                    </OverlayTrigger>
                                </div>
                                <div>{car.trany}</div>
                            </div>
                            <div className='flex'>
                                <div className='px-2'>
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={<Tooltip id="icon-tooltip-4">{dispStrings[(Math.random() * 10) < 8 ? 0 : 1]}</Tooltip>}
                                    >
                                        <CupStraw size={20}/>
                                    </OverlayTrigger>
                                </div>
                                <div>{`${car.displ} litres`}</div>
                            </div>
                            <div className='flex'>
                                <div className='px-2'>
                                    <OverlayTrigger
                                        placement="bottom"
                                        overlay={<Tooltip id="icon-tooltip-5">Number of Cylinders</Tooltip>}
                                    >
                                        <HeartPulseFill size={20}/>
                                    </OverlayTrigger>
                                </div>
                                <div>{car.cylinders} cylinders</div>
                            </div>
                            <div className='flex'>
                            <div className='px-2'>
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={<Tooltip id="icon-tooltip-6">Air Induction System</Tooltip>}
                                >
                                    <CloudHaze2Fill size={20}/>
                                </OverlayTrigger>
                            </div>
                            <div>{(car.tcharger === null && car.scharger === null)  ? 'Naturally Aspirated' : car.tcharger === null? 'Superchargerd' : 'Turbocharged'}</div>
                            </div>
                        </div>
                    </div>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={handleClose} >
                        Exit
                    </Button>
                    <Button variant="outline-info" className='hover:text-white' onClick={addCar} hidden={location.pathname==="/garage"}>
                        Add to garage
                    </Button>
                </Modal.Footer>
            </Modal>
    )
}