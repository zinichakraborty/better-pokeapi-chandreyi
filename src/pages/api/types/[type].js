import axios from 'axios';

export default async function handler(req, res) {
    let response;
    try {
        response = await axios.get('https://pokeapi.co/api/v2/type/' + req.query.type);
    } catch (error) {
        console.log(error)
    }
    let pokemon = response.data.pokemon.map(pokemon => {return pokemon.pokemon.name})
    res.status(200)
    return res.send({pokemon : pokemon})
}