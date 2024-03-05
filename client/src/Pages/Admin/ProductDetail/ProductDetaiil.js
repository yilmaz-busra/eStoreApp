import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { fetchProductDetail, updateProduct } from "../../../api";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
} from "@chakra-ui/react";
import { FieldArray, Formik } from "formik";
import editScheme from "./validations";

function ProductDetaiil() {
  const toast = useToast();
  const { product_id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["editProduct", product_id],
    queryFn: () => {
      return fetchProductDetail(product_id);
    },
  });

  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (error) {
    return <div>Error {error.message}</div>;
  }

  const handleSubmit = async (values) => {
    try {
      await updateProduct(values, product_id);
      toast({
        title: "Product Changed",
        description: "We've changed your product for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: `Error`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  return (
    <div>
      <h1>Edit</h1>
      <Formik
        initialValues={{
          title: data.title,
          description: data.description,
          price: data.price,
          photos: data.photos,
        }}
        validationSchema={editScheme}
        onSubmit={handleSubmit}
      >
        {({
          handleSubmit,
          errors,
          touched,
          handleBlur,
          handleChange,
          values,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <FormControl mt="5">
              <FormLabel>Product Name</FormLabel>
              <Input
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
            </FormControl>
            <FormControl mt="5">
              <FormLabel>Product Description</FormLabel>
              <Textarea
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
              />
            </FormControl>
            <FormControl mt="5">
              <FormLabel>Product Price</FormLabel>
              <Input
                placeholder="Enter amount"
                name="price"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.price}
                htmlSize={4}
              />
            </FormControl>
            <FormControl mt="4">
              <FormLabel>Product Photos</FormLabel>

              <FieldArray name="photos">
                {(arrayHelpers) => (
                  <div>
                    {values.photos.map((_, index) => (
                      <div key={index}>
                        <Input
                          name={`photos.${index}`}
                          value={values.photos[index]}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          w="3xl"
                        />
                        <Button
                          ml="4"
                          type="button"
                          colorScheme="red"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      mt="5"
                      type="button"
                      onClick={() => arrayHelpers.push("")}
                    >
                      Add a photo
                    </Button>

                    <Button
                      mt="4"
                      width="full"
                      type="submit"
                      isLoading={isSubmitting}
                    >
                      Update
                    </Button>
                  </div>
                )}
              </FieldArray>
            </FormControl>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default ProductDetaiil;
