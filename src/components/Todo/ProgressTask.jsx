import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import TaskItemsNotCleared from "./TaskItemsNotCleared";
import useTaskUserAuth from "./../../store/useAuthTaskUser";
import getTaskWithId from "./../../hooks/getTaskWithId";
const ProgressTask = () => {
  const tasking = useTaskUserAuth((state) => state.task);
  const searchIfTaskingFalse = tasking.filter((task) => task.isClear === false);

  return (
    <Box w="full" bg="blue.200" p={4} rounded="lg">
      <Text fontWeight="bold" fontSize={"{base: '1rem' ,md:1.5rem}"} mb={5}>
        Progress Task
      </Text>
      {searchIfTaskingFalse.length === 0 ? <Text>No Data</Text> : null}
      {tasking.map((task) =>
        task.isClear === false ? (
          <TaskItemsNotCleared key={task.id} item={task} />
        ) : null
      )}
    </Box>
  );
};

export default ProgressTask;
