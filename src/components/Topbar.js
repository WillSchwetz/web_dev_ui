import React, { useState, setState, useEffect } from 'react';
import { Link } from "react-router-dom";

import Signup from './SignupModal';
import { CheckAuth, LogoutUser } from '../function'

export default function TopBar({user, setUser}){

    const [mpg, setMpg] = useState("15");
    const [minYear, setMinYear] = useState("");
    const [maxYear, setMaxYear] = useState("");
    const [driveTrain, setDriveTrain] = useState("");
    const [trans, setTrans] = useState("");
    const [searchURL, setSearchURL] = useState("");
    const [yearList, setYearList] = useState([]);
    const BASE_API = 'https://www.fueleconomy.gov/ws/rest/'
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleLogout = () => {
        console.log("here")
        LogoutUser();
        setUser(null);
        handleClose();
    }

    function GetAllYears (){
        const url = `${BASE_API}vehicle/menu/year`;
        const yearList = async () => {
            fetch(url)
                .then(response => response.text())
                .then(str => {
                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(str, "text/xml");
                    const yearElements = xmlDoc.getElementsByTagName("menuItem");
                    const years = Array.from(yearElements).map(element =>  {
                        const valueElement = element.getElementsByTagName("value")[0];
                        return valueElement.textContent;

                    });
                    setYearList(years);
                  })
                  .catch(error => {
                    console.error('Error fetching or parsing the XML:', error);
                  });
        }
        yearList();
    }

    useEffect(() => {
        setMaxYear(yearList[0]);
        setMinYear(yearList[yearList.length - 1])
    },[yearList])

    useEffect(() => {
        GetAllYears();

    }, [])

    useEffect(() => {
        let tmpUrl="";
        if(mpg != "" && mpg != null) tmpUrl = tmpUrl.concat('mpg=' + mpg + "&");
        if(minYear != "" && minYear != null) tmpUrl = tmpUrl.concat('minyear=' + minYear  + "&");
        if(maxYear != "" && maxYear != null) tmpUrl = tmpUrl.concat('maxyear=' + maxYear  + "&");
        if(driveTrain != "" && driveTrain != null) tmpUrl = tmpUrl.concat('drivetrain=' + driveTrain  + "&");
        if(trans != "" && trans != null) tmpUrl = tmpUrl.concat('trans=' + trans) + "&";
        tmpUrl = tmpUrl.slice(0, -1)
        if(searchURL != tmpUrl) setSearchURL(tmpUrl)
    }, [mpg, minYear, maxYear, driveTrain, trans])


    return(
        <div style={{height:"50px", background:"linear-gradient(180deg, rgba(24,25,36,1) 0%, rgba(24,25,36,1) 80%, rgba(77,86,104,1) 100%)"}}>
            <div style={{display: "flex", flexDirection:"row", width:"100%", height:"100%", justifyContent:"space-between"}}>
                <div className='grow'>
                    {/* BUFFER DIV */}
                </div>
                <div className='px-2'>
                    <div style={{"borderLeft":"1px solid #3b3b3b", "height": "100%"}}></div>
                </div>
                <div style={{display: "flex", flexDirection: "row"}} className='items-center'>
                    <div className='flex items-center space-x-1 px-2'>
                        <label className='text-white text-xs'> Min Year</label>
                        <select 
                            name="min_year" 
                            id="min_year" 
                            value={minYear}
                            className='bg-white border border-gray-300 text-gray-800 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1 pr-5'
                            onChange={(event) =>{ setMinYear(event.target.value) }}
                        >
                            <option value="" disabled selected>Min Year</option>
                            {
                                yearList?.map((e, index) => <option key={index} value={e}>{e}</option>)
                            }
                        </select>
                    </div>
                    <div className='flex items-center space-x-1 px-2'>
                        <label className='text-white text-xs'> Max Year</label>
                        <select 
                            name="max_year" 
                            id="max_year" 
                            className='bg-white border border-gray-300 text-gray-800 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1 pr-5'
                            value={maxYear}
                            onChange={(event) =>{ setMaxYear(event.target.value) }}
                        >
                            <option value="" disabled selected>Max Year</option>
                            {
                                yearList?.filter(e => e >= minYear).map((e, index) => <option  key={index} value={e}>{e}</option>)
                            }
                        </select>
                    </div>
                    <div className='mx-5 flex items-center space-x-2 px-2' style={{display:"flex", flexDirection:"row"}}>

                        <label className='lg:block hidden text-white text-md'> MPG: <span>{mpg}</span></label>
                        <div className='relative mx-2 mb-3 ' style={{width:"200px"}}>
                            <input 
                                type="range" 
                                min="1" 
                                max="30" 
                                value={mpg}
                                onChange={(event) =>{ setMpg(event.target.value) }}
                                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" 
                                id="max_mpg"
                            />
                            <span className="text-xs text-white-500 dark:text-gray-400 absolute start-0 -bottom-3">1</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 absolute start-1/3 -translate-x-1/2 rtl:translate-x-1/2 -bottom-3">10</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 absolute start-2/3 -translate-x-1/2 rtl:translate-x-1/2 -bottom-3">20</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 absolute end-0 -bottom-3">30+</span>
                        </div>


                    </div>
                </div>
                <div className='px-2'>
                    <div style={{"borderLeft":"1px solid #3b3b3b", "height": "100%"}}></div>
                </div>
                <div style={{display: "flex", flexDirection: "row"}} className='items-center'>
                    <div className='px-2'>
                        <select 
                            name="drivetrain" 
                            id="drivetrain"
                            className='bg-white border border-gray-300 text-gray-800 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1 pr-5'
                            onChange={(event) =>{ setDriveTrain(event.target.value)  }}
                        >
                            <option value="" disabled selected>Drivetrain</option>
                            <option value="fwd">fwd</option>
                            <option value="awd">awd</option>
                            <option value="rwd">rwd</option>
                            <option value="4x4">4x4</option>
                        </select>
                    </div>
                </div>
                <div className='px-2'>
                    <div style={{"borderLeft":"1px solid #3b3b3b", "height": "100%"}}></div>
                </div>
                <div style={{display: "flex", flexDirection: "row"}} className='items-center'>
                    <div className='px-2'>
                        <select 
                            name="trans" 
                            id="trans"
                            className='bg-white border border-gray-300 text-gray-800 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1 pr-5'
                            onChange={(event) =>{ setTrans(event.target.value) }}
                        >
                            <option value="" disabled selected>Transmission</option>
                            <option value="auto">auto</option>
                            <option value="manual">manual</option>
                        </select>
                    </div>
                </div>
    
                <div className='px-2'>
                    <div style={{"borderLeft":"1px solid #3b3b3b", "height": "100%"}}></div>
                </div>
                <div style={{display: "flex"}} className='items-center'>
                    <div>
                        <Link to={`/cardisplay?${(searchURL.length > 0) ? searchURL : ""}`}>
                            <button 
                                type="button"
                                className="mr-3 text-black bg-[#FFF] hover:bg-[#FFF]/60 focus:ring-4 focus:outline-none focus:ring-[#1A43BF]/50 font-medium text-sm px-5 py-1.5 text-center inline-flex items-center"
                            >
                                <span className='mr-5'>Search</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </button>
                        </Link>
                    </div>
                </div>
                <div className='px-2'>
                    <div style={{"borderLeft":"1px solid #3b3b3b", "height": "100%"}}></div>
                </div>
                <div className='grow'>
                    {/* BUFFER DIV */}
                </div>
                {(CheckAuth() && user) ?
                    <div style={{display: "flex"}} className='items-center'>
                        <button
                            type="button"
                            style={{marginRight:"10px"}}
                            className="mr-3 text-black bg-[#FFF] hover:bg-[#FFF]/60 focus:ring-4 focus:outline-none focus:ring-[#1A43BF]/50 font-medium text-sm px-3 py-1.5 text-center inline-flex items-center"
                            onClick={() => handleLogout()}
                        >
                            <span>Signout</span>
                        </button>
                    </div>
                    : 
                    <div style={{display: "flex"}} className='items-center'>
                        <button
                            type="button"
                            style={{marginRight:"10px"}}
                            className="mr-3 text-black bg-[#FFF] hover:bg-[#FFF]/60 focus:ring-4 focus:outline-none focus:ring-[#1A43BF]/50 font-medium text-sm px-3 py-1.5 text-center inline-flex items-center"
                            onClick={() => handleShow()}
                        >
                            <span>Signup</span>
                        </button>
                        <Signup show={show} handleClose={handleClose} setUser={setUser} />
                    </div>
                }
                
            </div>
        </div>
    )
}
















