import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import useAuthUser from "../store/useAuth";
import useTaskUserAuth from "../store/useAuthTaskUser";
import useShowToast from "./useShowToast";
import { db } from "../firebase/firebase";

const useCheckedTask = () => {
  const showToast = useShowToast();
  const authUser = useAuthUser((state) => state.user);
  const changeStatusTask = useTaskUserAuth((state) => state.changeIsClearTask);
  const handleCheckedTask = async (id, check) => {
    try {
      const user = doc(db, "taskUser", id);
      const q = query(
        collection(db, "taskUser"),
        where("createdBy", "==", authUser.uid)
      );

      const querySnapShot = await getDocs(q);

      if (!querySnapShot.empty) {
        querySnapShot.forEach((doc) => {
          if (doc.id === id) {
            changeStatusTask(doc.id);
          }
        });
      }

      await updateDoc(user, {
        isClear: !check,
      });
    } catch (error) {
      console.error(error.message);
      showToast("error", error.message, "error");
    }
  };
  return {
    handleCheckedTask,
  };
};

export default useCheckedTask;
