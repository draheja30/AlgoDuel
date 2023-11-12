import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Editor } from '@monaco-editor/react'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import MyEditor from './MyEditor.jsx'

function Duel() {

    return (
        <div className='Duel'>
            <div style={{display: 'flex'}}>
                <MyEditor blur={false}/>
                <MyEditor code={"Code can't see"} blur={true} ></MyEditor>
            </div>
            <div style={{display: 'flex'}}>
                <Editor
                    height={'20vh'}
                    width={'40vw'}
                    options={{readOnly: true}}
                />
                <Editor
                    height={'20vh'}
                    width={'40vw'}
                    options={{readOnly: true}}
                />
            </div>
        </div>
    )
}

export default Duel