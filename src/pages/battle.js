import axios from 'axios'
import useSWR from 'swr'
import Link from 'next/link'

const p1 = "mewtwo"
const p2 = "lucario"

const fetcher = async (url) => {
    const res = await axios.post(url, {
        pokemon1: p1,
        pokemon2: p2
    })
    return res.data
}

export default function Battle() {
    const { data, error, isLoading, isValidating } = useSWR(`/api/battle/`, fetcher)
    if (isLoading) return <div><h2>Loading</h2></div>
    if (!data) return (
        <>
            <Link href="/"><h1>Better PokeAPI</h1></Link>
            <h2>Must Implement your API. Data is empty</h2>
        </>
    )
    let { winner, color, winsprite } = data

    return (
        <div style={{backgroundColor: `${color}`}}>
            <Link href="/"><h1>Better PokeAPI</h1></Link>
            <h2>Battle: {p1} vs. {p2}</h2>

            {isValidating ? (
                <h2>Validating</h2>
            ) : (
                <>
                    <h2>Winner: {winner}</h2>
                    <img src={winsprite} />
                </>
            )}
        </div>
    )
}