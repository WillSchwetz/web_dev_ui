import Cookies from 'universal-cookie';

const BASE_API = 'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records?'

const cookies = new Cookies();

export async function GetCarList(minYear, maxYear, driveTrain, transmission, mpg, page){
    const limitVehicles = 20;
    var offset = (page * limitVehicles);

    let paramString = `limit=${limitVehicles}`; // Set limit of returns
    paramString += `&offset=${offset}`; // Set offset for pagination
    paramString += "&select=year,make,basemodel,model,city08,highway08,comb08,displ,cylinders,drive,fueltype,fuelcost08,yousavespend,tcharger,scharger, trany"
    paramString += "&order_by=make,basemodel,model"
    paramString += "&where="
    paramString += `(year >= ${minYear} AND year <= ${maxYear})`
    paramString += `AND (comb08 >= ${mpg})`
    
    switch(driveTrain){
        case "fwd": 
            paramString += ` AND (drive="Front-Wheel Drive")`;
            break;
        case "awd":
            paramString += ` AND (drive="4-Wheel or All-Wheel Drive" OR drive="All-Wheel Drive")`;
            break;
        case "rwd":
            paramString += ` AND (drive="Rear-Wheel Drive")`;
            break;
        case "4x4":
            paramString += ` AND (drive="4-Wheel Drive" OR drive="Part-time 4-Wheel Drive)`
            break;
    }

    switch (transmission){
        case "auto":
            paramString += ` AND (trany="Automatic 4-spd"`
                + ` OR trany="Automatic (S6)"`
                + ` OR trany="Automatic 3-spd"`
                + ` OR trany="Automatic 3-spd"`
                + ` OR trany="Automatic (S8)"`
                + ` OR trany="Automatic 5-spd"`
                + ` OR trany="Automatic 6-spd"`
                + ` OR trany="Automatic (variable gear ratios)"`
                + ` OR trany="Automatic 8-spd"`
                + ` OR trany="Automatic (S5)"`
                + ` OR trany="Automatic (AM-S7)"`
                + ` OR trany="Automatic 7-spd"`
                + ` OR trany="Automatic 9-spd"`
                + ` OR trany="Automatic (A1)"`
                + ` OR trany="Automatic (S10)"`
                + ` OR trany="Automatic (S7)"`
                + ` OR trany="Automatic 10-spd"`
                + ` OR trany="Automatic (AM7)"`
                + ` OR trany="Automatic (AV-S6)"`
                + ` OR trany="Automatic (AM-S8)"`
                + ` OR trany="Automatic (S9)"`
                + ` OR trany="Automatic (S4)"`
                + ` OR trany="Automatic (AV-S7)"`
                + ` OR trany="Automatic (AM-S6)"`
                + ` OR trany="Automatic (AV-S8)")`
            break;
        case "manual":
            paramString += ` AND (trany="Manual 4-spd Doubled"`
                + ` OR trany="Manual 3-spd"`
                + ` OR trany="Manual 7-spd"`
                + ` OR trany="Manual 4-spd"`
                + ` OR trany="Manual 6-spd"`
                + ` OR trany="Manual 5-spd")`
            break;
    }
    const url = BASE_API + paramString
    const carList = await CallExternalAPI(url);
    return carList;

}

const CallExternalAPI = async (urlString) => {
    var list = [];
    list = await fetch(urlString)
        .then(response => response.json())
        .then(str => {
            return str;
        })
        .catch(error => {
            console.error('Error fetching or parsing the XML:', error);
        });
    return list;
}


async function getImageDetails(title) {
    return await fetch(`https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&iiprop=url|extmetadata&titles=${encodeURIComponent(title)}&format=json&origin=*`)
    .then(response => response.json())
    .then(data => {
      const pageId = Object.keys(data.query.pages)[0];
      const imageInfo = data.query.pages[pageId].imageinfo[0];
      if (imageInfo) {
        const imageUrl = imageInfo.url;
        const artist = imageInfo.extmetadata.Artist ? imageInfo.extmetadata.Artist.value : 'Unknown artist';

        return {att:artist, url:imageUrl }
      } else {
        return false;
      }
    })
    .catch(error => {
        return false;
    });
  }
  


export async function GetImageUrl(year, make, model){
    const searchQuery = `${year} ${make} ${model}`;
    const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchQuery)}&format=json&origin=*&srlimit=1&srnamespace=`;
    const response = await fetch(url)
        .then(response => response.json())
        .then(data => {
        if (data.query.search.length > 0) {
            const title = data.query.search[0].title;
            return getImageDetails(title);

        } else {

            return false;
        }
        })
        .catch(error =>{
            console.error('Error fetching search data: ', error)
            return false;
        });
    return response;
   

}


export async function CheckAuth(){
    var auth = cookies.get('eco_search');
    if(!!auth) return true;
    else return false;
}

export function LogoutUser(){
    cookies.remove('eco_search');
    return true;
}

export async function LoginUser(username, password){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
        "username": username,
        "password": password
    });
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
    };
    try{
        let response = await fetch("http://localhost:3010/api/auth/login", requestOptions)
        if(response.ok){
            const user = await response.json();
            const expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime() + (8 * 60 * 60 * 1000));
            cookies.set('eco_search', user.user , { expires: expirationDate });
            return user.user;
        } else return false;
    } catch (error){
        console.log(error);
        return false;
    }
}

export async function AddCarToUser(user, car){
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify(car);
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
    };
    console.log(requestOptions, user);
    try{
        let response = await fetch(`http://localhost:3010/api/cars?username=${user}`, requestOptions)
        if(response.ok){
           return true
        } else return false;
    } catch (error){
        console.log(error);
        return false;
    }
}

export async function GetUsersCars(user){
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,   
    };

    try{
        let response = await fetch(`http://localhost:3010/api/cars?username=${user}`, requestOptions)
        if(response.ok){
           const cars = await response.json();
            console.log(cars.cars)
           return cars.cars
        } else return false;
    } catch (error){
        console.log(error);
        return false;
    }
}


export async function RegisterUser(username, password){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
        "username": username,
        "password": password
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
    };
    try{
        let response = await fetch("http://localhost:3010/api/auth/register", requestOptions)
        if(response.ok){
            const user = await response.json();
            const expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime() + (8 * 60 * 60 * 1000));
            cookies.set('eco_search', user.user , { expires: expirationDate });
            return  user.user;
        } else return false;
    } catch (error){
        console.log(error);
        return false;
    }
    
        // .then((response) => {
        //     //console.log(response.ok)
        //     if(!response.ok) return false
        //     // else{
        //     //     const expirationDate = new Date();
        //     //     console.log(response.text());
        //     //     expirationDate.setTime(expirationDate.getTime() + (8 * 60 * 60 * 1000));
        //     //     //cookies.set('eco_search', 'cookieValue', { expires: expirationDate });
        //     //     return response.text()
        //     // }
            
        //     //console.log(response); 
        //     //return response.text()
        // })
        // .then((result) => console.log(result))
        // .catch((error) => console.error(error));
    //console.log("response");
    //console.log(response);
    //return response;
    
}

// export async function LoginUser(username, password){
//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
//     const raw = JSON.stringify({
//         "username": username,
//         "password": password
//     });

//     const requestOptions = {
//         method: "POST",
//         headers: myHeaders,
//         body: raw,
//     };

//     fetch("http://localhost:3010/api/auth/login", requestOptions)
//         .then((response) => response.text())
//         .then((result) => console.log(result))
//         .catch((error) => console.error(error));
// }