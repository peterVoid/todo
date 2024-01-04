import useAuthUser from "./../store/useAuth";
import useTaskUserAuth from "./../store/useAuthTaskUser";
import { useEffect } from "react";
import { useState } from "react";
import useShowToast from "./useShowToast";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
const getTaskWithId = () => {
  const [loading, setIsLoading] = useState(false);
  const authUser = useAuthUser((state) => state.user);
  const getTasking = useTaskUserAuth((state) => state.getTask);
  const showToast = useShowToast();
  useEffect(() => {
    const getTask = async () => {
      setIsLoading(true);
      try {
        const q = query(
          collection(db, "taskUser"),
          where("createdBy", "==", authUser.uid)
        );
        const querySnapShot = await getDocs(q);
        let resultGetData = [];
        querySnapShot.forEach((doc) => {
          resultGetData.push({ ...doc.data(), id: doc.id });
        });
        getTasking(resultGetData);
      } catch (error) {
        console.log(error.message);
        showToast("error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };
    if (authUser) getTask();
  }, [getTasking, showToast]);

  return { loading };
};

export default getTaskWithId;
