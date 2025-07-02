import React from 'react';
import TrackList from './TrackList';

const SearchResults = ({ trackList, handleAdd }) => {
    return (
        <div>
            <h2>Results</h2>
            <TrackList trackList={trackList} handleAdd={handleAdd} />
        </div>
    );
};

export default SearchResults;