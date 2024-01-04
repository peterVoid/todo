import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./components/pages/Homepage";
import AuthUser from "./components/pages/AuthUser";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import { Spinner, Flex } from "@chakra-ui/react";

const App = () => {
  const [user, loading] = useAuthState(auth);
  if (!user && loading) {
    return (
      <Flex justifyContent="center" alignItems="center" h="100vh">
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
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={user ? <Homepage /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={!user ? <AuthUser /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
};

export default App;
