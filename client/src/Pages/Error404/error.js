import React from "react";
import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";
function Error() {
  return (
    <div>
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>404 ERROR!</AlertTitle>
      </Alert>
    </div>
  );
}

export default Error;
