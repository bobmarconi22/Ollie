import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { searchThunk } from "../../redux/sitter"
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

import './Navigation.css'
import { BsShopWindow } from "react-icons/bs";

function SearchBar() {
const [search, setSearch] = useState('')
const [showFilters, setShowFilters] = useState('')
const [ratingSearch, setRatingSearch] = useState(0)
const dispatch = useDispatch()
const navigate = useNavigate()

const handleSearch = async (e) => {
    e.preventDefault()
    await dispatch(searchThunk(search))
    const query = search.split(' ').join('+')
    navigate(`/?filter=${query}`)
}

    return (
        <div id="search-section">

            <form onSubmit={handleSearch} className={showFilters ? "search-form" : "search-form-hidden"} >
                <input type="search" placeholder="Search" value={search} id="search-bar"
                onChange={(e) => setSearch(e.target.value)} on onSubmit={handleSearch} style={{color: '#011a30'}}></input>
                <button type="submit" id="submit-search-button">search</button>
                <button onClick={() => setShowFilters(prevFilter => !prevFilter)} id="open-search-button">{showFilters ? <FiChevronUp /> : <FiChevronDown />}</button>
            </form>
        </div>


    )
}

export default SearchBar
