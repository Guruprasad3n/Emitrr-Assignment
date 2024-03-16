import React from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/userActions";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = !!localStorage.getItem("token");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Box bg="blue.500" color="white" p="4" w={"100vw"}>
      <Flex justify="space-between" align="center">
        <Text fontSize="xl">Exploding Kitten</Text>
        {isAuthenticated ? (
          <Flex align="center">
            <Text mr="4">{localStorage.getItem("username")}</Text>
            <Button onClick={handleLogout}>Logout</Button>
          </Flex>
        ) : (
          <Button>
            <Link to={"/login"}>Login</Link>
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
