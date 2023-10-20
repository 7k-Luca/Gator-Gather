import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// pages
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Err from './pages/Err'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Dashboard/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Signup" element={<Signup/>}/>
        {/* 404 page */}
        <Route path="*" element={<Err/>} />
      </Routes>
    </Router>
  );
}

export default App;
