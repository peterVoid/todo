import { Flex, Button, Checkbox, Text } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
const TaskItemsCompleted = ({ item }) => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      w="full"
      my={2}
      disableClick>
      <Flex flex="1">
        <Text>{item.task}</Text>
      </Flex>
      <Flex alignItems={"center"} gap={3}>
        <DeleteIcon cursor={"pointer"} />
        <EditIcon cursor={"pointer"} />
      </Flex>
    </Flex>
  );
};

export default TaskItemsCompleted;
