require("dotenv").config();
const { Router } = require("express");
const axios = require("axios")
const {Pokemon, Type} = require("../db")



const getApiInfo = async ()=>{

    try {
        const allUrl = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40");
        const allPoke = await allUrl.data.results
        const pokeData = await Promise.all(allPoke.map( async r =>{
        const allApi = await axios.get(r.url);
           return{
            id: allApi.data.id,
            name: allApi.data.name,
            hp: allApi.data.stats[0].base_stat,
            attack:allApi.data.stats[1].base_stat,
            defense: allApi.data.stats[2].base_stat,
            height: allApi.data.height,
            weight: allApi.data.weight,
            speed: allApi.data.stats[5].base_stat,
            image: allApi.data.sprites.other.home.front_default,
            types: allApi.data.types.map(t=>{
                return{
                 name:t.type.name
                }
            })
            }
        }))
    
        return pokeData
        
    } catch (error) {
        return ({error: "Pokemon not found" })
        
    }

}

const getDbInfo = async()=>{
    try {
        return await Pokemon.findAll({
            include:{
                model: Type,
                attributes:["name"],
                through:{
                    attributes:[],
                }
            }
        })
    } catch (error) {
        return ({error: "Pokemon not found in database" })
    }
}

const getAllPokemons =async()=>{
    try {
        const apiPokemons = await getApiInfo()
        const dbPokemons = await getDbInfo()
        const allPokemons = dbPokemons.concat(apiPokemons)
        return allPokemons
    } catch (error) {
        return ({error : "Pokemon not found"})
    }
}


const getPokeByName = async(name)=>{ 
    try {   
    

            const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/` + name.toLowerCase())
            if(pokemon){
                return {
                id: pokemon.data.id,
                name: pokemon.data.name,
                life: pokemon.data.stats[0].base_stat,
                attack: pokemon.data.stats[1].base_stat,
                defense: pokemon.data.stats[2].base_stat,
                height: pokemon.data.height,
                weight: pokemon.data.weight,
                speed: pokemon.data.stats[5].base_stat,
                image: pokemon.data.sprites.other.home.front_default,
                types: pokemon.data.types.map(t=>{
                    return{
                     name:t.type.name
                    }
                })
            }
            }
            
    } catch (error) {
        return ({error : "Pokemon not found"}) 
    }

}

const getDbByName = async (name)=>{
    try {
        return await Pokemon.findAll(name, {
            include: [
                {
                    model: Type,
                    attributes: ["name"],
                    through:{
                        attributes:[]
                    }
                }
            ]
        })
    } catch (error) {
        return ({error : "Pokemon not found"})  
    }
}


    

const getPokeById = async(id) => {
    try {
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)

        if(poke){
         return{
            id: poke.data.id,
            name: poke.data.name,
            life: poke.data.stats[0].base_stat,
            attack: poke.data.stats[1].base_stat,
            defense: poke.data.stats[2].base_stat,
            height: poke.data.height,
            weight: poke.data.weight,
            speed: poke.data.stats[5].base_stat,
            image: poke.data.sprites.other.home.front_default,
            types: poke.data.types.map(t=>{
                return{
                 name:t.type.name
                }
            })
        }
        }
       
    } catch (error) {
        return ({error : "Pokemon not found"}) 
    }
}

const getDbById = async (id) =>{
    try {
       return await Pokemon.findByPk(id,{
        include:[
            {
                model: Type,
                attributes: ["name"],
                through:{
                    attributes:[]
                }
            }
        ]
       }) 
    } catch (error) {
        return ({error : "Id not found"}) 
    }
}


const getAllTypes = async () => {
    try {
       
    //    const allTypes= await Type.findAll()

    //    if(!allTypes.length){
    //     const apiTypes = await axios.get('https://pokeapi.co/api/v2/type') 
    //     const typeDb =  apiTypes.data.results.map( t => {
    //            return { name: t.name}
    //         })

    //     allTypes = await Type.bulkCreate(typeDb)    
    //     }

    //     return allTypes

     const apiTypes = await axios.get('https://pokeapi.co/api/v2/type') 
       const allTypes = apiTypes.data.results
       
       allTypes.map(t=>
        Type.findOrCreate({
            where:{
                name:t.name
            }
        }))
        const dbTypes = await Type.findAll()
        return dbTypes

    } catch (error) {
        return ({error : "Type not found"})   
    }
}




module.exports={
 getApiInfo,
 getDbInfo, 
 getAllPokemons,
 getPokeByName,
 getDbByName,
 getPokeById,
 getDbById, 
 getAllTypes
}