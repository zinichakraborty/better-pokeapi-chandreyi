import axios from 'axios';

export default async function handler(req, res) {
    let response;
    try {
        response = await axios.get('https://pokeapi.co/api/v2/pokemon-species/' + req.query.name);
    } catch (error) {
        console.log(error)
    }
    let color = response.data.color.name
    let evo_endpoint = response.data.evolution_chain.url
    try {
        response = await axios.get(evo_endpoint);
    } catch (error) {
        console.log(error)
    }
    let data = response.data.chain
    let evolution
    if (data.evolves_to.length == 0) {
        evolution = data.species.name + " (there is no evolution)"
    } else if (data.evolves_to[0].length == 1) {
        evolution = data.evolves_to[0].species.name
    } else {
        evolution = data.evolves_to[0].evolves_to[0].species.name
    }
    try {
        response = await axios.get('https://pokeapi.co/api/v2/pokemon/' + evolution);
    } catch (error) {
        console.log(error)
    }
    let evosprite = response.data.sprites.front_default
    return res.status(200).send({evolution: evolution, color: color, evosprite: evosprite})
}