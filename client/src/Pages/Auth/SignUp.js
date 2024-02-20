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
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { SignupSchema } from "./validations";
import { fetchRegister } from "../../api";
import axios from "axios";

function SignUp() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values, bag) => {
      try {
        const registerResponse = await fetchRegister({
          email: values.email,
          password: values.password,
        });

        console.log(registerResponse);
      } catch (e) {
        bag.setErrors({ general: e.response.data.message });
      }
    },
  });
  return (
    <Center>
      <Card w="50%" minW="300px" padding="15px" margin="50px">
        <h1
          style={{ fontWeight: "800", fontSize: "20px", textAlign: "center" }}
        >
          Sign Up
        </h1>
        {formik.errors.general && (
          <Alert status="error">
            <AlertIcon />
            {formik.errors.general}
          </Alert>
        )}
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
              isInvalid={
                formik.errors.email &&
                formik.touched.email && (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {formik.errors.email}
                  </p>
                )
              }
            />

            <FormHelperText>We'll never share your email.</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Set your Password</FormLabel>
            <Input
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              isInvalid={formik.touched.password && formik.errors.password}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Repeat your Password</FormLabel>
            <Input
              name="confirmPassword"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              isInvalid={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
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

export default SignUp;
