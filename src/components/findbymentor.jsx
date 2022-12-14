import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { mentorapi } from "./mentor";
import { api } from "./student";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

export default function FindByMentor({ color }) {
  const [mentors, setMentors] = useState([]);
  const [students, setStudents] = useState([]);
  const [filterStudents, setFilterStudents] = useState([]);

  const getMentors = async () => {
    try {
      let { data } = await axios.get(`${mentorapi}`)
      setMentors(data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMentors();
  }, []);

  const [mentorId, setMentorId] = useState("");
  const handleMentorChange = (e) => {
    setMentorId(e.target.value);
  };

  const getStudents = async () => {
    try {
      let { data } = await axios.get(`${api}`)
      setStudents(data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getStudents();
  }, []);


  const findByMentor = async () => {
    if (mentorId === "") {
      alert("please select a mentor");
    } else {
      setFilterStudents(students.filter((e) => e.mentorId === mentorId));
    }
  };

  const style = {
    fontFamily: 'Fuzzy Bubbles',
    letterSpacing: "1px",
  }

  return (
    <div style={{ marginTop: "90px" }}>
      <div className="findmentor-fromcontrol">
        <FormControl variant="standard">
          <InputLabel id="demo-simple-select-standard-label" style={style}>Select Mentor</InputLabel>
          <Select style={style}
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select"
            value={mentorId}
            label="Select Mentor"
            onChange={handleMentorChange}
          >
            {mentors.map((e, index) => (
              <MenuItem value={e.mentorId} key={index} style={style}>
                {e.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button style={style}
          id="findStudents"
          onClick={findByMentor}
          variant="outlined"
          ccolor="primary"
        >
          Find Students
        </Button>
      </div>

      {filterStudents.length !== 0 ? (
        <div className="table">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={style}>S.no</TableCell>
                  <TableCell style={style} align="center">Name</TableCell>

                  <TableCell style={style} align="center">Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filterStudents.map(
                  ({ name, surname, email, mentorId, _id }, index) => (
                    <FilterStudents
                      key={index}
                      name={name}
                      surname={surname}
                      email={email}
                      mentorid={mentorId}
                      color={color}
                      id={_id}
                      index={index}
                    />
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

function FilterStudents({ name, surname, email, color, index }) {
  const num = index + 1;
  const style = {
    fontFamily: 'Fuzzy Bubbles',
    letterSpacing: "1px",
  }
  return (
    <>
      <TableRow
        key={index}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell style={style} component="th" scope="row">
          {num}
        </TableCell>
        <TableCell style={style} align="center">{name + " " + surname}</TableCell>
        <TableCell style={style} align="center">{email}</TableCell>
      </TableRow>
    </>
  );
}
