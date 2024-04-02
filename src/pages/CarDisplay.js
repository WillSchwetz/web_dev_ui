import React, { useState, setState, useEffect } from 'react';
import { useSearchParams, BrowserRouter, Routes, Route } from "react-router-dom";
import CarItem from "../components/CarItem";
import { GetCarList, CheckAuth } from '../function';
import { ChevronDoubleRightIcon, ChevronDoubleLeftIcon } from '@heroicons/react/24/outline'

export default function CarDisplay ({user, setUser}){

    const [carList, setCarList] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(0);
    
    
    useEffect(() => {
        !CheckAuth() && setUser(null)
    })

    useEffect(() => {
        // Here we will find all cars that match our requirements
        // List by years, then makes, then models, etc 
        async function fetchData() {
            const minYear = searchParams.get('minyear');
            const maxYear = searchParams.get('maxyear');
            const drivetrain = searchParams.get('drivetrain');
            const trans = searchParams.get('trans');
            const mpg = searchParams.get('mpg');
            const {results, total_count} = await GetCarList(minYear, maxYear, drivetrain, trans, mpg, page);
            setCarList(() => results);
            setCount(() => total_count);
        }
        fetchData();

    },[searchParams, page])

    return(
        <>
            <div className='flex m-0 p-0 w-full items-center justify-end'>
                {((page - 1) >= 0) && <ChevronDoubleLeftIcon onClick={() => {setPage(() => (page - 1))}} className="h-4 w-4 mx-1 hover:cursor-pointer hover:text-lime-300"/>}
                {page + 1}
                {(((page + 1) * 20) < count ) && <ChevronDoubleRightIcon onClick={() => {setPage(() => (page + 1))}} className="h-4 w-4 mx-1 hover:cursor-pointer hover:text-lime-300"/>}
            </div>
            <div style={{width:"100%", height:"95%", display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"space-between", alignContent:"flex-start", overflowY:"auto"}}>
                {(carList.length > 0) ? carList?.map((car, index) => <CarItem key={`${index}_car.model`} car={car} user={user} setUser={setUser} />) : null}
            </div>
        </>

    )
    

}