import React, {useState} from 'react';
import SearchBar from './components/SearchBar';
import PlayList from './components/PlayList';
import SearchResults from './components/SearchResults';

const App = () => {
    const [searchString, setSearchString] = useState('');

    function handleSearch(event) {
        setSearchString(event.target.value);
    }

    const [searchResults, setSearchResults] = useState([]);
    function handleSearchResults(results) {
        setSearchResults(results);
    }

    const [playlist, setPlaylist] = useState([]);
    function handleAdd(track) {
        // Check if the track is already in the playlist
        const isTrackInPlaylist = playlist.some(item => item.id === track.id);
        if (isTrackInPlaylist) alert('Track is already in the playlist');
        else setPlaylist((prevPlaylist) => [...prevPlaylist, track]);
    }
    function handleRemove(trackId) {
        setPlaylist((prevPlaylist) => prevPlaylist.filter(item => item.id !== trackId));
    }

    return (
        <div>
            <h1>Jamming App</h1>
            <SearchBar search={searchString} handleSearch={handleSearch} handleSearchResults={handleSearchResults} />
            <SearchResults trackList={searchResults} handleAdd={handleAdd} />
            <PlayList trackList={playlist} handleRemove={handleRemove} />
        </div>
    );
};

export default App;