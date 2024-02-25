import { useState, createContext, useEffect, useContext } from "react";
import { FetchMe, fetchLogout } from "../api";
import { Flex, Spinner } from "@chakra-ui/react";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const [loading, setLoading] = useState(true);

  const login = (data) => {
    setLoggedIn(true);
    setUser(data.user);

    localStorage.setItem("access-token", data.accessToken);
    localStorage.setItem("access-refresh", data.refreshToken);
  };

  const logout = async () => {
    setLoggedIn(false);
    setUser(null);

    await fetchLogout();
    localStorage.removeItem("access-token");
    localStorage.removeItem("access-refresh");
  };
  useEffect(() => {
    (async () => {
      try {
        const me = await FetchMe();
        setUser(me);
        setLoggedIn(true);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );
  }

  const values = {
    loggedIn,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
