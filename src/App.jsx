import { useState, Fragment } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import { History } from "./components/history";
import { Students } from "./components/student";
import { Mentors } from "./components/mentor";
import { AddStudents } from "./components/addstudent";
import { Addmentor } from "./components/addmentor";
import ChangeMentor from "./components/changeMentor";
import AssignMentor from "./components/assignMentor";
import FindByMentor from "./components/findbymentor";
import Home from "./components/home";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import TimelineIcon from "@mui/icons-material/Timeline";

export default function App() {

  const navigate = useNavigate()

  const [mode, setMode] = useState("dark");
  const [color, setColor] = useState("white");
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const style = {
    fontFamily: 'Fuzzy Bubbles',
    letterSpacing: "1px",
  }

  // drawer
  const array = [
    {
      name: <div className="drawer-name">Home</div>,
      onClick: "/",
      icon: <HomeIcon />,
    },
    {
      name: <div className="drawer-name">students</div>,
      onClick: "/students",
      icon: <PeopleIcon />,
    },
    {
      name: <div className="drawer-name">Add-student</div>,
      onClick: "/students/add",
      icon: <GroupAddIcon />,
    },
    {
      name: <div className="drawer-name">mentors</div>,
      onClick: "/mentors",
      icon: <AccountCircleIcon />,
    },
    {
      name: <div className="drawer-name">Add-Mentor</div>,
      onClick: "/mentors/add",
      icon: <AddBoxIcon />,
    },
    {
      name: <div className="drawer-name">Change-mentor</div>,
      onClick: "/students/change-mentor",
      icon: <ChangeCircleIcon />,
    },
    {
      name: <div className="drawer-name">Assign-mentor</div>,
      onClick: "/students/assign-mentor",
      icon: <AssignmentTurnedInIcon />,
    },
    {
      name: <div className="drawer-name">Findby-mentor</div>,
      onClick: "/findbymentor",
      icon: <PersonSearchIcon />,
    },
    {
      name: <div className="drawer-name">OverAll-view</div>,
      onClick: "/history",
      icon: <TimelineIcon />,
    },
  ];

  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {array.map(({ name, onClick, icon }, index) => (
          <ListItem
            button
            key={index}
            onClick={() => {
              navigate(onClick);
            }}
          >
            <ListItemText color="success" primary={name} />
            {icon}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={4} style={{ borderRadius: "0px", minHeight: "100vh" }}>
        <div className="App">
          <AppBar position="static">
            <Toolbar>
              {["left"].map((anchor) => (
                <Fragment key={anchor}>
                  <Button color="inherit" onClick={toggleDrawer(anchor, true)}>
                    <div className="drawer-icon" style={style}>
                      <MenuIcon />
                      Menu
                    </div>
                  </Button>
                  <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                  >
                    {list(anchor)}
                  </Drawer>
                </Fragment>
              ))}

              {/* light and dark mode logic */}
              <Button
                color="inherit"
                style={{ marginLeft: "auto", fontFamily: "Fuzzy Bubbles" }}
                startIcon={
                  mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />
                }
                onClick={() => {
                  setMode(mode === "light" ? "dark" : "light");
                  setColor(mode === "dark" ? "black" : "white");
                }}
              >
                {mode === "light" ? "dark" : "light"}
              </Button>
            </Toolbar>
          </AppBar>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/students" element={<Students />} />
            <Route path="/students/add" element={<AddStudents />} />
            <Route path="/mentors" element={<Mentors />} />
            <Route path="/mentors/add" element={<Addmentor />} />
            <Route path="/students/change-mentor" element={<ChangeMentor color={color} />} />
            <Route path="/students/assign-mentor" element={<AssignMentor color={color} />} />
            <Route path="/findbymentor" element={<FindByMentor color={color} />} />
            <Route path="/history" element={<History />} />
            <Route path="**">404</Route>
          </Routes>
        </div>
      </Paper>
    </ThemeProvider>
  );
}
