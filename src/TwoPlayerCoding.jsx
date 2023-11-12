import React from 'react';
import PlayerSection from './Playersection.jsx'; // Import PlayerSection component

function TwoPlayerCoding() {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
            {/* Player 1 Section */}
            <PlayerSection language="javascript" theme="vs-dark" playerNumber={1} isCurrentUser={true}/>

            {/* Player 2 Section */}
            <PlayerSection language="Python" theme="vs-dark" playerNumber={2}/>
        </div>
    );
}

export default TwoPlayerCoding;
