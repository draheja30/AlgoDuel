import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Editor } from '@monaco-editor/react'
import { Button, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'

function TheirEditor(props) {
    const [lang, setLang] = useState('python');
    const [theme, setTheme] = useState('vs-dark')

    const onLangChange = (event) => {
        setLang(event.target.value)
    }

    const onThemeChange = (event) => {
        setTheme(event.target.value)
    }

    return (
        <div className={'TheirEditor' + ' blur'} style={{
            margin: 20
        }}>            
            <Editor
                width={'40vw'}
                height={'70vh'}
                theme={theme}
                language={lang}
                options={{readOnly: props.blur}}
                value={"Some text"}
            />
        </div>
    )
}

export default TheirEditor