require('dotenv').config();
const { Router } = require('express');
const { getAllTypes } = require('../controllers')



const router = Router();

router.get('/', async (req, res) => {
    try {
        const allTypes = await getAllTypes()
        res.json(allTypes)
    } catch (error) {
        res.status(400).send({error: "Type not found" })
    }
})



module.exports = router; 
