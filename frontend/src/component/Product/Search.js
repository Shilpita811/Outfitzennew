import React, { Fragment, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import "./Search.css";

const Search = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [keyword, setKeyword] = useState("");
   
    const searchSubmitHandler = (e) =>{
        e.preventDefault();
        const path = location.pathname;
        if (path === "/products") {
            navigate("/products")
          } else {
            navigate(`/products/${keyword}`);
          }
    };

  return (
    <Fragment>
      <MetaData title="Search -- Every Day Market"/>
        <form className='searchBox' onSubmit={searchSubmitHandler}>
            < input 
            type="text" 

            placeholder='Search a Product...'
            onChange={(e) => setKeyword(e.target.value)} 
            />

            <input type="submit" value="Search" />
        </form>
    </Fragment>
  )
}

export default Search