import { useRef, useState } from "react";
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
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { useBasket } from "../../context/BasketContext";
import { useNavigate } from "react-router-dom";
import { SlBasketLoaded } from "react-icons/sl";
import { postOrder } from "../../api";

function Basket() {
  const { items, removeFromBasket, clearBasket } = useBasket();

  const navigate = useNavigate();

  const sum = items.reduce((acc, obj) => acc + obj.price, 0);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);

  const [address, setAddress] = useState("");

  const handleSubmitOrder = async () => {
    const itemIds = items.map((item) => item._id);

    const input = {
      address,
      items: JSON.stringify(itemIds),
    };

    await postOrder(input);
    clearBasket();
    onClose();
  };
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Heading fontWeight="500" mt="10px">
        YOUR BASKET
      </Heading>
      <Center mt="25px">
        {items.length < 1 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <SlBasketLoaded fontSize="400px" color="black" />
            <Text fontWeight="500" fontSize="32px" mt="35px">
              EMPTY
            </Text>
          </div>
        )}
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
                      onClick={() => navigate(`/product/${item._id}`)}
                    />

                    <Stack>
                      <CardBody>
                        <Heading
                          size="md"
                          onClick={() => navigate(`/product/${item._id}`)}
                        >
                          {item.title}
                        </Heading>
                        <Text mt="2">{item.description.slice(0, 75)}...</Text>
                      </CardBody>

                      <CardFooter justifyContent="space-between">
                        <Text py="2" fontWeight="600">
                          {item.price}$
                        </Text>
                        <Button
                          variant="solid"
                          colorScheme="red"
                          onClick={() => removeFromBasket(item._id)}
                        >
                          Remove from basket
                        </Button>
                      </CardFooter>
                    </Stack>
                  </Card>
                </li>
              );
            })}
            <li>
              <Box
                borderRadius="md"
                color="black"
                justifyContent="space-between"
                display="flex"
              >
                <Text fontWeight="500">Total:{sum}$</Text>{" "}
                <Button onClick={onOpen}>Go to the Payment</Button>
              </Box>
            </li>
          </ul>
        )}
      </Center>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Textarea
                ref={initialRef}
                placeholder="Give your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmitOrder}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Basket;
