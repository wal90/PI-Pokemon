import React from "react";
import { Link } from "react-router-dom"
import SearchBar from "./SearchBar";
import s from '../styles/navbar.module.css'
import logo from '../image/logo.png'



export default function Navbar(){

    return(
        <div className={s.nav}>
            <ul> 
                
                <li><Link to='/home'><img src={logo} alt="logo" width="150px"/></Link></li>
                <li><Link to='/create'>CREATE POKÉMON</Link></li>
                <SearchBar/>
        
            </ul>
        </div>
    )
}