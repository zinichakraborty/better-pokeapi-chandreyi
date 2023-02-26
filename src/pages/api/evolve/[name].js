import axios from 'axios';

export default async function handler(req, res) {
    let response;
    try {
        response = await axios.get('https://pokeapi.co/api/v2/pokemon-species/' + req.query.name);
    } catch (error) {
        console.log(error)
    }
    let evo_endpoint = response.data.evolution_chain.url
    try {
        response = await axios.get(evo_endpoint);
    } catch (error) {
        console.log(error)
    }
    let data = response.data.chain
    let evolution
    if (data.evolves_to.length == 0) {
        evolution = data.species.name
    } else if (data.evolves_to[0].length == 1) {
        evolution = data.evolves_to[0].species.name
    } else {
        evolution = data.evolves_to[0].evolves_to[0].species.name
    }
    res.status(200)
    return res.send({evolution: evolution})
}