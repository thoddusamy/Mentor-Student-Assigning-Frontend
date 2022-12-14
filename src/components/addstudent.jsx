import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { api } from "./student";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

export const formValidationSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(1, "Need a longer name 😄"),

  surname: yup
    .string()
    .required("Surname is required")
    .min(1, "Need a longer surname 😄"),

  email: yup
    .string()
    .required("Email is required")
    .min(2, "Need a longer email 😄"),
});

export function AddStudents() {

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
    },
    validationSchema: formValidationSchema,
    onSubmit: (newdata) => addstudent(newdata),
  });

  const addstudent = async (newdata) => {
    try {
      await axios.post(`${api}`, [newdata])
      navigate("/students")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h4 className="add-student-centent">Add new student</h4>
      <form onSubmit={formik.handleSubmit}>
        <div className="form">
          <TextField
            label="Student Name"
            variant="standard"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && formik.errors.name}
            helperText={
              formik.touched.name && formik.errors.name
                ? formik.errors.name
                : ""
            }
          />
          <TextField
            label="Student Surname"
            id="surname"
            name="surname"
            value={formik.values.surname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="standard"
            error={formik.touched.surname && formik.errors.surname}
            helperText={
              formik.touched.surname && formik.errors.surname
                ? formik.errors.surname
                : ""
            }
          />
          <TextField
            label="Student Email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="standard"
            error={formik.touched.email && formik.errors.email}
            helperText={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""
            }
          />

          <Button variant="outlined" className="button" type="submit">
            Add Student
          </Button>
        </div>
      </form>
    </div>
  );
}
