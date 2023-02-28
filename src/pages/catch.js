import axios from 'axios'
import useSWR from 'swr'
import Link from 'next/link'
import { useState } from 'react'

const name = "gyarados"

export default function Battle() {
    const [t, setT] = useState(255);

    let fetcher = async (url) => {
        const res = await axios.post(url, {
            pokemon: name,
            type: t
        })
        return res.data
    }
    
    const { data, error, isLoading, isValidating } = useSWR(`/api/catch/`, fetcher)
    if (isLoading) return <div><h2>Loading</h2></div>
    if (!data) return (
        <>
            <Link href="/"><h1>Better PokeAPI</h1></Link>
            <h2>Must Implement your API. Data is empty</h2>
        </>
    )
    let { caught, color, ball } = data

    return (
        <div style={{backgroundColor: `${color}`}}>
            <Link href="/"><h1>Better PokeAPI</h1></Link>
            <h2>Catching: {name}</h2>

            {isValidating ? (
                <h2>Validating</h2>
            ) : (
                <>
                    {caught ? (
                        <h2>{name} has been caught!</h2>
                    ) : (
                        <h2>{name} broke free!</h2>
                    )}
                    <img src={ball} />
                    <br />
                    <button onClick={() => setT(255)}>Poke Ball</button>
                    <button onClick={() => setT(200)}>Great Ball</button>
                    <button onClick={() => setT(150)}>Ultra Ball</button>
                </>
            )}
        </div>
    )
}