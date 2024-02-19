import React from "react";
import { useFormik } from "formik";
import {
  Card,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Center,
  Button,
} from "@chakra-ui/react";
import { SignupSchema } from "../../Pages/Auth/validations";
function Signin() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Center>
      <Card w="50%" minW="300px" padding="15px" margin="50px">
        <h1
          style={{ fontWeight: "800", fontSize: "20px", textAlign: "center" }}
        >
          Sign In
        </h1>

        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>Email Address</FormLabel>
            <Input
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="Enter your e-mail address"
            />
            {formik.errors.email && formik.touched.email && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formik.errors.email}
              </p>
            )}
            <FormHelperText>We'll never share your email.</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Set your Password</FormLabel>
            <Input
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Repeat your Password</FormLabel>
            <Input
              name="confirmPassword"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
            />
          </FormControl>
          <Button variant="solid" colorScheme="blue" mt="5px" type="submit">
            Sign In
          </Button>
        </form>
      </Card>
    </Center>
  );
}

export default Signin;
