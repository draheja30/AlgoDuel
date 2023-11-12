import React, { useState, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import { FormControl, InputLabel, Select, MenuItem, Paper, Button } from '@material-ui/core';


const PlayerSection = ({ playerNumber, isCurrentUser }) => {
    const [language, setLanguage] = useState('Javascript');
    const [theme, setTheme] = useState('vs-dark');
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');

    const [showWinScreen, setShowWinScreen] = useState(false);

    const winScreen = (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000, // Ensure it's above everything else
            fontSize: '40px'
        }}>
            Player {playerNumber} Wins!
        </div>
    );

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    const handleThemeChange = (event) => {
        setTheme(event.target.value);
    };

    const handleEditorChange = (value) => {
        setCode(value);
    };

    const handleSubmit = async () => {
        // initProblem() // Move to 
        try {
            const response = await fetch('http://localhost:3001/run-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ language, code }),
            });
            const result = await response.json();
            setOutput(`Output:\n${result.stdout}`);
            console.log(result.stdout);
            // Updated condition to check if the output includes '[0,1]'
            if (result.stdout === "[ 0, 1 ]\n") {
                console.log('Player 1 wins!');
                setShowWinScreen(true);
            }
        } catch (error) {
            console.error('Error executing code: ', error);
            setOutput('Error executing code');
        }
    };
    

    const editorClassName = isCurrentUser ? '' : 'blurry'; 
    return (
      <Paper
        style={{
          flex: 1,
          margin: "10px",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div
          className={editorClassName}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
            borderBottom: "1px solid #ddd",
            backgroundColor: "#f5f5f5",
          }}
        >
          <div style={{ display: "flex" }}>
            <FormControl style={{ marginRight: "20px", minWidth: "120px" }}>
              <InputLabel shrink>{`Language`}</InputLabel>
              <Select value={language} onChange={handleLanguageChange}>
                <MenuItem value="Javascript">JavaScript</MenuItem>
                <MenuItem value="Python">Python</MenuItem>
              </Select>
            </FormControl>
            <FormControl style={{ marginRight: "20px", minWidth: "120px" }}>
              <InputLabel shrink>{`Theme`}</InputLabel>
              <Select value={theme} onChange={handleThemeChange}>
                <MenuItem value="vs-dark">VS Dark</MenuItem>
                <MenuItem value="vs-light">VS Light</MenuItem>
              </Select>
            </FormControl>
          </div>
          {isCurrentUser && (
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Submit
            </Button>
          )}
        </div>
        <div
          className={editorClassName}
          style={{ position: "relative", flex: 1 }}
        >
          <Editor
            height="70vh"
            width="100%"
            language={language.toLowerCase()}
            theme={theme}
            options={{ readOnly: !isCurrentUser }}
            onChange={handleEditorChange}
            value={`/**
* Given an array of integers nums and an integer target,
* return indices of the two numbers such that they add up to target.
*
* @param {number[]} nums
* @param {number} target
* @return {number[]}
*/

function twoSum(nums, target) {
    // Write your code here
}

function test() {
    console.log(twoSum([2, 7, 11, 15], 9));
}
test();

`}
          />
        </div>
        <div
          style={{
            height: "20vh",
            backgroundColor: "#1e1e1e",
            color: "grey",
            padding: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            opacity: 0.8,
          }}
        >
          <p>{output ? output : `Player ${playerNumber}`}</p>
        </div>
        {showWinScreen && winScreen}
      </Paper>
    );
};

export default PlayerSection;
