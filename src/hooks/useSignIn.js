import { useState } from "react";
import useAuthUser from "./../store/useAuth";
import useShowToast from "./useShowToast";
import { auth, db } from "./../firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
const useSignIn = () => {
  const user = useAuthUser((state) => state.user);
  const [dataUser, setDataUser] = useState();
  const showToast = useShowToast();
  const [signInWithEmailAndPassword, loading] =
    useSignInWithEmailAndPassword(auth);

  const handleSignInUser = async (input) => {
    try {
      const userAuth = await signInWithEmailAndPassword(
        input.email,
        input.password
      );
      const q = query(
        collection(db, "users"),
        where("email", "==", input.email)
      );
      const querySnapShot = await getDocs(q);
      if (!querySnapShot.empty) {
        const userData = querySnapShot.docs[0].data();
        setDataUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      }
      showToast("Login success");
    } catch (error) {
      showToast("error", error.message, "error");
      console.log(error.message);
    }
  };
  return { handleSignInUser, loading };
};

export default useSignIn;
