import axios from 'axios';

export default async function handler(req, res) {
    let response1;
    let response2;
    try {
        response1 = await axios.get('https://pokeapi.co/api/v2/pokemon/' + req.body.pokemon1);
        response2 = await axios.get('https://pokeapi.co/api/v2/pokemon/' + req.body.pokemon2);
    } catch (error) {
        console.log(error)
    }
    let winner = (response1.data.base_experience > response2.data.base_experience) ? req.body.pokemon1 : req.body.pokemon2
    return res.status(200).send({winner : winner})
}