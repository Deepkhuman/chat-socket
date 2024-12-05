import * as Yup from "yup";

const loginschema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(15, "Password must not exceed 15 characters")
    .required("Password is required"),
});

const signupschema = Yup.object().shape({
  firstname: Yup.string()
    .required("Firstname is required")
    .min(3, "Minimun 3 Character Required!!"),
  lastname: Yup.string()
    .min(3, "Minimun 3 Character Required!!")
    .required("Lastname is required"),
  company: Yup.string()
    .min(3, "Minimun 3 Character Required!!")
    .max(20, "Maximum 20 Character Allowed")
    .required("Company name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(15, "Password must not exceed 15 characters")
    .required("Password is required"),
});

export { loginschema, signupschema };
