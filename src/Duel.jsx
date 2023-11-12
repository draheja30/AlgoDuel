import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Editor } from '@monaco-editor/react'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import MyEditor from './MyEditor.jsx'

function Duel() {

    return (
        <div className='Duel' style={{display: 'flex'}}>
            <MyEditor/>
            <MyEditor blur={true} ></MyEditor>
        </div>
    )
}

export default Duel