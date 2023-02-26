import axios from 'axios';

export default async function handler(req, res) {
    let response;
    try {
        response = await axios.get('https://pokeapi.co/api/v2/pokemon/' + req.body.pokemon);
    } catch (error) {
        console.log(error)
    }
    let type = req.body.type
    console.log(type)
    let hpMax = response.data.stats[0].base_stat
    let hpCurr = Math.floor(Math.random() * hpMax + 1)
    let n = Math.floor(Math.random() * 255 + 1)
    let ball = Math.floor(Math.random() * type + 1)
    let f = (hpMax * 255 * 4) / (hpCurr * ball)
    let caught = (f >= n)

    return res.status(200).send({caught : caught})
}