import {
  VStack,
  InputGroup,
  InputLeftElement,
  Input,
  Box,
  Button,
  Link,
} from "@chakra-ui/react";
import { EmailIcon, UnlockIcon, AtSignIcon } from "@chakra-ui/icons";
import { useState } from "react";
import useSignUpWithEmailAndPassword from "./../../hooks/useSignUpWithEmailAndPassword";
import useShowToast from "./../../hooks/useShowToast";

const SignUp = () => {
  const [value, setValue] = useState({
    email: "",
    password: "",
    fullname: "",
  });
  const { loading, handleSignUpWithEmailAndPassword } =
    useSignUpWithEmailAndPassword();
  const showToast = useShowToast();
  const handleOnRegister = async () => {
    try {
      await handleSignUpWithEmailAndPassword(value);
    } catch (error) {
      showToast("error", "Email sudah terpakai", "error");
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
          value={value.email}
          onChange={(e) => setValue({ ...value, email: e.target.value })}
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
          value={value.password}
          onChange={(e) => setValue({ ...value, password: e.target.value })}
        />
      </InputGroup>

      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Box>
            <AtSignIcon
              w={{ base: 5, md: 6 }}
              h={{ base: 5, md: 6 }}
              color="black"
            />
          </Box>
        </InputLeftElement>
        <Input
          type="text"
          placeholder="fullname"
          size="md"
          value={value.fullname}
          onChange={(e) => setValue({ ...value, fullname: e.target.value })}
        />
      </InputGroup>

      {/* <Link as={RouterLink} to="/" w="full"> */}
      <Button
        w="full"
        size="md"
        backgroundColor={"#000000"}
        color="white"
        _hover={{ backgroundColor: "#343434" }}
        onClick={handleOnRegister}
        isLoading={loading}>
        Sign Up
      </Button>
      {/* </Link> */}
    </VStack>
  );
};

export default SignUp;
