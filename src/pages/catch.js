import axios from 'axios'
import useSWR from 'swr'
import Link from 'next/link'

const fetcher = async (url) => {
    const res = await axios.post(url, {
        pokemon: "pikachu"
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
    let { caught } = data

    return (
        <>
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
        </>
    )
}