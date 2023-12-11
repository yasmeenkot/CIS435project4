import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from './LoginPage';
import NewsPage from './NewsPage';
import AddUsersPage from './AddUsersPage';

function App() {
  const [user, setUser] = React.useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={setUser} />} />
        <Route path="/news/*" element={<NewsPage setUser={setUser} />} />
        <Route path="/addUsersPage" element={<AddUsersPage />} />
        <Route index element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
