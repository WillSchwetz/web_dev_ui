import React, { useState, setState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { XMarkIcon, WrenchIcon } from '@heroicons/react/24/solid';

import { FuelPumpFill, GearFill, Signpost2Fill, CarFrontFill, CloudHaze2Fill  } from 'react-bootstrap-icons';

export default function CarModal({car, imgUrl, show, handleClose, user, setUser, attribution, setShow}) {

    return(
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
                className='backdrop-blur-sm'
            >

                <Modal.Body>
                    <div className='flex flex-1 justify-end'>
                        <XMarkIcon className='h-6 w-6 hover:cursor-pointer hover:text-red-400' onClick={() => setShow(() => false)}/>
                    </div>
                    <div className='w-full'>
                        <div className='w-full items-center text-center mb-4 text-xl'>
                            <span>{car.make}</span> <span className='font-semibold	'>{car.model}</span>
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
                                    <div className='mr-1'>Avg. City:</div>
                                    <div className='mr-1'>{car.city08} mpg</div>
                                </div>
                                <div style={{width:"100%", display:"flex", flexDirection:"row", justifyContent:"end"}}>
                                    <div className='mr-1'>Avg. Highway:</div>
                                    <div className='mr-1'>{car.highway08} mpg</div>
                                </div>
                                <div style={{width:"100%", display:"flex", flexDirection:"row", justifyContent:"end"}}>
                                    <div className='mr-1'>Combined:</div>
                                    <div className='mr-1'>{`${car.comb08}`} mpg</div>
                                </div>
                                <div style={{width:"100%", display:"flex", flexDirection:"row", justifyContent:"end"}}>
                                    <div className='mr-1'>Average savings:</div>
                                    <div className='mr-1'>{`$${car.yousavespend}`}</div>
                                </div>
                            </div>
                            
                        </div>
                        <div className='h-8'></div>
                        <div className='flex flex-wrap justify-between'>
                            <div className='flex'>
                                <div className='px-2'><FuelPumpFill size={20}/></div>
                                <div>{car.fueltype}</div>
                            </div>
                            <div className='flex'>
                                <div className='px-2'><CarFrontFill size={20}/></div>
                                <div>{car.drive}</div>
                            </div>
                            <div className='flex'>
                                <div className='px-2'><GearFill size={20}/></div>
                                <div>{car.trany}</div>
                            </div>
                            <div className='flex'>
                                <div className='px-2'><Signpost2Fill size={20}/></div>
                                <div>Fuel type</div>
                            </div>
                            <div className='flex'>
                            <div className='px-2'><CloudHaze2Fill size={20}/></div>
                                <div>{(car.tcharger === null && car.scharger === null)  ? 'Naturally Aspirated' : car.tcharger === null? 'Superchargerd' : 'Turbocharged'}</div>
                            </div>
                        </div>
                    </div>
                
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={handleClose}>
                        Exit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}