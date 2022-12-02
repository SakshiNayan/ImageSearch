import React, { useState, useEffect } from "react";
import '../App.css'
import AddBookmark from "./addBookmark";
//import 'bootstrap/dist/css/bootstrap.min.css';

const Search =()=>{
    const [searchVal , setSearchVal] = useState("")
    const [pics, setpic]=useState([])
    const [book, setbook] = useState([])
    console.log(searchVal)
  
    const fetchRequest = async () => {
        const data = await fetch(
          `https://api.unsplash.com/search/photos?page=1&query=${searchVal}&client_id=_dz9MBHH1P5l8HUQH3UXCKhhwI_vt-ycOtrBnEwqgtk`
        );
        const dataJ = await data.json();
        const result = dataJ.results;
        console.log(result);
        setpic(result);
      };
      useEffect(() => {
        fetchRequest();
      }, []);

      const Submit = () => {
        fetchRequest();
        setSearchVal("");
      };

      const addBook =(img)=>{
        const newImg =[...book, img]
        setbook(newImg)
      }
  
    return(
        <div  className="area content">
            <div className="head">
            <h1>React Photo Search</h1>
           <div className="bookmark"><button className="Bb"> BookMarks</button> </div>
            </div>
            
            {/* <form className="form" onSubmit={searchPhotos}> */}
            <input type="search" 
                className="Inputsearch" 
                id="searchIn" 
                placeholder="Search for huge resolution....."
                value={searchVal}
                onChange={(e)=> setSearchVal(e.target.value)} 
                />

            <button className="Click-search" type="submit"
              onClick={Submit}>Search</button>
            {/* </form> */}
            <hr />
            <div className="row text-center text-lg-start">
                {
                    pics.map((pic)=>{
                        return(
                            
                            <div className="col-lg-4 col-md-4 col-6" key={pic.id}>
                                <img
                                    className="img-fluid img-thumbnail d-block mb-4 "
                                    alt={pic.alt_description}
                                    src={pic.urls.full}
                                    // width="20%"
                                    // height="20%"
                                ></img>
                                <div className="overlay"><AddBookmark handleBookClick={addBook} /></div> 
                                
                            </div>
                        )
                    })
                    
                }
            </div>

        </div>
    )
}
export default Search;