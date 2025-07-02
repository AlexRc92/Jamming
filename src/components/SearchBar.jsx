import React from 'react';

const SearchBar = ({search, handleSearch, handleSearchResults}) => {
    const fetchTracks = async (searchString) => {
        try {
            const response = await fetch(`https://api.spotify.com/v1/search?q=${searchString}&type=track`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('spotify_access_token')}`,
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            //we map the data to a simpler format
            const simpleTracks = data.tracks.items.map(track => {
                return {
                    id: track.id,
                    title: track.name || 'Unknown Title',
                    artists: track.artists.map(artist => artist.name) || ['Unknown Artist'],
                    album: track.album.name || { name: 'Unknown Album' }
                }
            });
            return simpleTracks;
        } catch (error) {
            console.error('Error fetching tracks:', error);
            return [];
        }
    };

    return (
        <div className="SearchBar">
            <input type="text" value={search} onChange={(e) => handleSearch(e)} />
            <button onClick={() => fetchTracks(search).then(tracks => {
                handleSearchResults(tracks);
            })}>Search</button>
        </div>
    );
};

export default SearchBar;