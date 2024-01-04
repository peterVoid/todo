import { Box, Flex, VStack } from "@chakra-ui/react";
import { useState } from "react";
import AuthForm from "../form/AuthForm";
import GoogleAuth from "./../form/GoogleAuth";
import SignUp from "./../form/SignUp";

const AuthUser = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <Flex justifyContent={"center"} alignItems={"center"} h={"100vh"}>
      <Flex gap={10} alignItems={"center"}>
        <Box display={{ base: "none", md: "block" }}>TodoList App</Box>
        <VStack
          gap={2}
          border={"1px solid"}
          borderColor={"#323232"}
          p={{ sm: 2, md: 3 }}
          rounded="xl">
          <Box fontSize={{ base: 16, md: 20 }} fontWeight={"bold"}>
            {isLogin ? "Login" : "Register"}
          </Box>
          {isLogin ? <AuthForm /> : <SignUp />}
          <Flex gap={2}>
            {isLogin ? "Dont Have an account?" : "Have an account?"}
            <Box
              color="blue.500"
              cursor={"pointer"}
              onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Sign Up" : "Sign In"}
            </Box>
          </Flex>

          <GoogleAuth isLogin={isLogin} />
        </VStack>
      </Flex>
    </Flex>
  );
};

export default AuthUser;
