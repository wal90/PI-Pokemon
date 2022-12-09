import axios from 'axios'

 export const GET_POKEMONS = 'GET_POKEMONS';
 export const GET_DETAIL = 'GET_DETAIL';
 export const GET_BY_NAME = 'GET_BY_NAME';
 export const GET_TYPES = 'GET_TYPES';
 export const FILTER_BY_TYPES = 'FILTER_BY_TYPES';
 export const ORDER_BY_NAME = 'ORDER_BY_NAME';
 export const ORDER_BY_ATTACK = 'ORDER_BY_ATTACK';
 export const FILTER_CREATED = 'FILTER_CREATED';
 export const POST_POKEMON = 'POST_POKEMON'


export function getPokemons() {
     return async function(dispatch){
        var json = await axios.get('http://localhost:3001/pokemons')
        return dispatch({
            type: GET_POKEMONS,
            payload:json.data
        })
     }
}

export function getDetail(id){
    return async function(dispatch){
        try {
          var jsonId = await axios.get(`http://localhost:3001/pokemon/${id}`)
            return dispatch({
                type: GET_DETAIL,
                payload: jsonId.data
        })  
        } catch (error) {
            throw error
        }
        
    }
}

export function getByName(name){
    return async function(dispatch){
        try {
            const jsonName = await axios.get('http://localhost:3001/pokemons?name=' + name)
                return dispatch({
                    type: GET_BY_NAME,
                    payload: jsonName.data
                })
        } catch (error) {
            throw error          
        }
    }
}

export function getTypes(){
    return async function (dispatch){
        try {
            var jsonType = await axios.get('http://localhost:3001/types')
            return dispatch({
                type: GET_TYPES,
                payload: jsonType.data
            })
        } catch (error) {
            throw error
        }
    }
}

export function filterByTypes(payload){
        return{
            type: FILTER_BY_TYPES,
            payload
        }
}

export function orderByName(payload){
    return{
        type: ORDER_BY_NAME,
        payload
    }
}

export function orderByAttack(payload){
    return{
        type: ORDER_BY_ATTACK,
        payload
    }
}

export function filterCreated(payload){
    return{
        type: FILTER_CREATED,
        payload
    }
}

export function postPokemon(payload){
    return async function (dispatch){
        var response = await axios.post('http://localhost:3001/pokemon', payload);
        return response;
    }
}