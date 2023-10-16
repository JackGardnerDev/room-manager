import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
// Check local storage for saved values. If not present, default to '100'.
const initialWidth = localStorage.getItem('rectangleWidth') || '100';
const initialLength = localStorage.getItem('rectangleLength') || '100';
const initialZoom = localStorage.getItem('zoomLevel') ? parseFloat(localStorage.getItem('zoomLevel')) : 1;

// State for width and length, zoom and furniture.
const [width, setWidth] = useState(initialWidth);
const [length, setLength] = useState(initialLength);
const [zoom, setZoom] = useState(initialZoom);
// const [furniture, setFurniture] = useState([]);

const initialFurniture = JSON.parse(localStorage.getItem('furnitureData')) || [];
const [furniture, setFurniture] = useState(initialFurniture);

// Save width and length values to local storage whenever they change.
useEffect(() => {
  localStorage.setItem('rectangleWidth', width);
  localStorage.setItem('rectangleLength', length);
  localStorage.setItem('zoomLevel', zoom.toString());
  localStorage.setItem('furnitureData', JSON.stringify(furniture));
}, [width, length, zoom, furniture]);

const addFurniture = () => {
  const newFurniture = { id: Date.now(), name: '', length: '', width: '' };
  setFurniture([...furniture, newFurniture]);
};

const updateFurniture = (id, field, value) => {
  setFurniture(furniture.map(item => item.id === id ? { ...item, [field]: value } : item));
};

const removeFurniture = (id) => {
  setFurniture(furniture.filter(item => item.id !== id));
};

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
              onChange={e => setWidth(Math.min(e.target.value, 1750))}
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
              onChange={e => setLength(Math.min(e.target.value, 1750))}
              placeholder="Length"
              max="1500"
            />
          </div>
        </div>

        <h3>Furniture</h3>
          <button onClick={addFurniture}>+</button>
          {furniture.map(item => (
            <div key={item.id} className="furniture-section">
              <div className="name-input-group">
                {/* <div className="input-wrapper">
                  <label htmlFor={`name-${item.id}`}>Name:</label>
                  <input 
                    id={`name-${item.id}`}
                    placeholder="Name"
                    value={item.name}
                    onChange={(e) => updateFurniture(item.id, 'name', e.target.value)}
                  />
                </div> */}
                <div className="input-wrapper standard-input">
                  <label htmlFor={`name-${item.id}`}>Name:</label>
                  <input 
                    id={`name-${item.id}`}
                    placeholder="Name"
                    value={item.name}
                    onChange={(e) => updateFurniture(item.id, 'name', e.target.value)}
                  />
                </div>

                <button className="remove-button" onClick={() => removeFurniture(item.id)}>-</button>
              </div>
              <div className="dimension-input-group">
                <div className="input-wrapper">
                  <label htmlFor={`length-${item.id}`}>Length (cm):</label>
                  <input 
                    id={`length-${item.id}`}
                    type="number"
                    placeholder="Length"
                    value={item.length}
                    onChange={(e) => updateFurniture(item.id, 'length', e.target.value)}
                  />
                </div>
                <div className="input-wrapper">
                  <label htmlFor={`width-${item.id}`}>Width (cm):</label>
                  <input 
                    id={`width-${item.id}`}
                    type="number"
                    placeholder="Width"
                    value={item.width}
                    onChange={(e) => updateFurniture(item.id, 'width', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}

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