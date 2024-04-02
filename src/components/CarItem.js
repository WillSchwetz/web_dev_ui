import React, { useState, setState, useEffect } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { GetImageUrl } from '../function';
import  CarModal  from './CarModal';
export default function CarItem ({ car, user, setUser }){

    const [imgUrl, setImgUrl] = useState();
    const [attribution, setAttribution] = useState();
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
                else setAttribution()
            } else setImgUrl();
        } else setImgUrl();
    }

    useEffect(() => {
        GetImage();
    })


    return(
        <div className='border-2 mt-3 hover:bg-slate-100 hover:cursor-pointer' style={{width:"500px", height:"150px", display:"flex", flexDirection:"row"}} onClick={handleShow}>
            <div className="px-1 py-1 h-full" style={{width:"50%"}}>
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
            <div className='w-2/3' style={{height:"100%", display:"flex", flexDirection:"column"}}>
                <div id="carid" style={{width:"100%", display:"flex", flexDirection:"row"}}>
                    <div className='flex grow' style={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
                        <div id="make" className='mr-1'>{car.year}</div>
                        <div id="make" className='mr-1'>{car.make}</div>
                        <div id="trim">{car.model}</div>
                    </div>
                    {user && <div style={{display:"flex", justifyContent:"end"}} id="plus"> 
                        <button>
                            <PlusCircleIcon className="h-6 w-6 hover:text-lime-300" />
                        </button>
                    </div>}
                </div>
                <div style={{width:"100%", display:"flex", flexDirection:"row", justifyContent:"end"}}>
                    <div className='mr-1'>Avg. City:</div>
                    <div className='mr-1'>{car.city08}</div>
                </div>
                <div style={{width:"100%", display:"flex", flexDirection:"row", justifyContent:"end"}}>
                    <div className='mr-1'>Avg. Highway:</div>
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

                <CarModal show={show} car={car} handleClose={handleClose} user={user} setUser={setUser} imgUrl={imgUrl} attribution={attribution} setShow={setShow} />
            </div>
        </div>
    )
}

// class CarItem extends React.Component{

//     constructor(props){
//         super(props);

//     }

//     render(){
//         return(
//             <div className='border-2 mt-3' style={{width:"500px", height:"150px", display:"flex", flexDirection:"row"}}>
//                 <div className="mx-1 my-1 100 animate-pulse flex items-center justify-center bg-gray-300 rounded dark:bg-gray-700" style={{width:"50%"}}>
//                     <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
//                         <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
//                     </svg>
//                 </div>
//                 <div className='w-2/3' style={{height:"100%", display:"flex", flexDirection:"column"}}>
//                     <div id="carid" style={{width:"100%", display:"flex", flexDirection:"row"}}>
//                         <div className='flex grow' style={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
//                             <div id="make" className='mr-1'>{this.props.car.make}</div>
//                             <div id="model" className='mr-1'>{this.props.car.model}</div>
//                             <div id="trim">{this.props.car.trim}</div>
//                         </div>
//                         <div style={{display:"flex", justifyContent:"end"}} id="+"> 
//                             <button>
//                                 <PlusCircleIcon className="h-6 w-6 text-black" />
//                             </button>
//                         </div>
//                     </div>
//                     <div style={{width:"100%", display:"flex", flexDirection:"row", justifyContent:"end"}}>
//                         <div className='mr-1'>Avg. City</div>
//                         <div className='mr-1'>{this.props.car.avgCity}</div>
//                     </div>
//                     <div style={{width:"100%", display:"flex", flexDirection:"row", justifyContent:"end"}}>
//                         <div className='mr-1'>Avg. Highway</div>
//                         <div className='mr-1'>{this.props.car.avgHwy}</div>
//                     </div>
//                     <div style={{width:"100%", display:"flex", flexDirection:"row", justifyContent:"end"}}>
//                         <div className='mr-1'>Avg. Cost to fill</div>
//                         <div className='mr-1'>{this.props.car.costToFill}</div>
//                     </div>
//                     <div style={{flexGrow: 1}}>
//                         {/* Buffer Div */}
//                     </div>
//                     <div style={{width:"100%", display:"flex", flexDirection:"row", justifyContent:"center"}}>
//                         <div className='mr-1'>MSRP</div>
//                         <div className='mr-1'>{this.props.car.msrp}</div>
//                     </div>

                   
//                 </div>
//             </div>
//         )
//     }
// }

//export default CarItem;