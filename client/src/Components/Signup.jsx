import React, { useEffect, useState } from "react";
import "../App.css";
import {
  Heading,
  VStack,
  Container,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Center,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../Services/axiosInstance";

function Signup() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const handleClick = () => setShow(!show);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  let token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/users/register", {
        username: formData.username,
        password: formData.password,
      });
      setLoading(false);
      navigate("/login");
      toast({
        title: "Registration Successful",
        description: "You have successfully registered.",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    } catch (error) {
      setLoading(false);
      toast({
        title: "Registration Failed",
        description: error.message || "An error occurred during registration.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    if (token) {
      navigate("/game");
    }
  }, []);
  return (
    <>
      <div className="signup">
        <Heading textAlign={"center"} mb={"5"}>
          Sign-Up
        </Heading>
        <VStack>
          <Container maxW="550px" color="black">
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="text"
                  name="username"
                  placeholder="Enter Email"
                  value={formData.username}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="Enter password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Center>
                <Button
                  type="submit"
                  mt={4}
                  colorScheme="cyan"
                  isLoading={loading}
                >
                  Signup
                </Button>
              </Center>
            </form>
            <Center>
              <Text>
                Already have an Account{" "}
                <Link to="/login" className="link-style">
                  <b>Login</b>
                </Link>{" "}
              </Text>
            </Center>
          </Container>
        </VStack>
      </div>
    </>
  );
}

export default Signup;
