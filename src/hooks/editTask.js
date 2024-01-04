import useAuthUser from "../store/useAuth";
import useShowToast from "./useShowToast";
import { useState } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import useTaskUserAuth from "../store/useAuthTaskUser";

const editTask = () => {
  const [isLoading, setIsLoading] = useState(false);
  const showToast = useShowToast();
  const authUser = useAuthUser((state) => state.user);
  const editTaskStore = useTaskUserAuth((state) => state.editTask);

  const editTaskUser = async (id, task) => {
    setIsLoading(true);
    try {
      const user = doc(db, "taskUser", id);
      const q = query(
        collection(db, "taskUser"),
        where("createdBy", "==", authUser.uid)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          if (doc.id === id) {
            editTaskStore(doc.id, task);
          }
        });
      }
      await updateDoc(user, {
        task: task,
      });

      showToast("success", "Task edited", "success");
    } catch (error) {
      showToast("error", error.message, "error");
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return { editTaskUser, isLoading };
};

export default editTask;
