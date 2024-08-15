import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Autocomplete, TextField, Button, Box, Typography } from '@mui/material';
import './App.css';

function App() {
  const [players, setPlayers] = useState(Array(22).fill(''));
  const [pitchReport, setPitchReport] = useState('');
  const [playerOptions, setPlayerOptions] = useState([]);

  useEffect(() => {
    const fetchPlayerOptions = async () => {
      try {
        // Replace with your actual API endpoint or CSV file path
        const response = await axios.get('/api/players');
        setPlayerOptions(response.data);
      } catch (error) {
        console.error('Error fetching player options:', error);
        // Fallback to placeholder data if fetch fails
        setPlayerOptions(['Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5']);
      }
    };

    fetchPlayerOptions();
  }, []);

  const handleSubmit = () => {
    console.log('Submitted players:', players);
    console.log('Pitch report:', pitchReport);
    // Here you would typically send this data to your backend
  };

  return (
    <div className="App">
      <Box sx={{ maxWidth: 800, margin: 'auto', padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Fantasy Cricket Team Selection
        </Typography>

        {players.map((player, index) => (
          <Autocomplete
            key={index}
            options={playerOptions}
            renderInput={(params) => <TextField {...params} label={`Player ${index + 1}`} margin="normal" />}
            value={player}
            onChange={(event, newValue) => {
              const newPlayers = [...players];
              newPlayers[index] = newValue;
              setPlayers(newPlayers);
            }}
          />
        ))}

        <TextField
          label="Pitch Report"
          multiline
          rows={4}
          value={pitchReport}
          onChange={(e) => setPitchReport(e.target.value)}
          fullWidth
          margin="normal"
        />

        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>
    </div>
  );
}

export default App;
