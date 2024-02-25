import * as Yup from "yup";

export const LogInSchema = Yup.object().shape({
  email: Yup.string()
    .email("You need to enter e-mail")
    .required("You need to enter e-mail"),
  password: Yup.string().min(5, "Too Short!").required("Required"),
});
