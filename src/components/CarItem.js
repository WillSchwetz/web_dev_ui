import React, { useState, setState, useEffect } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { GetImageUrl, AddCarToUser } from '../function';
import Button from 'react-bootstrap/Button';
import  CarModal  from './CarModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function CarItem ({ car, user, setUser }){

    const [imgUrl, setImgUrl] = useState("");
    const [attribution, setAttribution] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const GetImage = async () => {
        const response = await GetImageUrl(car.year, car.make, car.basemodel);
        if(response){
            const {url, att} = response;
            if(url){
                setImgUrl(() => url);
                if(att) setAttribution(() => `Image courtesy ${att}`)
                else setAttribution("")
            } else setImgUrl("");
        } else setImgUrl("");
    }

    useEffect(() => {
        GetImage();
    })
    const notify = () => {
       
        toast.success('Success!', {
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
    
    const addCar = async() =>{
      
        const response = await AddCarToUser(user, car)
        if(response){
           
            
        }
        notify();
        console.log(response);
    }

    return(
        <>
            <div className='border-2 mt-3 hover:bg-slate-100' style={{width:"500px", height:"150px", display:"flex", flexDirection:"row"}}>
                <div className="px-1 py-1 h-full" style={{width:"50%"}}>
                    {(imgUrl) ?
                        <div className='relative h-full w-full rounded flex items-center'>
                            <img src={imgUrl} className='rounded justify-center h-32 w-52'></img>
                            {attribution && <div dangerouslySetInnerHTML={{ __html: attribution }} className='absolute font-mono bottom-0 left-0 text-xs bg-white/80 text-black text-right w-full'>
                            </div>}
                        </div>
                        :
                        <div className='h-full w-full justify-center flex items-center'>
                            <div className='animate-pulse bg-gray-700 h-32 w-52 justify-center flex items-center rounded px-1 py-1 '>
                                <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                                </svg>
                            </div>
                        </div>
                    }
        
                </div>
                <div className='w-2/3 font-sans text-sm' style={{height:"100%", display:"flex", flexDirection:"column"}}>
                    <div id="carid" style={{width:"100%", display:"flex", flexDirection:"row"}}>
                        <div className='flex grow pb-2' style={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
                            <div id="make" className='mr-1'>{car.year}</div>
                            <div id="make" className='mr-1'>{car.make}</div>
                            <div id="trim">{car.model}</div>
                        </div>
                        {user && <div style={{display:"flex", justifyContent:"end"}} id="plus"> 
                            <button onClick={addCar}>
                                <PlusCircleIcon className="h-6 w-6 hover:text-lime-300" />
                            </button>
                           
                        </div>}
                    </div>
                    <div style={{width:"100%", display:"flex", flexDirection:"row", justifyContent:"end"}}>
                        <div className='mr-1'>Average City:</div>
                        <div className='mr-1'>{car.city08}</div>
                    </div>
                    <div style={{width:"100%", display:"flex", flexDirection:"row", justifyContent:"end"}}>
                        <div className='mr-1'>Average Highway:</div>
                        <div className='mr-1'>{car.highway08}</div>
                    </div>
                    <div style={{width:"100%", display:"flex", flexDirection:"row", justifyContent:"end"}}>
                        <div className='mr-1'>Average savings:</div>
                        <div className='mr-1'>{`$${car.yousavespend}`}</div>
                    </div>
                    <div style={{flexGrow: 1}}>
                        {/* Buffer Div */}
                    </div>
                    <div style={{width:"100%", display:"flex", flexDirection:"row", justifyContent:"center"}}>
                        <div className='mr-1'>Average fuel savings:</div>
                        <div className='mr-1'>{`$${car.yousavespend}`}</div>
                    </div>
                    <div className='w-full flex justify-end'>
                        <Button size="sm" className='mx-1 py-0 bg-blue-800' onClick={handleShow}>
                            Details
                        </Button>
                    </div>
                    
                    <CarModal show={show} car={car} handleClose={handleClose} user={user} setUser={setUser} imgUrl={imgUrl} attribution={attribution} setShow={setShow} />
                </div>
            </div>
           
        </>
        
    )
}