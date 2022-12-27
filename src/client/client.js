import React from "react";
import ReactDOM from 'react-dom/client';
import App from "./App";
import GdbModelLoader from './GdbModelLoader' 

const root = ReactDOM.createRoot(document.getElementById('approot'));
root.render(
    <React.StrictMode>
    <App/>
    </React.StrictMode>
);

const modelLoader = new GdbModelLoader('models/monkey.glb');
// const mesh = modelLoader.mesh;
// console.log('loadedgdb mesh: ', mesh);
// console.log('debug here');

