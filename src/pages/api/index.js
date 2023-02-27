import axios from 'axios';

export default async function handler(req, res) {
    let response;
    const val = Math.floor(Math.random() * 1008 + 1)
    try {
        response = await axios.get('https://pokeapi.co/api/v2/pokemon/' + val);
    } catch (error) {
        console.log(error)
    }
    let types = response.data.types.map(type => {return type.type.name})
    let name = response.data.name
    let sprite = response.data.sprites.front_default
    try {
        response = await axios.get('https://pokeapi.co/api/v2/pokemon-species/' + val);
    } catch (error) {
        console.log(error)
    }
    let color = response.data.color.name
    return res.status(200).send({name : name, sprite : sprite, types : types, color : color})
}