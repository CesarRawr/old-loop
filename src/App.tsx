import React from 'react';
import {Main, Login} from './pages';
import Dialog from './features/dialog/Dialog';

import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Main />} />
        <Route path="list" element={<Login />} />
        <Route path="login" element={<p>Lista</p>} />
        <Route path="admin" element={<p>Admin</p>} />
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>

      {/*Dialogo global*/}
      <Dialog />
    </div>
  );
}

export default App;
