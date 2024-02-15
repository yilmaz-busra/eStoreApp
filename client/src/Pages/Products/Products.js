import React from "react";

import Cards from "../../Components/Card/Card";

import { Grid } from "@chakra-ui/react";

function Products() {
  return (
    <div>
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        <Cards />
        <Cards />
        <Cards />
        <Cards />
      </Grid>
    </div>
  );
}

export default Products;
