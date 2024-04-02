import { Outlet, Link } from "react-router-dom";
import Topbar from '../components/Topbar'
import TopContentBar from '../components/TopContentBar'

const Layout = ({user, setUser}) => {
    
  return (
    <>
      {/* MAIN CONTAINER */}
      <div className="drop-shadow-2xl border-2 border-solid border-slate-500 max-h-5/6" style={{width:"90%", "marginLeft":"auto", "marginRight":"auto", "marginTop":"50px", "marginBottom": "auto"}}>
          {/* TOP BAR */}
          <div>
              <Topbar user={user} setUser={setUser} />
          </div>

          {/* LOWER SECTION */}
          <div className="h-auto" style={{background:"white"}}>
              {/* TOP PART WITH TEXT AND GARAGE BUTTON */}
              <div>
                  <TopContentBar/>
              </div>
              {/* MAIN CONTENT OUTLET */}
              <div className="mx-5 h-[900px]">
                  <Outlet />
              </div>
          </div>
      </div>
    </>
  )
};

export default Layout;