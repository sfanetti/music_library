import { createContext, useEffect, useState } from "react";

const MUSIC_DATA = {
    setSearch: () => {},
    search: '',
    message: 'Search for Music!',
    data:[]
};

export const MusicContext = createContext(MUSIC_DATA);

export default function MusicProvider({children}) {
    let [search, setSearch] = useState(MUSIC_DATA.search);
    let [message, setMessage] = useState(MUSIC_DATA.message);
    let [data, setData] = useState(MUSIC_DATA.data);

    useEffect(() => {
        const fetchData = async () => {
            setMessage('');
            document.title = `${search} Music`;
            try {
                const response = await fetch(`https://itunes.apple.com/search?term=${search.toUpperCase()}`);
                const resData = await response.json();
                if (resData.results.length > 0) {
                    setData(resData.results);
                } else {
                    setMessage('No Songs Found');
                    setData([]);
                }
            } catch (e) {
                setMessage('An error occurred.  Please try again');
                setData([]);
            }
        }
        if (search) {
            fetchData();
        } else {
            clearSearch();
        }
    }, [search]);

    function clearSearch() {
        setSearch('');
        setData([]);
        setMessage('');
    }

    return (
        <MusicContext.Provider value={{...MUSIC_DATA, search, message, data, setSearch, clearSearch}}>
            {children}
        </MusicContext.Provider>
    );
}