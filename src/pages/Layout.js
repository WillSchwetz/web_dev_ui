import { Outlet, Link } from "react-router-dom";
import Topbar from '../components/Topbar'
import TopContentBar from '../components/TopContentBar'

const Layout = ({user, setUser}) => {
    
  return (
    <>
      {/* MAIN CONTAINER */}
      <div className="w-full h-screen max-h-full py-16 px-16">
        <div className="drop-shadow-2xl border-2 border-solid border-slate-500 mx-auto w-full h-full" >
            {/* TOP BAR */}
            <div className="h-[50px]">
                <Topbar user={user} setUser={setUser} />
            </div>

            {/* LOWER SECTION */}
            <div className="flex flex-col" style={{background:"white", height: "calc(100% - 50px)"}}>
                {/* TOP PART WITH TEXT AND GARAGE BUTTON */}
                <div className="">
                    <TopContentBar/>
                </div>
                {/* MAIN CONTENT OUTLET */}
                <div className="mx-5 overflow-y-hidden h-full">
                    <Outlet />
                </div>
            </div>
        </div>

      </div>
     
    </>
  )
};

export default Layout;