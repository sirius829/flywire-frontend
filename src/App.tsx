import { ChangeEvent, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import EmployeeList from './components/EmployeeList';
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import './App.css';
import EmployeeDetails from './components/EmployeeDetails';
import EmployeeListByRange from './components/EmployeeListByRange';

function App() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    switch (window.location.pathname) {
      case '/':
        setValue(0);
        break;
      case '/range':
        setValue(1);
        break;
      default:
        setValue(2);
        break;
    }
  }, []);
  
  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Router>
      <div className="App">
        <AppBar position="sticky">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6">
              <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                Flywire Employee Directory
              </Link>
            </Typography>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="inherit"
              indicatorColor="secondary"
            >
              <Tab label="Active Employees" component={Link} to="/" />
              <Tab label="Active Employees in range" component={Link} to="/range" />
            </Tabs>
          </Toolbar>
        </AppBar>
        <Container>
          <Routes>
            <Route path="/" element={<EmployeeList />} />
            <Route path="/range" element={<EmployeeListByRange />} />
            <Route path="/employee/:id" element={<EmployeeDetails />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
