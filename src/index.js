import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { database } from './db'

export const Context = createContext(null)

const firestore = database.firestore()

ReactDOM.render(
  <React.StrictMode>
    <Context.Provider value={firestore}>
      <App />
    </Context.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
