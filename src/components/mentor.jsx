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
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import axios from 'axios'

export const mentorapi =
  "http://localhost:6010/mentors";

export function Mentors() {

  const navigate = useNavigate();

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

  const deleteMentor = async (id) => {
    try {
      await axios.delete(`${mentorapi}/${id}`)
      getMentors()
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
                Email
              </TableCell>
              <TableCell align="center" style={style}>
                MentorId
              </TableCell>

              <TableCell align="center" style={style}>
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mentor.map(({ name, email, mentorId, _id }, index) => (
              <Mentor
                key={index}
                name={name}
                email={email}
                mentorid={mentorId}
                // delete
                deleteButton={
                  <Tooltip title="Delete">
                    <IconButton
                      aria-label="delete"
                      style={{ marginLeft: "auto" }}
                      onClick={() => {
                        deleteMentor(_id);
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
      <div className="add-btn">
        <Button
          style={style}
          variant="outlined"
          type="submit"
          onClick={() => navigate(`/mentors/add`)}
        >
          Add Mentor
        </Button>
      </div>
    </div>
  );
}

function Mentor({ name, email, mentorid, deleteButton, index }) {
  const style = {
    fontFamily: "Fuzzy Bubbles",
    letterSpacing: "2px",
  };
  const num = index + 1;

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
          {email}
        </TableCell>
        <TableCell style={style} align="center">
          {mentorid}
        </TableCell>
        <TableCell style={style} align="center">
          {deleteButton}
        </TableCell>
      </TableRow>
    </>
  );
}
