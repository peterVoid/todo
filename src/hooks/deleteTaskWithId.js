import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import useTaskUserAuth from "../store/useAuthTaskUser";
import useShowToast from "./useShowToast";
import { db } from "../firebase/firebase";
import useAuthUser from "../store/useAuth";
const deleteTaskWithId = () => {
  const showToast = useShowToast();
  const storeDeleteTask = useTaskUserAuth((state) => state.deleteTask);
  const authUser = useAuthUser((state) => state.user);
  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      const user = doc(db, "users", authUser.uid);
      await deleteDoc(doc(db, "taskUser", id));
      await updateDoc(user, {
        task: arrayRemove(id),
      });
      storeDeleteTask(id);
      showToast("success", "Task deleted", "success");
    } catch (error) {
      console.error(error.message);
      showToast("error", error.message, "error");
    }
  };
  return deleteTask;
};

export default deleteTaskWithId;
