import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Material UI
import { ThemeProvider } from '@mui/material/styles';

// pages
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import CreateEvent from './pages/CreateEvent';
import Friends from './pages/Friends';
import Groups from './pages/Groups';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Err from './pages/Err';

// components
import Navigation from './components/Navigation';

// theme
import Theme from './Theme';

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <Router>
        <Navigation/>
        <Routes>
          {/* Logged In */}
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/calendar" element={<Calendar/>}/>
          <Route path="/create-event" element={<CreateEvent/>}/>
          <Route path="/friends" element={<Friends/>}/>
          <Route path="/groups" element={<Groups/>}/>

          {/* Not Logged In */}
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="*" element={<Err/>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
