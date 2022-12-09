
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const pokemonsRoute = require('./pokemons.js');
const pokemonRoute = require('./pokemon.js')
const typesRoute = require('./types.js')

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/pokemons', pokemonsRoute);
router.use('/pokemon', pokemonRoute);
router.use('/types', typesRoute);


module.exports = router;
