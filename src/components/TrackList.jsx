import React from 'react';
import Track from './Track';

const TrackList = ({ trackList, handleAdd, handleRemove }) => {
    return (
        <div className="TrackList">
            {trackList.map(track => (
                <Track key={track.title+track.artist} track={track} handleAdd={handleAdd} handleRemove={handleRemove} />
            ))}
        </div>
    );
};

export default TrackList;