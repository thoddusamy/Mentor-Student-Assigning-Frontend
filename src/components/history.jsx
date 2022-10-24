import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Tooltip from "@mui/material/Tooltip";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

export const api =
  "https://mentor-student-assigning.herokuapp.com/students";

export function History() {
  const [students, setStudents] = useState([]);

  const getStudents = async () => {
    try {
      let { data } = await axios.get(`${api}`)
      setStudents(data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudents()
  }, []);

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`${api}/${id}`)
      getStudents()
    } catch (error) {
      console.log(error);
    }
  };

  const style = {
    fontFamily: "Fuzzy Bubbles",
    letterSpacing: "1px",
    fontWeight: "900",
  };

  return (
    <div className="table">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={style}>S.no</TableCell>
              <TableCell align="center" style={style}>
                Name
              </TableCell>
              <TableCell align="center" style={style}>
                Surname
              </TableCell>
              <TableCell align="center" style={style}>
                Email
              </TableCell>
              <TableCell align="center" style={style}>
                Mentor
              </TableCell>
              <TableCell align="center" style={style}>
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map(({ name, surname, email, mentorId, _id }, index) => (
              <Student
                key={index}
                name={name}
                surname={surname}
                email={email}
                mentorid={mentorId}
                // delete
                deleteButton={
                  <Tooltip title="Delete">
                    <IconButton
                      aria-label="delete"
                      style={{ marginLeft: "auto" }}
                      onClick={() => {
                        deleteStudent(_id);
                      }}
                      color="error"
                    >
                      <DeleteOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                }
                id={_id}
                index={index}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

function Student({ name, surname, email, mentorid, deleteButton, index }) {
  const style = {
    fontFamily: "Fuzzy Bubbles",
    letterSpacing: "2px",
    fontWeight: "600",
  };
  const num = index + 1;

  const mentorapi =
    "https://mentor-student-assigning.herokuapp.com/mentors";

  const [mentor, setMentor] = useState([]);

  const getMentors = async () => {
    try {
      let { data } = await axios.get(`${mentorapi}`)
      setMentor(data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMentors()
  }, []);

  const mentorname = mentor
    .filter((mentor) => mentor.mentorId === mentorid)
    .map((mentor) => mentor.name);

  return (
    <>
      <TableRow
        key={index}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell style={style} component="th" scope="row">
          {num}
        </TableCell>
        <TableCell style={style} align="center">
          {name}
        </TableCell>
        <TableCell style={style} align="center">
          {surname}
        </TableCell>
        <TableCell style={style} align="center">
          {email}
        </TableCell>
        <TableCell style={style} align="center">
          {mentorname.length !== 0 ? mentorname : "Mentor not assigned"}
        </TableCell>
        <TableCell style={style} align="center">
          {deleteButton}
        </TableCell>
      </TableRow>
    </>
  );
}
