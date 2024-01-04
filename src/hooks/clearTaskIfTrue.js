import { useState } from "react";
import useShowToast from "./useShowToast";
import useAuthUser from "./../store/useAuth";
import {
  query,
  collection,
  getDocs,
  deleteDoc,
  where,
  doc,
} from "firebase/firestore";
import { db } from "./../firebase/firebase";
import useTaskUserAuth from "./../store/useAuthTaskUser";

const clearTaskIfTrue = () => {
  const [isLoading, setIsLoading] = useState(false);
  const showToast = useShowToast();
  const authUser = useAuthUser((state) => state.user);
  const clirTask = useTaskUserAuth((state) => state.clearTaskIfTrue);
  const clearTaskStatusTrue = async () => {
    if (!window.confirm("Are you sure you want to clear the task?")) return;
    setIsLoading(true);
    try {
      const q = query(
        collection(db, "taskUser"),
        where("createdBy", "==", authUser.uid)
      );

      const querySnapShot = await getDocs(q);
      let task;
      if (!querySnapShot.empty) {
        clirTask();
        querySnapShot.forEach((doc) => {
          if (doc.data().isClear === true) {
            task = doc.id;
          }
        });

        await deleteDoc(doc(db, "taskUser", task));
        showToast("success", "Task cleared", "success");
      }
    } catch (error) {
      console.log(error.message);
      showToast("error", error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };
  return { clearTaskStatusTrue, isLoading };
};

export default clearTaskIfTrue;
