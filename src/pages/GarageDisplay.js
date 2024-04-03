import React, { useState,  useEffect } from 'react';
import {GetUsersCars, DeleteCarById} from "../function"
import CarItem from "../components/CarItem";
import { ChevronDoubleRightIcon, ChevronDoubleLeftIcon } from '@heroicons/react/24/outline'
import { ToastContainer, toast } from 'react-toastify';

export default function GarageDisplay({user, setUser}) {
  const [carList, setCarList] = useState([])
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  
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
  const deleteCar = async(car) =>{
    console.log(car._id);
    const resp = DeleteCarById(user, car._id)
    if(resp){
        notify();
        getCars();
    }
  }
    return (
    <div>
        <span>{user}'s Garage</span>
        <div>
        <div className='flex m-0 p-0 w-full items-center justify-end'>
              <ChevronDoubleLeftIcon onClick={() =>((page - 1) >= 0) && setPage((page - 1))} className={`h-4 w-4 mx-1 ${((page - 1) >= 0) ? 'hover:cursor-pointer hover:text-lime-600' : 'text-gray-300/50' }`}/>
                {page + 1}
              <ChevronDoubleRightIcon onClick={() =>(((page + 1) * 20) < count ) && setPage((page + 1))} className={`h-4 w-4 mx-1 ${(((page + 1) * 20) < count ) ? 'hover:cursor-pointer hover:text-lime-600' : 'text-gray-300/50 ' }`} />
            </div>
            <div style={{width:"100%", height:"95%", display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"space-between", alignContent:"flex-start", overflowY:"auto"}}>
                {(carList.length > 0) ? carList?.map((car, index) => <CarItem key={`${index}_car.model`} car={car} user={user} setUser={setUser} deleteCar={deleteCar} />) : null}
            </div>
        </div>
    </div>
  )
}
