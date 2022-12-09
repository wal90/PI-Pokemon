import React from "react";
import s from '../styles/paginate.module.css'

export default function Paginated({pokePerPage, allPokemons, paginated}){
    const pageNumbers = []

    for(let i=0; i<= Math.floor(allPokemons/pokePerPage); i++){
        pageNumbers.push(i+1)
    }

    return(
        <div className={s.pagination}>
         <nav>
            <ul>
                {pageNumbers && 
                pageNumbers.map(number =>(
                    <li className={s.pa} key={number.toString()}>
                        <a onClick={()=>paginated(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>   
        </div>
        
    )
}