import React from 'react';

const Track = ({ track, handleAdd, handleRemove }) => {
    return (
        <div className='Track'>
            <h3>{track.title}</h3>
            <p>{track.artist} | {track.album}</p>
            {handleAdd && <h3 onClick={() => handleAdd(track)}>+</h3>}
            {handleRemove && <h3 onClick={() => handleRemove(track.id)}>-</h3>}
        </div>
    );
};

export default Track;