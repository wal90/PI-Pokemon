require('dotenv').config();
const { Router } = require('express');
const { getPokeById, getDbById } = require ('../controllers')
const {Pokemon, Type } = require('../db.js')



const router = Router();

router.get('/:id', async (req, res)=>{
    try {
        const { id } = req.params
        const regex = /([a-zA-Z]+([0-9]+[a-zA-Z]+)+)/;
        if(regex.test(id)){
            const dbId = await getDbById(id)
            return res.json(dbId)
        }
        else{
            const apiId = await getPokeById(id)
            return res.json(apiId)
        }
    } catch (error) {
        res.status(400).send({error: "Id not found" })
    }
})

router.post('/', async (req, res) => {
    const {name, life, attack, defense, height, weight, image, speed, types,createdInDb} = req.body
    if(!name) res.status(400).json({msg : 'Missing data'});
    try {
        const pokemonCreated = await Pokemon.create({
            name, life, attack, defense, height, weight, speed, image, createdInDb})

            
        const typesDb = await Type.findAll({
            where:{name : types}

            
        })
       
        pokemonCreated.addType(typesDb)
        res.status(200).json('Successfully create')
  
    } catch (error) {
        res.status(400).send({error: "error" })
    }
})
// router.post("/", async (req, res) => {
//     try{
//         const { name, image, types, hp, attack, defense, speed, height, weight } = req.body;
//         if(name){
//             const pokemon = await Pokemon.create({ name, image, hp, attack, defense, speed, height, weight })

//             types.forEach(async(t) => {
//                 await pokemon.addType(t.id)              
//             });
//             return res.status(200).send(pokemon)
//         }
//         return res.status(400).send({message: "Name is required"}) 
//     }catch(error){
//         res.status(400).send({error: error.message})
//     }  
// })

module.exports = router; 
