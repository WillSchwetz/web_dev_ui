const Home = ({user}) => {
    return (
        <div className="h-full flex-1" >
            <div className='items-center justify-items-center' style={{display:"flex", height:"100%", width:"100%", justifyContent:"space-around"}}>
                <span className='ml-3 font-sans text-2xl'>
                    {user ? 
                        `Welcome back ${user}, please select search criteria and click search`
                        : "Please select search criteria and click search. Don't forget to login to save your search!"
                    }
                    
                </span>
            </div>
        </div>
    );
  };
  
  export default Home;