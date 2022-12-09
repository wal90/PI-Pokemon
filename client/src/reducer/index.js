import { GET_POKEMONS, GET_DETAIL, GET_BY_NAME, GET_TYPES, FILTER_BY_TYPES, ORDER_BY_NAME, ORDER_BY_ATTACK, FILTER_CREATED, POST_POKEMON} from "../actions"

const initialState = {
    pokemons: [],
    allPokemons:[],
    detail:[],
    types:[]
}

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_POKEMONS:
            return{
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            }
        case GET_DETAIL:
            return{
                ...state,
                detail:action.payload
            }
        case GET_BY_NAME:
            return{
                ...state,
                pokemons: Array.isArray(action.payload)? action.payload : [action.payload] 
            }
        case GET_TYPES:
            return{
                ...state,
                types: action.payload
            }
        case FILTER_BY_TYPES:
            const allPokemons = state.allPokemons
            const typeFilter = action.payload === "all" ? allPokemons : allPokemons.filter(e=> e.types.find(e => e.name === action.payload))
            if(typeFilter.length === 0){
               alert("The type doesn't belong to any pokemon") 
            } 
            return{
                ...state,
                pokemons: typeFilter
            }
            
        case ORDER_BY_NAME:
            let sortedArr = action.payload === 'A-Z'  ?
                 state.pokemons.sort(function(a,b){
                    if(a.name > b.name){
                        return 1
                    }
                    if(b.name > a.name){
                        return -1
                    }
                        return 0
                    }) :
                 state.pokemons.sort(function(a,b){
                    if(a.name > b.name){
                        return -1
                    }
                    if(b.name > a.name){
                        return 1
                    }
                        return 0
                    })
            return {
                ...state,
                pokemons: sortedArr
                    }

        case ORDER_BY_ATTACK:
            let sortArr = action.payload === 'des'  ?
                state.pokemons.sort(function(a,b){
                    if(a.attack > b.attack){
                        return 1
                    }
                    if(b.attack > a.attack){
                        return -1
                    }
                        return 0
                    }) :
                state.pokemons.sort(function(a,b){
                    if(a.attack > b.attack){
                        return -1
                    }
                    if(b.attack > a.attack){
                        return 1
                    }
                        return 0
                    })
            return {
                ...state,
                recipes: sortArr
                    }

        case FILTER_CREATED:
            const allPokemon = state.allPokemons
            const createdFilter = action.paylod === 'created' ? allPokemon.filter(el => el.createdInDb) : allPokemon.filter(el=> !el.createdInDb)
            if(createdFilter.length === 0){
                alert("No Pokemons") 
             } 
            return{
                ...state,
                allPokemons: action.payload === 'all' ? state.allPokemons : createdFilter
            }

        case POST_POKEMON:
                return{
                    ...state,
                } 
 
        

            

        default:
            return{...state}
    }

}

export default rootReducer;