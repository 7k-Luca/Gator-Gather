import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Material UI
import { ThemeProvider, styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

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
  // Allows the visibility of Main Content away from the sidebar and appbar
  const MainContent = styled(Box)({
    flexGrow: 1,
    padding: Theme.spacing(3),
    marginTop: 64,
    marginLeft: 175,
  });

  return (
    <ThemeProvider theme={Theme}>
      <Router>
      <CssBaseline />
        <Navigation/>
        <MainContent>
        <Routes>
          {/* Logged In */}
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/calendar" element={<Calendar/>}/>
          <Route path="/create-event" element={<CreateEvent/>}/>
          <Route path="/friends" element={<Friends/>}/>
          <Route path="/groups" element={<Groups/>}/>
          <Route path="*" element={<Err/>} />

          {/* Not Logged In */}
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
              
          </Routes>
        </MainContent>
      </Router>
      
    </ThemeProvider>
  );
}

export default App;
