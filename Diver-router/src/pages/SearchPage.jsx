/* eslint-disable react/prop-types */
import { useEffect } from "react"

const SearchPage = ({ routerParams }) => {

    useEffect(() => {
        document.title = `Has Buscando ${routerParams.query}`
    }, [])

    return (
        <h1> has buscado {routerParams.query} </h1>
    )
}
export default SearchPage
