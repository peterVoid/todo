import { Box, Text, Button, Flex } from "@chakra-ui/react";
import useTaskUserAuth from "../../store/useAuthTaskUser";
import TaskItemsCompleted from "./TaskItemsCompleted";
import clearTaskIfTrue from "./../../hooks/clearTaskIfTrue";

const ClearTask = () => {
  const tasking = useTaskUserAuth((state) => state.task);
  const searchIfTaskingTrue = tasking.filter((task) => task.isClear === true);
  const { clearTaskStatusTrue, isLoading } = clearTaskIfTrue();
  const check = tasking.filter((task) => task.isClear === true);
  return (
    <Box w="full" bg="blue.200" p={4} rounded="lg">
      <Flex w="full" justifyContent="space-between" alignItems="center">
        <Text fontWeight="bold" fontSize={"{base: '1rem' ,md:1.5rem}"} mb={5}>
          Completed Task
        </Text>
        {check.length > 0 ? (
          <Button
            isLoading={isLoading}
            size="sm"
            colorScheme="red"
            variant="solid"
            mr={2}
            onClick={clearTaskStatusTrue}>
            Clear Task
          </Button>
        ) : null}
      </Flex>
      {searchIfTaskingTrue.length === 0 ? (
        <Text>No task have been completed yet</Text>
      ) : null}
      {tasking.map(
        (task) =>
          task.isClear === true && (
            <TaskItemsCompleted key={task.id} item={task} />
          )
      )}
    </Box>
  );
};

export default ClearTask;
