import { Flex, Box } from "@chakra-ui/react";
import useShowToast from "../../hooks/useShowToast";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import useAuthUser from "../../store/useAuth";
import { auth, db } from "../../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
const GoogleAuth = ({ isLogin }) => {
  const showToast = useShowToast();
  const regAuthStore = useAuthUser((state) => state.signUp);
  const [signInWithGoogle, loading, error] = useSignInWithGoogle(auth);

  const handleLoginGoogle = async () => {
    try {
      const newUserFromGoogle = await signInWithGoogle();
      const dataUser = {
        email: newUserFromGoogle?.user?.email,
        fullname: newUserFromGoogle?.user?.displayName,
        username: newUserFromGoogle?.user?.email.split("@")[0],
        task: [],
        createdAt: Date.now(),
        profilePicURL: newUserFromGoogle?.user?.photoURL,
        uid: newUserFromGoogle?.user?.uid,
      };
      if (newUserFromGoogle) {
        setDoc(doc(db, "users", newUserFromGoogle.user.uid), dataUser);
        localStorage.setItem("user", JSON.stringify(dataUser));
        regAuthStore(dataUser);
      }
    } catch (error) {
      showToast("error", error.message, "error");
      console.log(error.message);
    }
  };

  return (
    <Flex
      gap={3}
      backgroundColor="blue.500"
      p={{ sm: 2, md: 3 }}
      rounded="md"
      cursor="pointer"
      _hover={{ bg: "blue.600" }}>
      <Box
        fontWeight="600"
        fontSize={{ base: "0.9rem", md: "1rem" }}
        onClick={() => handleLoginGoogle()}>
        {isLogin ? "Login" : "Register"} With Google
      </Box>
    </Flex>
  );
};

export default GoogleAuth;
