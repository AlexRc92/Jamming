import React, {useState} from 'react';
import TrackList from './TrackList';

const PlayList = ({trackList, handleRemove}) => {
   const [playlistName, setPlaylistName] = useState('');

const savePlaylistToSpotify = async (playlistName, trackList) => {
    const accessToken = localStorage.getItem('spotify_access_token');
    if (!accessToken) {
        alert('Spotify access token not found.');
        return;
    }

    try {
        // Get current user's ID
        const userResponse = await fetch('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const userData = await userResponse.json();
        const userId = userData.id;

        // Create a new playlist
        const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: playlistName,
                public: false,
            }),
        });
        const playlistData = await playlistResponse.json();
        const playlistId = playlistData.id;

        // Add tracks to the playlist
        const trackUris = trackList.map(track => track.uri);
        await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uris: trackUris,
            }),
        });

        alert('Playlist saved to Spotify!');
    } catch (error) {
        console.error('Error saving playlist:', error);
        alert('Failed to save playlist.');
    }
};
   return (
        <div>
            <h2>PlayList</h2>
            <input type="text" value={playlistName} onChange={(e) => setPlaylistName(e.target.value)} placeholder="Enter a playlist name" />
            <TrackList trackList={trackList} handleRemove={handleRemove} />
            <button>Save to Spotify</button>
        </div>
    );
};

export default PlayList;