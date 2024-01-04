import { auth, db } from "./../firebase/firebase";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import useShowToast from "./useShowToast";
import useAuthUser from "./../store/useAuth";

const useSignUpWithEmailAndPassword = () => {
  const navigate = useNavigate();
  const [createUserWithEmailAndPassword, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const register = useAuthUser((state) => state.signUp);
  const showToast = useShowToast();
  const handleSignUpWithEmailAndPassword = async (input) => {
    if (!input.email || !input.password || !input.fullname) {
      return showToast("error", "Please fill the fields", "error");
    }

    try {
      const newUser = await createUserWithEmailAndPassword(
        input.email,
        input.password
      );
      const data = {
        email: input?.email,
        fullname: input?.fullname,
        task: [],
        username: input.email ? input.email.split("@")[0] : "",
        createdAt: Date.now(),
        profilePicURL: newUser?.user?.photoURL,
        uid: newUser.user.uid,
      };
      if (newUser) {
        setDoc(doc(db, "users", newUser.user.uid), data);
        navigate("/");
        localStorage.setItem("user", JSON.stringify(data));
        register(data);
        showToast("Thankyou for your register");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return { loading, handleSignUpWithEmailAndPassword, error };
};

export default useSignUpWithEmailAndPassword;
