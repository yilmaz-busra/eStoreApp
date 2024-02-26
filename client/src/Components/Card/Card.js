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
import { Link } from "react-router-dom";
import { useBasket } from "../../context/BasketContext";

function Cards({ item }) {
  const { addtoBasket, items } = useBasket();
  const findBasketItem = items.find((data) => data._id === item._id);
  return (
    <div>
      <Card maxW="sm">
        <Link to={`/${item._id}`}>
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
        </Link>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue">
              Buy now
            </Button>
            <Button
              variant="ghost"
              colorScheme={findBasketItem ? "red" : "blue"}
              onClick={() => addtoBasket(item, findBasketItem)}
            >
              {findBasketItem ? "Remove Object" : "Add to Basket"}
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Cards;
