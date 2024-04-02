import React, { useState,  useEffect } from 'react';
import {GetUsersCars} from "../function"
import CarItem from "../components/CarItem";
export default function GarageDisplay({user, setUser}) {
  const [carList, setCarList] = useState([])

  useEffect(() => {
    getCars()
  },[user])

  const getCars = async() =>{
    const resp = await GetUsersCars(user);
    if(resp){
      setCarList(resp)
    }
  }
  console.log(carList);
    return (
    <div>
        <span>{user}'s Garage</span>
        <div>
        <div style={{width:"100%", height:"95%", display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"space-between", alignContent:"flex-start", overflowY:"auto"}}>
                {(carList.length > 0) ? carList?.map((car, index) => <CarItem key={`${index}_car.model`} car={car} user={user} setUser={setUser} />) : null}
            </div>
        </div>
    </div>
  )
}
