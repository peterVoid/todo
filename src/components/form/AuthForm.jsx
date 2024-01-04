import {
  VStack,
  InputGroup,
  InputLeftElement,
  Input,
  Box,
  Button,
} from "@chakra-ui/react";
import { EmailIcon, UnlockIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSignIn from "../../hooks/useSignIn";
const AuthForm = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const { handleSignInUser, loading } = useSignIn();
  const handleLoginUser = async () => {
    try {
      await handleSignInUser(input);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <VStack gap={4} p={4}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Box>
            <EmailIcon
              w={{ base: 5, md: 6 }}
              h={{ base: 5, md: 6 }}
              color="black"
            />
          </Box>
        </InputLeftElement>
        <Input
          type="text"
          placeholder="ex: blabla@gmail.com"
          size="md"
          value={input.email}
          onChange={(e) => setInput({ ...input, email: e.target.value })}
        />
      </InputGroup>

      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Box>
            <UnlockIcon
              w={{ base: 5, md: 6 }}
              h={{ base: 5, md: 6 }}
              color="black"
            />
          </Box>
        </InputLeftElement>
        <Input
          type="password"
          placeholder="Enter your password"
          size="md"
          value={input.password}
          onChange={(e) => setInput({ ...input, password: e.target.value })}
        />
      </InputGroup>

      <Button
        w="full"
        size="md"
        backgroundColor={"#000000"}
        color="white"
        _hover={{ backgroundColor: "#343434" }}
        onClick={handleLoginUser}
        isLoading={loading}>
        Login
      </Button>
    </VStack>
  );
};

export default AuthForm;
