import React from "react";
import s from "../styles/card.module.css"

export default function Card({image, name, types, attack}){
    return(
        <div >
            <div >
             <img  src={image} alt="pokemon" width="250px"/>   
            </div>

            <div className={s.contain}>
             <div className={s.allContain}>

            <div className={s.text}>
               <h3>{name[0].toUpperCase() + name.slice(1)}</h3>
            </div> 
            <div className={s.data}>
                <div >
                     <ul>
                        {
                            types.map(tipe=>(
                                <li key={tipe.name}>
                                    <p>{tipe.name}</p>
                                </li>
                            ))
                        }
                     </ul>
                    
                </div>  

            <div className={s.dataAt}>
                <p>ATTACK</p>
                <h5>{attack}</h5>   

            </div> 
            </div>
           
         
            
            </div>   
            </div>
            
            
            
            
        </div>
    )
}

{/* <ul>
{pageNumbers && 
pageNumbers.map(number =>(
    <li className={s.pa} key={number.toString()}>
        <a onClick={()=>paginated(number)}>{number}</a>
    </li>
))}
</ul> */}