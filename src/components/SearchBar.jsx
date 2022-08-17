import { useContext, useState, useEffect } from "react"
import { MusicContext } from "../providers/MusicProvider";

function SearchBar({ debounceTime = 800 }) {
    const {setSearch, search} = useContext(MusicContext);

    let [searchTerm, setSearchTerm] = useState(search);
    let [debounceTimer, setDebounce] = useState();

    function onSubmit(e) {
        e.preventDefault();
        setSearch(searchTerm)
    }

    useEffect(() => {
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }
        const timer = setTimeout(() => {
            setSearch(searchTerm)
        }, debounceTime);
        setDebounce(timer);
        return () => {
            clearTimeout(debounceTimer);
        }
        // eslint-disable-next-line
    }, [searchTerm, debounceTime]);

    return (
        <form className="search-bar" onSubmit={onSubmit}>
            <input type="text" 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Enter a search term here" />
            <button type="submit">Search</button>
        </form>
    )
}

export default SearchBar
    