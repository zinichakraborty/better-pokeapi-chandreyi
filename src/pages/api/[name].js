import axios from 'axios';

export default async function handler(req, res) {
    let response;
    try {
        response = await axios.get('https://pokeapi.co/api/v2/pokemon/' + req.query.name);
    } catch (error) {
        console.log(error)
    }
    let types = response.data.types.map(type => {return type.type.name})
    let name = response.data.name
    let sprite = response.data.sprites.front_default
    res.status(200)
    return res.send({name : name, sprite : sprite, types : types})
}