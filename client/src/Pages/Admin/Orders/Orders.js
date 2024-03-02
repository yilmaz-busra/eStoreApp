import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchOrder } from "../../../api";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableCaption,
  TableContainer,
  Text,
} from "@chakra-ui/react";

function Orders() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["admin:orders"],
    queryFn: fetchOrder,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  console.log(data);

  return (
    <div>
      <Text fontSize="2xl">Orders</Text>

      <TableContainer>
        <Table variant="simple">
          <TableCaption>Table of orders</TableCaption>
          <Thead>
            <Tr>
              <Th>User</Th>
              <Th>Address</Th>
              <Th isNumeric>Items</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((order) => {
              return (
                <Tr key={order?._id}>
                  <Th>{order?.user?.email}</Th>
                  <Th>{order?.adress}</Th>
                  <Th isNumeric>{order?.items?.length}</Th>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Orders;
