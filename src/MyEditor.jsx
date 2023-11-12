import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Editor } from '@monaco-editor/react'
import { Button, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'

function MyEditor(props) {
    const [lang, setLang] = useState('python');
    const [theme, setTheme] = useState('vs-dark')

    const onLangChange = (event) => {
        setLang(event.target.value)
    }

    const onThemeChange = (event) => {
        setTheme(event.target.value)
    }

    return (
        <div className={'MyEditor' + (props.blur ? ' blurry' : '')} style={{
            margin: 20
        }}>
            <FormControl>
            <InputLabel>Language</InputLabel>
            <Select
                onChange={onLangChange}
                value={lang}
            >
                <MenuItem value={'python'}>Python</MenuItem>
                <MenuItem value={'javascript'}>JavaScript</MenuItem>
            </Select>
            
            </FormControl>
            <FormControl>
            <InputLabel>Theme</InputLabel>
            <Select
                onChange={onThemeChange}
                value={theme}
            >
                <MenuItem value={'vs-dark'}>VS Dark</MenuItem>
                <MenuItem value={'vs-light'}>VS Light</MenuItem>
            </Select>
            
            </FormControl>
            {props.blur ? <Button>COMPILE</Button> : <></>}
            <Editor
                width={'40vw'}
                height={'70vh'}
                theme={theme}
                language={lang}
                options={{readOnly: props.blur}}
                value={props.blur ? "Text can't be read" : ""}
            />
        </div>
    )
}

export default MyEditor