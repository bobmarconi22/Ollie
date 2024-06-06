import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { searchThunk } from "../../redux/sitter"
import './Navigation.css'

function SearchBar() {
const [search, setSearch] = useState('')
const [showFilters, setShowFilters] = useState('')
const [ratingSearch, setRatingSearch] = useState(0)
const dispatch = useDispatch()
const navigate = useNavigate()

const changeShowFilters =() => {
    setShowFilters(true)
    setRatingSearch(0)
}

const handleSearch = async (e) => {
    e.preventDefault()
    await dispatch(searchThunk(search))
    const query = search.split(' ').join('+')
    navigate(`/?filter=${query}`)
}

    return (
        <form onSubmit={handleSearch}>
            <input type="search" placeholder="Search" value={search} id="search-bar" onFocus={changeShowFilters}
        onBlur={() => setShowFilters(false)} onChange={(e) => setSearch(e.target.value)} on onSubmit={handleSearch} style={{color: '#011a30'}}></input>
            <div className={showFilters ? "search-filters" : "search-filters-hidden"}>
                Search Filters Will Go Here!
            </div>
            <button>search</button>
        </form>

    )
}

export default SearchBar
