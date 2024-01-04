import { Flex, Box } from "@chakra-ui/react";
import useAuthUser from "../../store/useAuth";
import { useNavigate } from "react-router-dom";
import Navbar from "./../Navbar/Navbar";
import { useEffect } from "react";
import Todo from "../Todo/Todo";
import useTaskUserAuth from "./../../store/useAuthTaskUser";
const Homepage = () => {
  const navigate = useNavigate();
  const user = useAuthUser((state) => state.user);
  const tasking = useTaskUserAuth((state) => state.task);
  console.log(tasking);

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/auth");
  //   }
  // }, []);
  return (
    <>
      <Box position="absolute" top="0" left="0" w="full">
        <Navbar />
      </Box>

      <Flex w="full" alignItems="center" justifyContent="center" h="100vh">
        <Todo />
      </Flex>
    </>
  );
};

export default Homepage;
