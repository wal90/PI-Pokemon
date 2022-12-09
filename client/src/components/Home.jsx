import React, { Fragment } from "react";
import Navbar from "./Navbar";
import Card from "./Card";
import Paginated from "./Paginated";
import Loading from "./Loading"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getPokemons, filterByTypes, orderByName, orderByAttack, filterCreated } from "../actions";
import s from '../styles/home.module.css'

export default function Home(){
    const dispatch = useDispatch()
    const allPokemons = useSelector((state) => state.pokemons)
    const [order, setOrden] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [pokePerPage, setPokePerPege] = useState(12)
    const indexOfLastPokemon = currentPage * pokePerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokePerPage;
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  

    const paginated = (pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{
        dispatch(getPokemons())
    }, [dispatch])

   

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName (e.target.value))
        setCurrentPage(1);
        setOrden(`ordenado ${e.target.value}`)
    }

    function handleFilterType(e){
        dispatch(filterByTypes(e.target.value))
    }

    function handleSortAttack(e){
        e.preventDefault();
        dispatch(orderByAttack(e.target.value))
        setCurrentPage(1);
        setOrden(`ordenado ${e.target.value}`)
    }

    function handleFilterCreated(e){
        e.preventDefault();
        dispatch(filterCreated(e.target.value))
    }




    return(
        <div >
        <div>
            <Navbar/>
        </div>

        <select onChange={e=>handleSort(e)}>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
        </select>  

        <select onChange={e => handleFilterType(e)}>
                <option value="all">All Types</option>
                <option value="normal">normal</option>
                <option value="fighting">fighting</option>
                <option value="flying">flying</option>
                <option value="poison">poison</option>
                <option value="ground">ground</option>
                <option value="rock">rock</option>
                <option value="bug">bug</option>
                <option value="ghost">ghost</option>
                <option value="steel">steel</option>
                <option value="fire">fire</option>
                <option value="water">water</option>
                <option value="grass">grass</option>
                <option value="electric">electric</option>
                <option value="psychic">psychic</option>
                <option value="ice">ice</option>
                <option value="dragon">dragon</option>
                <option value="dark">dark</option>
                <option value="fairy">fairy</option>
                <option value="unknown">unknown</option>
                <option value="shadow">shadow</option>
         </select>

         <select onChange={e=>handleSortAttack(e)}>
                <option value="des">Descending order</option>
                <option value="asc">Ascending order</option>
        </select>  

        <select onChange={e=>handleFilterCreated(e)}>
                <option value="all">All Pokemons</option>
                <option value="created">Created</option>
                <option value="existing">Pre-existing</option>
        </select>  

         {allPokemons.length?
        <div>
           
        <div>
            <Paginated
            pokePerPage={pokePerPage}
            allPokemons={allPokemons.length}
            paginated = {paginated}/>
         </div>

         <div className={s.allCards}>
            {
                currentPokemons.map((p)=>{
                    return(
                        <Fragment key={p.id}>
                            <Link to={"/pokemons/" + p.id}>
                                <Card image={p.image} name={p.name} types={p.types } attack={p.attack} key={p.id}/>
                            </Link>
                        </Fragment>
                    )
                })
            } 
        </div>
        </div> : <div>
            <Loading></Loading>
        </div>
              }
        
     
           
        </div>
       

        
    )
}