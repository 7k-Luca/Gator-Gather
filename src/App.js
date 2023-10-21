import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Material UI
import { ThemeProvider } from '@mui/material/styles';

// pages
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Err from './pages/Err';

// theme
import Theme from './Theme';

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <Router>
        <Routes>
          <Route path="/" exact element={<Dashboard/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Signup" element={<Signup/>}/>
          {/* 404 page */}
          <Route path="*" element={<Err/>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
