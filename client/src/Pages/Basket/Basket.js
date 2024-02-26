import React from "react";
import {
  Card,
  Heading,
  Image,
  CardBody,
  CardFooter,
  Stack,
  Text,
  Button,
  Center,
} from "@chakra-ui/react";
import { useBasket } from "../../context/BasketContext";

function Basket() {
  const { items } = useBasket();
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Heading fontWeight="500" mt="10px">
        Products In Basket
      </Heading>
      <Center mt="25px">
        {items.length > 0 && (
          <ul
            style={{
              border: "1px solid #dad7cd",
              borderRadius: "35px",
              padding: "15px",
            }}
          >
            {items.map((item) => {
              return (
                <li
                  key={item._id}
                  style={{
                    marginBottom: "15px",
                  }}
                >
                  <Card
                    direction={{ base: "column", sm: "row" }}
                    overflow="hidden"
                    variant="elevated"
                    borderRadius="15px"
                  >
                    <Image
                      objectFit="cover"
                      maxW={{ base: "100%", sm: "200px" }}
                      src={item.photos[0]}
                      alt="photo"
                    />

                    <Stack>
                      <CardBody>
                        <Heading size="md">{item.title}</Heading>
                        <Text mt="2">{item.description.slice(0, 75)}...</Text>
                      </CardBody>

                      <CardFooter justifyContent="space-between">
                        <Text py="2" fontWeight="600">
                          {item.price}$
                        </Text>
                        <Button variant="solid" colorScheme="blue">
                          Buy Latte
                        </Button>
                      </CardFooter>
                    </Stack>
                  </Card>
                </li>
              );
            })}
          </ul>
        )}
      </Center>
    </div>
  );
}

export default Basket;
