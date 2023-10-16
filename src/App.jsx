import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
// Check local storage for saved values. If not present, default to '100'.
const initialWidth = localStorage.getItem('rectangleWidth') || '100';
const initialLength = localStorage.getItem('rectangleLength') || '100';
const initialZoom = localStorage.getItem('zoomLevel') ? parseFloat(localStorage.getItem('zoomLevel')) : 1;

// State for width and length.
const [width, setWidth] = useState(initialWidth);
const [length, setLength] = useState(initialLength);

// State for zoom.
const [zoom, setZoom] = useState(initialZoom);

// No need for the useEffect that loads values from local storage anymore since we already did it during initial state declaration.

// Save width and length values to local storage whenever they change.
useEffect(() => {
  localStorage.setItem('rectangleWidth', width);
  localStorage.setItem('rectangleLength', length);
  localStorage.setItem('zoomLevel', zoom.toString());
}, [width, length, zoom]);

return (
  <div className="app">
    <div className="control-section">
      <h2>Measurements</h2>
      {/* Zoom controls */}
      <button onClick={() => setZoom(prevZoom => Math.min(prevZoom + 0.1, 3))}>Zoom In</button>
      <button onClick={() => setZoom(prevZoom => Math.max(prevZoom - 0.1, 0.5))}>Zoom Out</button>
      <h3>Room:</h3>
      <div className="input-section">
        <div className="input-wrapper">
          <label htmlFor="width">Width (cm):</label>
          <input
            id="width"
            type="number"
            value={width}
            onChange={e => setWidth(Math.min(e.target.value, 1500))}
            placeholder="Width"
            max="1500"
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="length">Length (cm):</label>
          <input
            id="length"
            type="number"
            value={length}
            onChange={e => setLength(Math.min(e.target.value, 1500))}
            placeholder="Length"
            max="1500"
          />
        </div>
      </div>
    </div>
      
    <div className="rectangle-section">
      <div 
        className="rectangle-display"
        style={{
          transform: `translate(-50%, -50%) scale(${zoom})`
        }}
      >
        <div className="length-label">Room - {width} cm</div>
        <div
          className="rectangle"
          style={{
            width: `${width}px`,
            height: `${length}px`,
            border: '1px solid white',
          }}
        ></div>
        <div className="width-label">Room - {length} cm</div>
      </div>
    </div>
  </div>
);
}

export default App;