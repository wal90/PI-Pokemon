require('dotenv').config();
const { Router } = require('express');
const { getAllPokemons, getPokeByName, getDbByName } = require ('../controllers')


const router = Router();

router.get('/', async (req, res) => {
   const { name } = req.query;
   const allPoke = await getAllPokemons()
   try {
      if(name){
         const pokeApi = await getPokeByName(name)
         if(pokeApi.error){
            const pokeDb = await getDbByName(name)
            if(!pokeDb.length){
               res.status(404).json({message:'Pokemon not found'})
            }
            return res.status(200).json(pokeDb)
         }
         return res.status(200).json(pokeApi)
      }
      return res.status(200).json(allPoke)
    
   } catch (error) {
    res.status(400).send({error: "Pokemon not found" })
   }

})




module.exports = router; 
