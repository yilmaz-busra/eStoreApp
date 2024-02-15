import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Text,
  Divider,
  Heading,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import moment from "moment";

function Cards({ item }) {
  return (
    <div>
      <Card maxW="sm">
        <CardBody>
          <Image
            src={item.photos[0]}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">{item.title}</Heading>
            <Text>{moment(item.createdAt).format("DD/MM/YYYY")}</Text>
            <Text>{item.description.slice(0, 150)}...</Text>
            <Text color="blue.600" fontSize="2xl">
              {item.price}TL
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue">
              Buy now
            </Button>
            <Button variant="ghost" colorScheme="blue">
              Add to cart
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Cards;
