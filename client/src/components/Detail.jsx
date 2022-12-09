import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail } from "../actions";
import { Link } from "react-router-dom"
import s from "../styles/detail.module.css"
import Loading from "./Loading";

export default function Detail(props){
    const dispatch = useDispatch()


    useEffect(()=>{
        dispatch(getDetail(props.match.params.id))
    },[])

   const pokemon = useSelector((state)=> state.detail) 

    return(
      <div>
        <div className={s.containerAll}>
        </div>
          

         {
         pokemon.hasOwnProperty("name") ?
         <div>

         <div >

            <div className={s.allContain}>
              <img src={pokemon.image || "https://www.pngall.com/wp-content/uploads/4/Pokeball-Transparent.png" } width="550px"/>  
            </div>

            <div className={s.details}>
              <h2>{pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}</h2>
            <p>TYPES</p>
            <h5>{pokemon.types.map(t=>t.name).join(' · ')}</h5>

            <div className={s.dataNumber}>
              <div className={s.dataOr}>
                <div className={s.dataOne}>
                  <p>LIVE</p>
                  <h5>{pokemon.life}</h5>
                </div>
                <div className={s.dataOne}>
                  <p>ATTACK</p>
                  <h5>{pokemon.attack}</h5>
                </div>
                <div className={s.dataOne}>
                  <p>DEFENSE</p> 
                  <h5>{pokemon.defense}</h5>
                </div>
               
             </div>

              <div className={s.dataOr}>
            <div className={s.dataOne}>
              <p>SPEED</p>
              <h5>{pokemon.speed}</h5>
            </div>
            <div className={s.dataOne}>
              <p>WEIGHT</p>
            <h5>{pokemon.weight}</h5>
            </div>
            <div className={s.dataOne}>
               <p>HEIGHT</p>
            <h5>{pokemon.height}</h5>   
            </div>
            
            </div>
            <div className={s.detailBtn}>
                <Link to="/home" >
                    <button>Back</button>
                </Link>

           </div>  
            
            </div>
            
            </div>
            

        
        </div>   
           </div>
         : 
         <Loading></Loading>
        }

          

     
        </div>
    )
}