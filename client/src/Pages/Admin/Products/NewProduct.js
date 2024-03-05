import {
  useMutation,
  QueryClient,
  useQueryClient,
} from "@tanstack/react-query";
import React from "react";

import { postNewProduct } from "../../../api";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { FieldArray, Formik } from "formik";

function NewProduct() {
  const queryClient = useQueryClient();

  const newProductMutation = useMutation({
    mutationFn: postNewProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin:products"] });
    },
  });

  const handleSubmit = async (values) => {
    const newValues = {
      ...values,
      photos: JSON.stringify(values.photos),
    };
    newProductMutation.mutate(newValues, {
      onSuccess: () => {
        console.log("success");
      },
    });
  };

  return (
    <div>
      <h1>New Product</h1>
      <Formik
        initialValues={{
          title: "",
          description: "",
          price: "",
          photos: [],
        }}
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
                      Save
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

export default NewProduct;
