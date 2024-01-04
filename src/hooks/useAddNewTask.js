import { useState } from "react";
import useShowToast from "./useShowToast";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  arrayUnion,
  doc,
  updateDoc,
} from "firebase/firestore";
import useAuthUser from "./../store/useAuth";
import { db } from "../firebase/firebase";
import useTaskUserAuth from "./../store/useAuthTaskUser";
const useAddNewTask = () => {
  const [isLoading, setIsLoading] = useState(false);
  const showToast = useShowToast();
  const authUser = useAuthUser((state) => state.user);
  const taskingUser = useTaskUserAuth((state) => state.addingTask);
  const handleAddNewTask = async (input) => {
    if (!input) {
      return showToast("error", "Please fill the fields", "error");
    }
    setIsLoading(true);
    const dataDoc = {
      task: input,
      createdBy: authUser.uid,
      createdAt: Date.now(),
      isClear: false,
    };
    try {
      const docRef = await addDoc(collection(db, "taskUser"), dataDoc);
      if (docRef) {
        taskingUser({ ...dataDoc, id: docRef.id });
        showToast("New task addeded");
      }

      const editTaskFirestore = doc(db, "users", authUser.uid);

      await updateDoc(editTaskFirestore, {
        task: arrayUnion(docRef.id),
      });
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...authUser,
          task: [docRef.id],
        })
      );
    } catch (error) {
      showToast("error", error.message, "error");
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return { handleAddNewTask, isLoading };
};

export default useAddNewTask;
