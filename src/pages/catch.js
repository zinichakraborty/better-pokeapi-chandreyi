import axios from 'axios'
import useSWR from 'swr'
import Link from 'next/link'

let t = 255

let fetcher = async (url) => {
    const res = await axios.post(url, {
        pokemon: "pikachu",
        type: t
    })
    return res.data
}

export default function Battle() {
    const name = "pikachu"
    const { data, error, isLoading, isValidating } = useSWR(`/api/catch/`, fetcher)
    if (isLoading) return <div>Loading</div>
    if (!data) return (
        <>
            <Link href="/"><h1>Better PokeAPI</h1></Link>
            <h2>Must Implement your API. Data is empty</h2>
        </>
    )
    let { caught, color } = data

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
                </>
            )}

            <button onclick = "ball(255)">Poke Ball</button>
            <button onclick = "ball(200)">Great Ball</button>
            <button onclick = "ball(150)">Ultra Ball</button>
        </div>
    )

    function ball(val) {
        t = val
        Battle()
    }
}