import { useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { searchThunk } from "../../redux/sitter"
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import "./LandingPage.css";

function SearchBar() {
    const [search, setSearch] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [ratingSearch, setRatingSearch] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [triggerSearch, setTriggerSearch] = useState(false);

    const handleSearch = useCallback(async (e) => {
      if (e) e.preventDefault();
      const query = new URLSearchParams();
      if (search) query.set('filter', search.split(' ').join('+'));
      if (ratingSearch > 0) query.set('rating', ratingSearch);
      navigate(`/?${query.toString()}`);
      await dispatch(searchThunk(search, ratingSearch));
    }, [search, ratingSearch, navigate, dispatch]);


    const clearAll = async (e) => {
      e.preventDefault();
      setSearch('');
      setRatingSearch(0);
      setTriggerSearch(true);
    };

    useEffect(() => {
      if (triggerSearch) {
        handleSearch();
        setTriggerSearch(false);
      }
    }, [triggerSearch, handleSearch]);

    return (
      <div id="search-section">
        <form onSubmit={handleSearch} className={showFilters ? "search-form" : "search-form-hidden"}>
          <input
            type="search"
            placeholder="Search by Name or Username"
            value={search}
            id="search-bar"
            onChange={(e) => setSearch(e.target.value)}
            style={{ color: '#011a30' }}
            disabled={!showFilters}
          />
          <label className="rating-label">
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((value) => (
                <span key={value} disabled={!showFilters} onClick={() => setRatingSearch(value)}>
                  <i
                    className="fa-solid fa-paw filled"
                    style={{
                      fontSize: "30px",
                      margin: "2.5px",
                      color:
                        value >= ratingSearch
                          ? "#209c85"
                          : "rgba(255, 255, 255, 0.75)",
                      cursor: 'pointer',
                      opacity: showFilters
                          ? "1"
                          : "0",
                      transition: 'opacity 0.5s ease',
                    }}
                  ></i>
                </span>
              ))}
            </div>
          </label>
          <button type="submit" id="submit-search-button" disabled={!showFilters}>Apply Filters</button>
          <button id="clear-search-button" onClick={clearAll}>Clear All Filters</button>
          <button onClick={() => setShowFilters(prevFilter => !prevFilter)} id="open-search-button" style={{cursor: 'pointer'}}>
            {showFilters ? (
            <>
            <i style={{cursor: 'pointer'}}>Search</i><FiChevronUp style={{position: 'absolute', cursor: 'pointer'}} />
            </>)
            : (
            <>
           <i style={{cursor: 'pointer'}}>Search</i><FiChevronDown style={{position: 'absolute', cursor: 'pointer'}} />
           </>
           )}
          </button>
        </form>
      </div>
    );
  }

export default SearchBar
