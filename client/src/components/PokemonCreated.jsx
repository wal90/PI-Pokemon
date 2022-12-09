import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTypes,postPokemon } from "../actions";
import s from "../styles/create.module.css"


function validate(input) {
    let errors = {};
    if (!input.name) {
      errors.name = 'Name is required';
    } else if (!/^[a-zA-Z]+$/.test(input.name)) {
        errors.name = "Invalid name. The name must contain letters";
   }
   
   if(!input.image) {
    errors.image = 'Image is required'
    } else if (!input.image.includes('https://')){
       errors.image= 'Image is invalid'
    }
   
 
    
    
   
    return errors;
  }


export default function PokemonCreated(){
    const dispatch = useDispatch()
    const types = useSelector((state)=> state.types)
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name: "",
        life: 0,
        attack: 0,
        defending: 0,
        speed: 0,
        height: 0,
        weight: 0,
        image: "",
        types: []
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }

    function handleSelect(e){
        if(input.types.includes(e.target.value)){
            alert("The pokemon already has that type");
        } else{
            if (input.types.length < 2) {
              setInput({
                ...input,
                types: [...input.types, e.target.value],
            });
            } else {
              alert("Choose only two types, please");
            }
        } 
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(postPokemon(input))
        alert("Pokemon created")
        console.log(input)
        setInput({
            name: "",
            life: 0,
            attack: 0,
            defending: 0,
            speed: 0,
            height: 0,
            weight: 0,
            image: "",
            types: []
        })


    }

    function handleDelete(el){
        setInput({
            ...input,
            types: input.types.filter( t=> t !== el)
        })
    }

    useEffect(()=>{
        dispatch(getTypes())
    },[])

  




    return(
        <div>

            <div className={s.container}>

            </div>


         <div className={s.contain}>

         <div  className={s.all}>
          <div >
            <Link to='/home' className={s.link}><button>Back</button></Link>
          </div>
          <div className={s.containP}>
            <h1>Create your Pokémon</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
            <div className={s.sInput}>
                    <label>Name: </label>
                    <input
                    type="text"
                    value={input.name} 
                    name="name"
                    onChange={(e)=>handleChange(e)}/>
                     {errors.name &&(
                        <p className={s.error}>{errors.name}</p>
                    )}
                  
            </div>
            <div className={s.sInput}>
                    <label>Life: </label>
                    <input
                    type="range"
                    min="0" 
                    max="150" 
                    value={input.life} 
                    name="life"
                    onChange={(e)=>handleChange(e)}
                   />
                      {errors.life &&(
                        <p className={s.error}>{errors.life}</p>
                    )}
                    
            </div>
            <div className={s.sInput}>
                    <label>Attack: </label>
                    <input
                    type="range"
                    min="0" 
                    max="200" 
                    value={input.attack} 
                    name="attack"
                    onChange={(e)=>handleChange(e)}
                    />
                      {errors.attack &&(
                        <p className={s.error}>{errors.attack}</p>
                    )}
            </div>
            <div className={s.sInput}>
                    <label>Defending: </label>
                    <input
                    type="range"
                    min="0" 
                    max="250" 
                    value={input.defending} 
                    name="defending"
                    onChange={(e)=>handleChange(e)}
                    />
                      {errors.defending &&(
                        <p className={s.error}>{errors.defending}</p>
                    )}
            </div>
            <div className={s.sInput}>
                    <label>Speed: </label>
                    <input
                    type="range"
                    min="0" 
                    max="200" 
                    value={input.speed} 
                    name="speed"
                    onChange={(e)=>handleChange(e)}
                    />
                      {errors.speed &&(
                        <p className={s.error}>{errors.speed}</p>
                    )}
            </div>
            <div className={s.sInput} >
                    <label>Height: </label>
                    <input
                    type="range"
                    min="0" 
                    max="20" 
                    value={input.height} 
                    name="height"
                    onChange={(e)=>handleChange(e)}
                    />
                      {errors.height &&(
                        <p className={s.error}>{errors.height}</p>
                    )}
            </div>
            <div className={s.sInput}>
                    <label>Weight: </label>
                    <input
                    type="range"
                    min="0" 
                    max="700" 
                    value={input.weight} 
                    name="weight"
                    onChange={(e)=>handleChange(e)}
                    />
                      {errors.weight &&(
                        <p className={s.error}>{errors.weight}</p>
                    )}

            </div>
            <div className={s.sInput}>
                    <label>Image: </label>
                    <input
                    type="text"
                    value={input.image} 
                    name="image"
                    onChange={(e)=>handleChange(e)}
                    />
                     {errors.image &&(
                        <p className={s.error}>{errors.image}</p>
                    )}
            </div>
            
            <div className={s.sInput}>
                    <label>Select Types </label>
                    <select onChange ={(e)=>handleSelect(e)}>
                     
                        {types.map((d) => (
                         <option key={d.name} value={d.name}>{d.name}</option>
                         ))} 
                     </select>
                     
                     {input.types.map(el =>
                        <div className={s.type}>
                            <p>{el}</p> <button type="button" onClick={()=>handleDelete(el)}>x</button> 
                        </div>  
                      )}
            </div>

            <div className={s.create}>
                    <button type="submit">Create Pokemon</button>
             </div>

            </form>
            </div>
          </div>
          </div>
        </div>
    )
}