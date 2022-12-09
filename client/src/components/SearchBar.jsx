import React from "react";
import { getByName } from "../actions";
import { useState } from "react";
import { useDispatch} from "react-redux";
import s from '../styles/searchBar.module.css'


export default function SearchBar(){
    const dispatch = useDispatch() 
    const [name, setName] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
 

 
    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }
    function handleSubmit(e){
        e.preventDefault()
        dispatch(getByName(name))
        setCurrentPage(1)

     
    }


    return(
        <div className={s.in}>
           <input
            type="text" 
            placeholder="Search Pokémon"
            onChange={(e)=>handleInputChange(e)}
            />
           <button
           type="submit"
           onClick={(e)=> handleSubmit(e)}>Search</button>
        </div>
    )
}