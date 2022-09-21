import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

const persons = [
  { name: 'Garien Agapito', number: '626-720-7984', id: 1 },
  { name: 'Cameron Agapito', number: '626-792-4113', id: 2 },
  { name: 'Killa Grr', number: '323-979-6880', id: 3 },
  { name: 'John Doe', number: '123-456-7890', id: 4 }
]

ReactDOM.createRoot(document.getElementById('root')).render(<App persons={persons}/>)