import * as Yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("You need to enter e-mail"),
  password: Yup.string()
    .min(5, "Too Short!")
    .required("Required")
    .matches(passwordRules, {
      message:
        "Please enter at least 1 uppercase letter, 1 lowercase letter and 1 number",
    }),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Different Passwords")
    .required("Required"),
});
