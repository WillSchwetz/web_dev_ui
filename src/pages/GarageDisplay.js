import React, { useState,  useEffect } from 'react';
import {GetUsersCars, DeleteCarById} from "../function"
import SignUp from '../components/SignupModal'
import CarItem from "../components/CarItem";
import { ChevronDoubleRightIcon, ChevronDoubleLeftIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-toastify';


export default function GarageDisplay({user, setUser}) {
  const [carList, setCarList] = useState([])
  const [show, setShow] = useState(false)
  
  const handleClose = () => {
    if(!user){
      window.location.href = '/';
    }
    setShow(false)
  };
  
  useEffect(() => {
    if(!user){
      setShow(true);
    }
  },[])

  useEffect(() => {
    getCars()
  },[user])

  const getCars = async() =>{
    const resp = await GetUsersCars(user);
    if(resp){
      setCarList(resp)
    }
  }
  const notify = () => {       
    toast.success('Deleted Successfully!', {
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
  const deleteCar = async(car) =>{
    const resp = DeleteCarById(user, car._id)
    if(resp){
        notify();
        getCars();
    }
  }
    return (
    <>

        {user ? (
        <span className='text-xl font-bold'>{user}'s Garage</span>) : (<span className='text-xl font-bold'>Garage</span>)
        }
        
        
            <div className='flex overflow-y-auto w-full flex-row flex-wrap justify-between' style={{background:"white", height: "calc(100% - 30px)"}}>
                {(carList.length > 0) ? carList?.map((car, index) => <CarItem key={`${index}_car.model`} car={car} user={user} setUser={setUser} deleteCar={deleteCar} />) : null}
          </div>
        
        
         <SignUp show={show} handleClose={handleClose} setUser={setUser}/>

    </>
  )
}
