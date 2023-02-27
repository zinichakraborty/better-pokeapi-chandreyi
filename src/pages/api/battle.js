import axios from 'axios';

export default async function handler(req, res) {
    let response
    let response1;
    let response2;
    try {
        response1 = await axios.get('https://pokeapi.co/api/v2/pokemon/' + req.body.pokemon1);
        response2 = await axios.get('https://pokeapi.co/api/v2/pokemon/' + req.body.pokemon2);
    } catch (error) {
        console.log(error)
    }
    let winner = (response1.data.stats[0].base_stat > response2.data.stats[0].base_stat) ? req.body.pokemon1 : req.body.pokemon2
    try {
        response = await axios.get('https://pokeapi.co/api/v2/pokemon-species/' + winner);
    } catch (error) {
        console.log(error)
    }
    let color = response.data.color.name
    return res.status(200).send({winner : winner, color : color})
}