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

// auth context
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { authIsReady, user } = useAuthContext();

  // Allows the visibility of Main Content away from the sidebar and appbar
  const MainContent = styled(Box)({
    flexGrow: 1,
    padding: Theme.spacing(3),
    marginTop: 64,
    marginLeft: 175,
  });

  return (
    <ThemeProvider theme={Theme}>
      {authIsReady && (
      <Router>
      <CssBaseline />
          {/* Logged In */}
          {user && (
            <Routes>
            <Navigation/>
              <MainContent>
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/calendar" element={<Calendar/>}/>
              <Route path="/create-event" element={<CreateEvent/>}/>
              <Route path="/friends" element={<Friends/>}/>
              <Route path="/groups" element={<Groups/>}/>
              <Route path="*" element={<Err/>} />
              </MainContent>
            </Routes>
          )}
          

          {/* Not Logged In */}
          {!user && (
            <Routes>
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="*" element={<Signup/>}/>
            </Routes>
          )}
      </Router>
      )}
    </ThemeProvider>
  );
}

export default App;
