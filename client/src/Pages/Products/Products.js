import React from "react";
import Cards from "../../Components/Card/Card";
import { Grid, Center, Button, Flex } from "@chakra-ui/react";
import { fetchProductList } from "../../api";
import { useInfiniteQuery } from "@tanstack/react-query";

function Products() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,

    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["repoData"],
    queryFn: fetchProductList,
    getNextPageParam: (lastGroup, allGroups) => {
      const morePageExist = lastGroup?.length === 12;
      if (!morePageExist) {
        return undefined;
      }
      return allGroups.length + 1;
    },
  });

  if (status === "loading") return "Loading...";
  if (status === "error") return "An error has occurred: " + error.message;

  // Ensure data and data.pages are available before trying to render them
  if (!data || !data.pages) return "Loading..."; // This line ensures data is not undefined

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
        <Flex mt="10px" justifyContent="center">
          {hasNextPage && (
            <Button
              onClick={() => fetchNextPage()}
              isLoading={isFetchingNextPage}
              loadingText="Yükleniyor..."
              colorScheme="blue"
              mt="4"
            >
              Daha Fazla Yükle
            </Button>
          )}
        </Flex>
      </div>
    </Center>
  );
}

export default Products;
