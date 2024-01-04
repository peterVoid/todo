import {
  Checkbox,
  Flex,
  Text,
  Button,
  useDisclosure,
  Modal,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useState } from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import deleteTaskWithId from "../../hooks/deleteTaskWithId";
import editTask from "../../hooks/editTask";
import useCheckedTask from "../../hooks/useCheckedTask";
const TaskItemsNotCleared = ({ item }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [check, setChecked] = useState(item.isClear);
  const [task, setTask] = useState(item.task);
  const deletingTask = deleteTaskWithId();
  const { editTaskUser, isLoading } = editTask();
  const handleEdit = async () => {
    try {
      await editTaskUser(item.id, task);
      onClose();
    } catch (error) {
      console.log(error.message);
    }
  };
  const { handleCheckedTask } = useCheckedTask();
  return (
    <>
      <Flex justifyContent="space-between" alignItems="center" w="full" my={2}>
        <Flex flex="1">
          <Button
            onClick={() => handleCheckedTask(item.id, check)}
            colorScheme={check ? "red" : "green"}
            variant="solid"
            size="sm"
            mr={2}>
            <Checkbox
              size="md"
              colorScheme="green"
              isChecked={check}
              onChange={() => setChecked(!check)}>
              <Text>{item.task}</Text>
            </Checkbox>
          </Button>
        </Flex>
        <Flex alignItems={"center"} gap={3}>
          <DeleteIcon
            cursor={"pointer"}
            onClick={() => deletingTask(item.id)}
          />
          <EditIcon cursor={"pointer"} onClick={onOpen} />
        </Flex>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight={"bold"}>Task</Text>
            <Input value={task} onChange={(e) => setTask(e.target.value)} />
            <Button
              mt={4}
              ml="auto"
              colorScheme="cyan"
              onClick={handleEdit}
              isLoading={isLoading}>
              Save
            </Button>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TaskItemsNotCleared;
