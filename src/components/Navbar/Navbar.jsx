import { Box, Flex, Text, Avatar, Button, Container } from "@chakra-ui/react";
import useLogout from "../../hooks/useLogout";
import useAuthUser from "../../store/useAuth";
const Navbar = () => {
  const authUser = useAuthUser((state) => state.user);
  const { handleLogout, loading } = useLogout();
  const onClickLogout = async () => {
    try {
      await handleLogout();
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <Container
      maxW={{ base: "100%", sm: "80%", md: "60%" }}
      bgGradient={[
        "linear(to-tr, teal.300, yellow.400)",
        "linear(to-t, blue.200, teal.500)",
        "linear(to-b, orange.100, purple.300)",
      ]}
      p={{ base: 6, md: 7 }}
      boxShadow="xl"
      roundedBottomLeft="md"
      roundedBottomRight="md">
      <Flex justifyContent="space-between" alignItems="center">
        <Box
          fontWeight={"bold"}
          fontSize={{ base: "1.2rem", lg: "2rem" }}
          w={"40%"}>
          Todo Apps
        </Box>
        <Flex gap={4} alignItems="center">
          <Avatar
            src={authUser?.profilePicURL}
            size={{ base: "sm", md: "md" }}
          />
          <Text
            fontWeight="500"
            fontSize={{ base: "0.9rem", md: "1rem" }}
            maxW={"70%"}>
            {authUser?.username}
          </Text>
          <Button
            size={{ base: "sm", md: "md" }}
            onClick={onClickLogout}
            isLoading={loading}>
            Logout
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Navbar;
