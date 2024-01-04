import { useState } from "react";
import {
  Box,
  Container,
  Flex,
  Input,
  VStack,
  Button,
  Text,
} from "@chakra-ui/react";
import { ArrowDownIcon } from "@chakra-ui/icons";
import ClearTask from "./ClearTask";
import ProgressTask from "./ProgressTask";
import useAddNewTask from "./../../hooks/useAddNewTask";
import getTaskWithId from "./../../hooks/getTaskWithId";
const Todo = () => {
  const [value, setValue] = useState("");
  const { loading } = getTaskWithId();
  const { handleAddNewTask, isLoading } = useAddNewTask();
  const handleAddTask = async () => {
    try {
      await handleAddNewTask(value);
      setValue("");
    } catch (error) {
      console.log(error.message);
    }
  };
  if (loading) {
    return <Text>Fetch Data...</Text>;
  }
  return (
    <Container maxW={{ base: "100%", sm: "80%", md: "60%" }} rounded="lg" p={4}>
      <Flex gap={5} justifyContent="center" alignItems="center">
        <Input
          type="text"
          placeholder="add new task..."
          w={{ base: "90%", sm: "70%", lg: "50%" }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Box
          as="span"
          textAlign="center"
          rounded="full"
          cursor="pointer"
          _hover={{ bg: 'rgba("0", "0", "0", "0")' }}
          bg="black">
          <Button
            bg="transparent"
            isLoading={isLoading}
            onClick={handleAddTask}>
            <ArrowDownIcon color="white" />
          </Button>
        </Box>
      </Flex>
      <VStack mt={"50px"}>
        <Flex gap={5} w="full">
          <ProgressTask />
          <ClearTask />
        </Flex>
      </VStack>
    </Container>
  );
};

export default Todo;
