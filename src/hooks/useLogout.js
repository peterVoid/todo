import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import useShowToast from "./useShowToast";
import useAuthUser from "../store/useAuth";
const useLogout = () => {
  const [signOut, loading] = useSignOut(auth);
  const showToast = useShowToast();
  const logoutingUser = useAuthUser((state) => state.logout);
  const handleLogout = async () => {
    try {
      const success = await signOut();
      if (success) {
        showToast("success", "Successfully Logout", "success");
        logoutingUser();
        localStorage.removeItem("user");
      }
    } catch (error) {
      showToast("error", error.message, "error");
      console.log(error.message);
    }
  };
  return { handleLogout, loading };
};

export default useLogout;
