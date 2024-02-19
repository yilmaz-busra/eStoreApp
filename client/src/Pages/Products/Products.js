import React from "react";
import Cards from "../../Components/Card/Card";
import { Grid, Center } from "@chakra-ui/react";
import { fetchProductList } from "../../api";
import { useInfiniteQuery } from "@tanstack/react-query";

function Products() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["repoData"],
    queryFn: fetchProductList,
    getNextPageParam: (lastGroup, allGroups) => {
      const morePageExist = lastGroup?.length === 12;
      if (!morePageExist) {
        return;
      }
      return allGroups.length + 1;
    },
  });

  if (status === "loading") return "Loading...";
  if (status === "error") return "An error has occurred: " + error.message;

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
          {data.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.map((item) => (
                <Cards item={item} key={item._id} />
              ))}
            </React.Fragment>
          ))}
        </Grid>
      </div>
    </Center>
  );
}

export default Products;
