import React, { useState } from 'react';
import PlayerSection from './Playersection.jsx'; // Import PlayerSection component
import * as Y from "yjs"
import { useRef } from 'react';
import { WebrtcProvider } from 'y-webrtc';
import { MonacoBinding } from 'y-monaco';

function TwoPlayerCoding() {
    const editorRef = useRef(null);
    const editorRef2 = useRef(null);
    
    const [playerId, setPlayerId] = useState(1)


    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor
        const doc = new Y.Doc()
        const provider = new WebrtcProvider('room-' + '1', doc)
        const type = doc.getText('monaco')
        const binding = new MonacoBinding(type, editorRef.current.getModel(), new Set([editorRef.current]), provider.awareness);
        console.log(provider.awareness); 
    }

    const handleEditorDidMount2 = (editor, monaco) => {
        editorRef2.current = editor
        const doc = new Y.Doc()
        const provider = new WebrtcProvider('room-' + '2', doc)
        const type = doc.getText('monaco2')
        const binding = new MonacoBinding(type, editorRef2.current.getModel(), new Set([editorRef2.current]), provider.awareness);
        console.log(provider.awareness); 
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
            {/* Player 1 Section */}
            <PlayerSection language="javascript" theme="vs-dark" playerNumber={1} isCurrentUser={true} handleEditorDidMount={handleEditorDidMount}/>

            {/* Player 2 Section */}
            <PlayerSection language="Python" theme="vs-dark" playerNumber={2} handleEditorDidMount={handleEditorDidMount2}/>
        </div>
    );
}

export default TwoPlayerCoding;
