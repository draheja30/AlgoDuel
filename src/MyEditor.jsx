import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Editor } from '@monaco-editor/react'
import { Button, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'

function MyEditor({onChange, code, blur}) {
    const [lang, setLang] = useState('python');
    const [theme, setTheme] = useState('vs-dark')
    const [value, setValue] = useState(code || "")

    const onLangChange = (event) => {
        setLang(event.target.value)
    }

    const onThemeChange = (event) => {
        setTheme(event.target.value)
    }

    const handleEditorChange = (value) => {
        setValue(value);
        onChange("code", value);
      };

    return (
        <div className={'MyEditor' + (blur ? ' blurry' : '')} style={{
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
            {blur ? <></> : <Button>COMPILE</Button>}
            <Editor
                width={'40vw'}
                height={'70vh'}
                theme={theme}
                language={lang}
                options={{readOnly: blur}}
                value={value}
            />
        </div>
    )
}

export default MyEditor