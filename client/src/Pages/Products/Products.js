import React from "react";

import Cards from "../../Components/Card/Card";

import { Grid, Center } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

import { fetchProductList } from "../../api";

function Products() {
  const { error, data, isLoading } = useQuery({
    queryKey: ["repoData"],
    queryFn: fetchProductList,
  });

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;
  console.log(data);

  return (
    <Center>
      <div style={{ padding: "20px" }}>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
            xl: "repeat(4, 1fr)",
          }}
          gap={4}
        >
          {data.map((item, key) => {
            return <Cards item={item} key={key} />;
          })}
        </Grid>
      </div>
    </Center>
  );
}

export default Products;
